/**
 * SGPME - Redux Slices Index
 * 
 * Point d'entrée pour tous les slices Redux
 * 
 * Usage:
 * import { login, logout } from '@/redux/slices';
 * import { addToCart, clearCart } from '@/redux/slices';
 */

// ============================================================================
// 🔐 AUTH SLICE
// ============================================================================

export {
  // Actions
  login,
  logout,
  checkAuth,
  refreshUser,
  clearError,
  updateUser,
  
  // Sélecteurs
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectModuleActif,
  selectEntreprise,
} from './authSlice';

// ============================================================================
// 🛒 CART SLICE
// ============================================================================

export {
  // Actions
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  applyDiscount,
  clearCart,
  loadCartFromStorage,
  updateStock,
  
  // Sélecteurs
  selectCart,
  selectCartItemsCount,
  selectCartSubtotal,
  selectCartItemById,
  selectIsInCart,
} from './cartSlice';

// ============================================================================
// 💰 VENTE SLICE
// ============================================================================

export {
  // Actions
  createVente,
  fetchVentes,
  fetchVenteById,
  cancelVente,
  clearVenteError,
  selectVente,
  clearCurrentVente,
  updateStats,
  
  // Sélecteurs
  selectVentes,
  selectCurrentVente,
  selectVenteLoading,
  selectVenteError,
  selectVenteStats,
  selectVentesToday,
  selectTotalToday,
} from './venteSlice';

// ============================================================================
// 🎨 UI SLICE
// ============================================================================

export {
  // Loading
  setLoading,
  showLoading,
  hideLoading,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Bottom Sheets
  openBottomSheet,
  closeBottomSheet,
  closeAllBottomSheets,
  
  // Toast
  showToast,
  hideToast,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  
  // Search
  setSearchQuery,
  clearSearch,
  setSearchActive,
  
  // Filters
  setFilter,
  clearFilters,
  toggleInStockFilter,
  
  // Sort
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  
  // Layout
  setProductsView,
  setGridColumns,
  toggleProductsView,
  
  // Selected
  selectProduct,
  clearSelectedProduct,
  selectVente as selectUIVente, // Rename pour éviter conflit avec venteSlice
  clearSelectedVente,
  selectClient,
  clearSelectedClient,
  clearAllSelected,
  
  // Reset
  resetUI,
  
  // Sélecteurs
  selectUI,
  selectIsLoading,
  selectLoadingMessage,
  selectModals,
  selectBottomSheets,
  selectToast,
  selectSearchQuery,
  selectSearchActive,
  selectFilters,
  selectSortBy,
  selectSortOrder,
  selectLayout,
  selectSelectedProduct,
  selectSelectedVente,
  selectSelectedClient,
} from './uiSlice';

// ============================================================================
// 📦 EXPORT PAR DÉFAUT
// ============================================================================

export { default as authReducer } from './authSlice';
export { default as cartReducer } from './cartSlice';
export { default as venteReducer } from './venteSlice';
export { default as uiReducer } from './uiSlice';