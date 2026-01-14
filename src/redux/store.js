/**
 * SGPME - Redux Store
 * 
 * Configuration du store Redux avec Redux Toolkit
 * Gère l'état global de l'application
 */

import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

// Reducers
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import venteReducer from './slices/venteSlice';
import uiReducer from './slices/uiSlice';
import depotReducer from './slices/depotSlice';

// ============================================================================
// 📦 CONFIGURATION PERSISTENCE
// ============================================================================

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // On persiste auth et cart, mais pas ui ni vente
  whitelist: ['auth', 'cart'],
};

// ============================================================================
// 🔗 COMBINAISON DES REDUCERS
// ============================================================================

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  vente: venteReducer,
  ui: uiReducer,
  depot: depotReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ============================================================================
// 🏪 STORE
// ============================================================================

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore ces actions pour redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__, // DevTools seulement en dev
});

// ============================================================================
// 💾 PERSISTOR
// ============================================================================

export const persistor = persistStore(store);

// ============================================================================
// 📝 TYPES (pour TypeScript - optionnel)
// ============================================================================

// Export types pour utilisation dans les composants
export const RootState = store.getState();
export const AppDispatch = store.dispatch;

// ============================================================================
// 📦 EXPORT PAR DÉFAUT
// ============================================================================

export default store;