/**
 * SGPME - Service Authentification
 * 
 * Gère l'authentification avec le backend Django :
 * - Login avec JWT
 * - Logout
 * - Récupération user complet
 * - Gestion tokens
 */

import api, { getErrorMessage } from './api';
import { API_CONFIG } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  /**
   * Login utilisateur avec backend
   * 
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} { user, token }
   */
  async login(username, password) {
    try {
      console.log('🔐 [AuthService] Login attempt');
      console.log('   Username:', username);
      
      // ========================================
      // ÉTAPE 1 : Login et récupérer tokens
      // ========================================
      
      const response = await api.post(API_CONFIG.ENDPOINTS.LOGIN, {
        username,
        password,
      });
      
      const { access, refresh, user } = response.data;
      
      if (!access || !refresh) {
        throw new Error('Tokens manquants dans la réponse');
      }
      
      console.log('✅ [AuthService] Login successful');
      console.log('   User ID:', user.id);
      console.log('   Username:', user.username);
      console.log('   Role:', user.role);
      console.log('   Module:', user.module_actif);
      console.log('   Entreprise ID:', user.entreprise);
      
      // ========================================
      // ÉTAPE 2 : Stocker les tokens
      // ========================================
      
      await AsyncStorage.multiSet([
        ['access_token', access],
        ['refresh_token', refresh],
      ]);
      
      console.log('✅ [AuthService] Tokens saved to AsyncStorage');
      
      // ========================================
      // ÉTAPE 3 : Récupérer user complet
      // ========================================
      
      console.log('📡 [AuthService] Fetching complete user data from /me/');
      
      const meResponse = await api.get(API_CONFIG.ENDPOINTS.ME);
      const fullUser = meResponse.data;
      
      console.log('✅ [AuthService] Complete user data fetched');
      console.log('   Entreprise:', fullUser.entreprise_detail?.nom);
      console.log('   Logo:', fullUser.entreprise_detail?.logo);
      console.log('   Module actif:', fullUser.entreprise_detail?.module_actif);
      
      // ========================================
      // ÉTAPE 4 : Stocker le user complet
      // ========================================
      
      await AsyncStorage.setItem('user', JSON.stringify(fullUser));
      
      console.log('✅ [AuthService] User data saved to AsyncStorage');
      
      // ========================================
      // RETOUR
      // ========================================
      
      return {
        user: fullUser,
        token: access,
      };
      
    } catch (error) {
      console.error('❌ [AuthService] Login failed');
      console.error('   Error:', error.message);
      
      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Data:', error.response.data);
      }
      
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Logout utilisateur
   * Supprime les tokens et les données locales
   */
  async logout() {
    try {
      console.log('🔐 [AuthService] Logout');
      
      // Supprimer toutes les données d'authentification
      await AsyncStorage.multiRemove([
        'access_token',
        'refresh_token',
        'user',
      ]);
      
      console.log('✅ [AuthService] Logout successful - All auth data cleared');
      
    } catch (error) {
      console.error('❌ [AuthService] Logout error:', error);
      throw error;
    }
  },
  
  /**
   * Récupérer l'utilisateur stocké localement
   * 
   * @returns {Promise<Object|null>} User complet ou null
   */
  async getCurrentUser() {
    try {
      const userJson = await AsyncStorage.getItem('user');
      
      if (!userJson) {
        console.log('ℹ️  [AuthService] No user found in AsyncStorage');
        return null;
      }
      
      const user = JSON.parse(userJson);
      
      console.log('✅ [AuthService] User loaded from AsyncStorage');
      console.log('   Username:', user.username);
      console.log('   Entreprise:', user.entreprise_detail?.nom);
      
      return user;
      
    } catch (error) {
      console.error('❌ [AuthService] Error getting current user:', error);
      return null;
    }
  },
  
  /**
   * Vérifier si l'utilisateur est authentifié
   * 
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const hasToken = !!token;
      
      if (__DEV__) {
        console.log('🔍 [AuthService] Authentication check:', hasToken ? 'YES' : 'NO');
      }
      
      return hasToken;
    } catch {
      return false;
    }
  },
  
  /**
   * Récupérer les tokens stockés
   * 
   * @returns {Promise<Object>} { accessToken, refreshToken }
   */
  async getTokens() {
    try {
      const [accessToken, refreshToken] = await AsyncStorage.multiGet([
        'access_token',
        'refresh_token',
      ]);
      
      return {
        accessToken: accessToken[1],
        refreshToken: refreshToken[1],
      };
    } catch (error) {
      console.error('❌ [AuthService] Error getting tokens:', error);
      return {
        accessToken: null,
        refreshToken: null,
      };
    }
  },
  
  /**
   * Changer le mot de passe
   * 
   * @param {string} oldPassword - Ancien mot de passe
   * @param {string} newPassword - Nouveau mot de passe
   */
  async changePassword(oldPassword, newPassword) {
    try {
      console.log('🔐 [AuthService] Changing password');
      
      await api.post(API_CONFIG.ENDPOINTS.CHANGE_PASSWORD, {
        old_password: oldPassword,
        new_password: newPassword,
      });
      
      console.log('✅ [AuthService] Password changed successfully');
      
      return { success: true };
      
    } catch (error) {
      console.error('❌ [AuthService] Password change failed:', error.message);
      throw new Error(getErrorMessage(error));
    }
  },
};

export default authService;