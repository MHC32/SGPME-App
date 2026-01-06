/**
 * SGPME - Service API de Base
 * 
 * Service centralisé pour les requêtes HTTP avec :
 * - Authentification automatique (JWT)
 * - Refresh automatique des tokens
 * - Gestion des erreurs
 * - Logs en développement
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

// ============================================================================
// CRÉATION INSTANCE AXIOS
// ============================================================================

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// INTERCEPTEUR REQUEST
// Ajoute automatiquement le token JWT à chaque requête
// ============================================================================

api.interceptors.request.use(
  async (config) => {
    try {
      // Récupérer le token d'accès
      const token = await AsyncStorage.getItem('access_token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Logs en développement
      if (__DEV__) {
        console.log('🔵 [API REQUEST]', config.method.toUpperCase(), config.url);
        if (config.params) {
          console.log('   Params:', config.params);
        }
        if (config.data && config.method !== 'get') {
          console.log('   Data:', JSON.stringify(config.data).substring(0, 200));
        }
      }
      
      return config;
    } catch (error) {
      console.error('❌ [API REQUEST ERROR]', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('❌ [API REQUEST SETUP ERROR]', error);
    return Promise.reject(error);
  }
);

// ============================================================================
// INTERCEPTEUR RESPONSE
// Gère le refresh automatique du token et les erreurs
// ============================================================================

api.interceptors.response.use(
  (response) => {
    // Log succès en développement
    if (__DEV__) {
      console.log('✅ [API RESPONSE]', response.config.url, response.status);
      if (response.data && typeof response.data === 'object') {
        const dataPreview = JSON.stringify(response.data).substring(0, 150);
        console.log('   Data preview:', dataPreview);
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // ========================================
    // GESTION 401 : TOKEN EXPIRÉ
    // ========================================
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        console.log('🔄 [API] Token expired, attempting refresh...');
        
        // Récupérer le refresh token
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Appeler l'endpoint de refresh (sans intercepteur pour éviter boucle)
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH}`,
          { refresh: refreshToken }
        );
        
        const { access } = response.data;
        
        if (!access) {
          throw new Error('No access token received');
        }
        
        // Sauvegarder le nouveau token
        await AsyncStorage.setItem('access_token', access);
        
        console.log('✅ [API] Token refreshed successfully');
        
        // Retry la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('❌ [API] Token refresh failed:', refreshError.message);
        
        // Nettoyer les tokens et user
        await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
        
        // TODO: Dispatch logout action vers Redux
        // store.dispatch(logout());
        
        return Promise.reject(refreshError);
      }
    }
    
    // ========================================
    // LOG ERREUR
    // ========================================
    
    if (__DEV__) {
      console.error('❌ [API ERROR]', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
    }
    
    return Promise.reject(error);
  }
);

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Parse les URLs d'images
 * Ajoute la base URL si nécessaire
 * 
 * @param {string|null} url - URL relative ou complète
 * @returns {string|null} URL complète ou null
 */
export function parseImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_CONFIG.BASE_URL}${url}`;
}

/**
 * Extraire un message d'erreur lisible depuis une erreur API
 * 
 * @param {Error} error - Erreur Axios
 * @returns {string} Message d'erreur lisible
 */
export function getErrorMessage(error) {
  // Erreur avec réponse du serveur
  if (error.response) {
    const { data, status } = error.response;
    
    // 400 Bad Request - Erreurs de validation
    if (status === 400) {
      if (typeof data === 'object' && data !== null) {
        // Erreurs de champs spécifiques
        const firstError = Object.values(data)[0];
        if (Array.isArray(firstError)) {
          return firstError[0];
        }
        if (typeof firstError === 'string') {
          return firstError;
        }
      }
      return data.message || 'Données invalides';
    }
    
    // 401 Unauthorized
    if (status === 401) {
      return 'Session expirée, veuillez vous reconnecter';
    }
    
    // 403 Forbidden
    if (status === 403) {
      return data.message || 'Accès refusé. Vous n\'avez pas les permissions nécessaires.';
    }
    
    // 404 Not Found
    if (status === 404) {
      return 'Ressource introuvable';
    }
    
    // 500+ Server Error
    if (status >= 500) {
      return 'Erreur serveur, veuillez réessayer plus tard';
    }
    
    // Autre erreur avec message
    return data.message || data.detail || 'Une erreur est survenue';
  }
  
  // Erreur réseau (pas de réponse)
  if (error.request) {
    return 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
  }
  
  // Autre erreur
  return error.message || 'Une erreur inattendue est survenue';
}

/**
 * Vérifier si l'utilisateur est connecté
 * @returns {Promise<boolean>}
 */
export async function isAuthenticated() {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return !!token;
  } catch {
    return false;
  }
}

// ============================================================================
// EXPORT
// ============================================================================

export default api;