/**
 * SGPME - Auth Slice
 * 
 * Gère l'authentification et les données utilisateur
 * Stocke le module_actif de l'entreprise (utilisé par ThemeProvider)
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils';

// Pour l'instant, on utilise les données mock
import { USERS } from '../../data/users';
import { ENTREPRISES } from '../../data/entreprises';

// ============================================================================
// 🔐 ASYNC THUNKS (Actions asynchrones)
// ============================================================================

/**
 * Login utilisateur
 * @param {Object} credentials - { username, password }
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { username, password } = credentials;

      // TODO: Remplacer par appel API réel
      // const response = await fetch('API_URL/auth/login/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });
      // const data = await response.json();

      // Simulation avec données mock
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simule latence réseau

      // Cherche l'utilisateur
      const user = USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return rejectWithValue('Nom d\'utilisateur ou mot de passe incorrect');
      }

      // Vérifie que c'est un vendeur (seul rôle autorisé sur mobile)
      if (user.role !== 'vendeur') {
        return rejectWithValue('Accès non autorisé. Réservé aux vendeurs.');
      }

      // Récupère l'entreprise
      const entreprise = ENTREPRISES.find((e) => e.id === user.entreprise);

      if (!entreprise) {
        return rejectWithValue('Entreprise introuvable');
      }

      // Vérifie que l'entreprise est active
      if (entreprise.statut !== 'actif') {
        return rejectWithValue('Entreprise suspendue ou expirée');
      }

      // Prépare les données à retourner
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        telephone: user.telephone,
        avatar: user.avatar,
        entreprise: {
          id: entreprise.id,
          nom: entreprise.nom,
          module_actif: entreprise.module_actif, // ← CLÉ pour le thème !
          logo: entreprise.logo,
          adresse: entreprise.adresse,
          telephone: entreprise.telephone,
          email: entreprise.email,
        },
      };

      // Simule un token (en production, vient de l'API)
      const token = `mock_token_${user.id}_${Date.now()}`;

      // Sauvegarde dans AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      return { user: userData, token };
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur de connexion');
    }
  }
);

/**
 * Logout utilisateur
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Appel API pour invalider le token
      // await fetch('API_URL/auth/logout/', { ... });

      // Supprime les données stockées
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.CART); // Reset panier aussi

      return null;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur de déconnexion');
    }
  }
);

/**
 * Vérifie le token au démarrage de l'app
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (!token || !userData) {
        return rejectWithValue('Non authentifié');
      }

      // TODO: Vérifier la validité du token auprès de l'API
      // const response = await fetch('API_URL/auth/verify/', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      const user = JSON.parse(userData);

      return { user, token };
    } catch (error) {
      return rejectWithValue('Session expirée');
    }
  }
);

/**
 * Rafraîchir les données utilisateur
 */
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      if (!auth.token) {
        return rejectWithValue('Non authentifié');
      }

      // TODO: Appel API pour récupérer les données à jour
      // const response = await fetch('API_URL/users/me/', {
      //   headers: { Authorization: `Bearer ${auth.token}` }
      // });
      // const userData = await response.json();

      // Pour l'instant, on retourne les données existantes
      return auth.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ============================================================================
// 🏪 SLICE
// ============================================================================

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Réinitialise l'erreur
    clearError: (state) => {
      state.error = null;
    },
    
    // Met à jour les infos utilisateur (sans re-login)
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // ========================================================================
    // LOGIN
    // ========================================================================
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload || 'Erreur de connexion';
    });

    // ========================================================================
    // LOGOUT
    // ========================================================================
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      // On force la déconnexion même en cas d'erreur
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    });

    // ========================================================================
    // CHECK AUTH
    // ========================================================================
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null; // Pas d'erreur si juste non connecté
    });

    // ========================================================================
    // REFRESH USER
    // ========================================================================
    builder.addCase(refreshUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// ============================================================================
// 📤 EXPORTS
// ============================================================================

export const { clearError, updateUser } = authSlice.actions;

// Sélecteurs
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Sélecteur pour le module_actif (utilisé par ThemeProvider)
export const selectModuleActif = (state) => 
  state.auth.user?.entreprise?.module_actif || 'shop';

// Sélecteur pour l'entreprise
export const selectEntreprise = (state) => state.auth.user?.entreprise || null;

export default authSlice.reducer;