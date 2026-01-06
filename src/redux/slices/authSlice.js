/**
 * SGPME - Auth Slice (VERSION API)
 * 
 * Gère l'authentification et les données utilisateur
 * Stocke le module_actif de l'entreprise (utilisé par ThemeProvider)
 * 
 * 🔄 MODIFIÉ : Utilise authService (API) au lieu des données mock
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils';

// ✅ NOUVEAU : Importer authService au lieu des mocks
import authService from '../../services/auth';

// ============================================================================
// 🔐 ASYNC THUNKS (Actions asynchrones)
// ============================================================================

/**
 * Login utilisateur avec API Django
 * @param {Object} credentials - { username, password }
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    console.log('🔵 [authSlice] login() START - API MODE');
    console.log('   credentials:', credentials);
    
    try {
      const { username, password } = credentials;
      console.log('   username:', username);

      // ✅ NOUVEAU : Appel API via authService
      console.log('📡 [authSlice] Calling authService.login()...');
      const result = await authService.login(username, password);
      
      console.log('✅ [authSlice] authService.login() SUCCESS');
      console.log('   user:', result.user.username);
      console.log('   entreprise:', result.user.entreprise_detail?.nom);
      console.log('   module:', result.user.entreprise_detail?.module_actif);
      
      // ⚠️ IMPORTANT : Adapter la structure pour être compatible avec le reste du code
      // L'API retourne entreprise_detail, on le mappe vers entreprise
      const userData = {
        id: result.user.id,
        username: result.user.username,
        email: result.user.email || '',
        first_name: result.user.first_name || '',
        last_name: result.user.last_name || '',
        role: result.user.role,
        telephone: result.user.telephone || '',
        avatar: result.user.avatar || null,
        entreprise: {
          id: result.user.entreprise_detail.id,
          nom: result.user.entreprise_detail.nom,
          module_actif: result.user.entreprise_detail.module_actif, // ← CLÉ pour le thème !
          logo: result.user.entreprise_detail.logo,
          adresse: result.user.entreprise_detail.adresse || '',
          telephone: result.user.entreprise_detail.telephone || '',
          email: result.user.entreprise_detail.email || '',
        },
      };

      console.log('📦 [authSlice] userData prepared for Redux');
      console.log('🎉 [authSlice] login() SUCCESS - Returning data');
      
      return { user: userData, token: result.token };
      
    } catch (error) {
      console.log('❌ [authSlice] login() ERROR:', error);
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
    console.log('🔵 [authSlice] logout() START');
    try {
      // ✅ NOUVEAU : Utilise authService pour nettoyer
      await authService.logout();
      
      // Supprime aussi le panier
      await AsyncStorage.removeItem(STORAGE_KEYS.CART);
      
      console.log('✅ [authSlice] logout() SUCCESS');
      return null;
      
    } catch (error) {
      console.log('❌ [authSlice] logout() ERROR:', error);
      return rejectWithValue(error.message || 'Erreur de déconnexion');
    }
  }
);

/**
 * Vérifie le token au démarrage de l'app
 * ✅ MODIFIÉ : Utilise authService au lieu de lire directement AsyncStorage
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    console.log('🔵 [authSlice] checkAuth() START');
    try {
      // ✅ NOUVEAU : Utilise authService.getCurrentUser()
      console.log('📖 [authSlice] Calling authService.getCurrentUser()...');
      
      const isAuth = await authService.isAuthenticated();
      
      if (!isAuth) {
        console.log('ℹ️  [authSlice] Not authenticated - No token');
        return rejectWithValue('Non authentifié');
      }
      
      const user = await authService.getCurrentUser();
      const { accessToken } = await authService.getTokens();
      
      if (!user) {
        console.log('❌ [authSlice] No user data in storage');
        return rejectWithValue('Non authentifié');
      }

      console.log('✅ [authSlice] checkAuth() SUCCESS');
      console.log('   user:', user.username);
      console.log('   module:', user.entreprise_detail?.module_actif);
      
      // ⚠️ Adapter la structure si nécessaire
      const userData = {
        ...user,
        entreprise: user.entreprise_detail ? {
          id: user.entreprise_detail.id,
          nom: user.entreprise_detail.nom,
          module_actif: user.entreprise_detail.module_actif,
          logo: user.entreprise_detail.logo,
          adresse: user.entreprise_detail.adresse || '',
          telephone: user.entreprise_detail.telephone || '',
          email: user.entreprise_detail.email || '',
        } : user.entreprise,
      };

      return { user: userData, token: accessToken };
      
    } catch (error) {
      console.log('❌ [authSlice] checkAuth() ERROR:', error);
      return rejectWithValue('Session expirée');
    }
  }
);

/**
 * Rafraîchir les données utilisateur depuis l'API
 * ✅ NOUVEAU : Appelle /api/users/me/ pour refresh
 */
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue }) => {
    console.log('🔵 [authSlice] refreshUser() START');
    try {
      const { auth } = getState();
      
      if (!auth.token) {
        return rejectWithValue('Non authentifié');
      }

      // ✅ NOUVEAU : Appel API pour récupérer les données à jour
      const user = await authService.getCurrentUser();
      
      if (!user) {
        return rejectWithValue('Impossible de récupérer les données utilisateur');
      }
      
      console.log('✅ [authSlice] refreshUser() SUCCESS');
      
      // Adapter structure
      return {
        ...user,
        entreprise: user.entreprise_detail ? {
          id: user.entreprise_detail.id,
          nom: user.entreprise_detail.nom,
          module_actif: user.entreprise_detail.module_actif,
          logo: user.entreprise_detail.logo,
          adresse: user.entreprise_detail.adresse || '',
          telephone: user.entreprise_detail.telephone || '',
          email: user.entreprise_detail.email || '',
        } : user.entreprise,
      };
      
    } catch (error) {
      console.log('❌ [authSlice] refreshUser() ERROR:', error);
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
      console.log('⏳ [authSlice REDUCER] login.pending');
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('✅ [authSlice REDUCER] login.fulfilled');
      console.log('   Setting isAuthenticated = true');
      console.log('   user:', action.payload.user.username);
      console.log('   module:', action.payload.user.entreprise?.module_actif);
      
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      console.log('   STATE UPDATED: isAuthenticated =', state.isAuthenticated);
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('❌ [authSlice REDUCER] login.rejected');
      console.log('   error:', action.payload);
      
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
      console.log('⏳ [authSlice REDUCER] logout.pending');
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      console.log('✅ [authSlice REDUCER] logout.fulfilled');
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log('❌ [authSlice REDUCER] logout.rejected');
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
      console.log('⏳ [authSlice REDUCER] checkAuth.pending');
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      console.log('✅ [authSlice REDUCER] checkAuth.fulfilled');
      console.log('   Setting isAuthenticated = true');
      console.log('   user:', action.payload.user.username);
      
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      console.log('   STATE UPDATED: isAuthenticated =', state.isAuthenticated);
    });
    builder.addCase(checkAuth.rejected, (state) => {
      console.log('❌ [authSlice REDUCER] checkAuth.rejected');
      console.log('   Setting isAuthenticated = false');
      
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null; // Pas d'erreur si juste non connecté
      
      console.log('   STATE UPDATED: isAuthenticated =', state.isAuthenticated);
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