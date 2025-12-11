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
import { mockUsers as USERS } from '../../data/mock/users';
import { mockEntreprises as ENTREPRISES } from '../../data/mock/entreprises';

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
    console.log('🔵 [authSlice] login() START');
    console.log('   credentials:', credentials);
    
    try {
      const { username, password } = credentials;
      console.log('   username:', username);

      // Simulation avec données mock
      console.log('⏳ [authSlice] Simulating network latency...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Cherche l'utilisateur
      console.log('🔍 [authSlice] Searching user in USERS...');
      console.log('   USERS available:', USERS ? USERS.length : 'UNDEFINED');
      
      const user = USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        console.log('❌ [authSlice] User not found or password incorrect');
        return rejectWithValue('Nom d\'utilisateur ou mot de passe incorrect');
      }
      
      console.log('✅ [authSlice] User found:', user.username);

      // Vérifie que c'est un vendeur (seul rôle autorisé sur mobile)
      console.log('🔐 [authSlice] Checking role:', user.role);
      if (user.role !== 'vendeur') {
        console.log('❌ [authSlice] Role not allowed:', user.role);
        return rejectWithValue('Accès non autorisé. Réservé aux vendeurs.');
      }
      
      console.log('✅ [authSlice] Role OK: vendeur');

      // Récupère l'entreprise
      console.log('🏢 [authSlice] Fetching entreprise...');
      console.log('   ENTREPRISES available:', ENTREPRISES ? ENTREPRISES.length : 'UNDEFINED');
      const entreprise = ENTREPRISES.find((e) => e.id === user.entreprise);

      if (!entreprise) {
        console.log('❌ [authSlice] Entreprise not found:', user.entreprise);
        return rejectWithValue('Entreprise introuvable');
      }
      
      console.log('✅ [authSlice] Entreprise found:', entreprise.nom);
      console.log('   module_actif:', entreprise.module_actif);

      // Vérifie que l'entreprise est active
      console.log('🔐 [authSlice] Checking entreprise status:', entreprise.statut);
      if (entreprise.statut !== 'actif') {
        console.log('❌ [authSlice] Entreprise not active');
        return rejectWithValue('Entreprise suspendue ou expirée');
      }
      
      console.log('✅ [authSlice] Entreprise status OK');

      // Prépare les données à retourner
      console.log('📦 [authSlice] Preparing userData...');
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
      console.log('🔑 [authSlice] Token generated:', token);

      // Sauvegarde dans AsyncStorage
      console.log('💾 [authSlice] Saving to AsyncStorage...');
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      console.log('✅ [authSlice] Saved to AsyncStorage');

      console.log('🎉 [authSlice] login() SUCCESS - Returning data');
      return { user: userData, token };
    } catch (error) {
      console.log('❌ [authSlice] login() CATCH ERROR:', error);
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
      // Supprime les données stockées
      console.log('🗑️ [authSlice] Clearing AsyncStorage...');
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
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
 */
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    console.log('🔵 [authSlice] checkAuth() START');
    try {
      console.log('📖 [authSlice] Reading from AsyncStorage...');
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      
      console.log('   token:', token ? 'present' : 'null');
      console.log('   userData:', userData ? 'present' : 'null');

      if (!token || !userData) {
        console.log('❌ [authSlice] No auth data in storage');
        return rejectWithValue('Non authentifié');
      }

      const user = JSON.parse(userData);
      console.log('✅ [authSlice] checkAuth() SUCCESS');
      console.log('   user:', user.username);
      console.log('   module:', user.entreprise?.module_actif);

      return { user, token };
    } catch (error) {
      console.log('❌ [authSlice] checkAuth() ERROR:', error);
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