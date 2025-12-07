/**
 * SGPME - UI Slice
 * 
 * Gère les états de l'interface utilisateur
 * (modals, loading, toasts, bottom sheets, etc.)
 */

import { createSlice } from '@reduxjs/toolkit';

// ============================================================================
// 🏪 SLICE
// ============================================================================

const initialState = {
  // Loading global
  isLoading: false,
  loadingMessage: '',
  
  // Modals
  modals: {
    productDetail: false,
    checkout: false,
    clientSelect: false,
    settings: false,
    receipt: false,
  },
  
  // Bottom sheets
  bottomSheets: {
    filters: false,
    sort: false,
    payment: false,
  },
  
  // Toasts / Notifications
  toast: {
    visible: false,
    message: '',
    type: 'info', // 'success' | 'error' | 'warning' | 'info'
    duration: 3000,
  },
  
  // Search
  searchQuery: '',
  searchActive: false,
  
  // Filters
  filters: {
    category: null,
    priceRange: null,
    inStock: false,
  },
  
  // Sort
  sortBy: 'name', // 'name' | 'price' | 'stock'
  sortOrder: 'asc', // 'asc' | 'desc'
  
  // Layout
  layout: {
    productsView: 'grid', // 'grid' | 'list'
    gridColumns: 2,
  },
  
  // Selected items
  selectedProduct: null,
  selectedVente: null,
  selectedClient: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ========================================================================
    // LOADING
    // ========================================================================
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    
    showLoading: (state, action) => {
      state.isLoading = true;
      state.loadingMessage = action.payload || 'Chargement...';
    },
    
    hideLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = '';
    },

    // ========================================================================
    // MODALS
    // ========================================================================
    openModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = true;
      }
    },
    
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = false;
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
    },

    // ========================================================================
    // BOTTOM SHEETS
    // ========================================================================
    openBottomSheet: (state, action) => {
      const sheetName = action.payload;
      if (state.bottomSheets.hasOwnProperty(sheetName)) {
        state.bottomSheets[sheetName] = true;
      }
    },
    
    closeBottomSheet: (state, action) => {
      const sheetName = action.payload;
      if (state.bottomSheets.hasOwnProperty(sheetName)) {
        state.bottomSheets[sheetName] = false;
      }
    },
    
    closeAllBottomSheets: (state) => {
      Object.keys(state.bottomSheets).forEach((key) => {
        state.bottomSheets[key] = false;
      });
    },

    // ========================================================================
    // TOAST
    // ========================================================================
    showToast: (state, action) => {
      const { message, type = 'info', duration = 3000 } = action.payload;
      state.toast = {
        visible: true,
        message,
        type,
        duration,
      };
    },
    
    hideToast: (state) => {
      state.toast.visible = false;
    },
    
    // Helpers toast spécifiques
    showSuccess: (state, action) => {
      state.toast = {
        visible: true,
        message: action.payload,
        type: 'success',
        duration: 3000,
      };
    },
    
    showError: (state, action) => {
      state.toast = {
        visible: true,
        message: action.payload,
        type: 'error',
        duration: 4000,
      };
    },
    
    showWarning: (state, action) => {
      state.toast = {
        visible: true,
        message: action.payload,
        type: 'warning',
        duration: 3500,
      };
    },
    
    showInfo: (state, action) => {
      state.toast = {
        visible: true,
        message: action.payload,
        type: 'info',
        duration: 3000,
      };
    },

    // ========================================================================
    // SEARCH
    // ========================================================================
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    clearSearch: (state) => {
      state.searchQuery = '';
    },
    
    setSearchActive: (state, action) => {
      state.searchActive = action.payload;
    },

    // ========================================================================
    // FILTERS
    // ========================================================================
    setFilter: (state, action) => {
      const { filterName, value } = action.payload;
      if (state.filters.hasOwnProperty(filterName)) {
        state.filters[filterName] = value;
      }
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: null,
        inStock: false,
      };
    },
    
    toggleInStockFilter: (state) => {
      state.filters.inStock = !state.filters.inStock;
    },

    // ========================================================================
    // SORT
    // ========================================================================
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },

    // ========================================================================
    // LAYOUT
    // ========================================================================
    setProductsView: (state, action) => {
      state.layout.productsView = action.payload; // 'grid' | 'list'
    },
    
    setGridColumns: (state, action) => {
      state.layout.gridColumns = action.payload;
    },
    
    toggleProductsView: (state) => {
      state.layout.productsView = 
        state.layout.productsView === 'grid' ? 'list' : 'grid';
    },

    // ========================================================================
    // SELECTED ITEMS
    // ========================================================================
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    selectVente: (state, action) => {
      state.selectedVente = action.payload;
    },
    
    clearSelectedVente: (state) => {
      state.selectedVente = null;
    },
    
    selectClient: (state, action) => {
      state.selectedClient = action.payload;
    },
    
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
    
    // Clear all selected
    clearAllSelected: (state) => {
      state.selectedProduct = null;
      state.selectedVente = null;
      state.selectedClient = null;
    },

    // ========================================================================
    // RESET UI
    // ========================================================================
    resetUI: (state) => {
      return initialState;
    },
  },
});

// ============================================================================
// 📤 EXPORTS
// ============================================================================

export const {
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
  selectVente,
  clearSelectedVente,
  selectClient,
  clearSelectedClient,
  clearAllSelected,
  
  // Reset
  resetUI,
} = uiSlice.actions;

// Sélecteurs
export const selectUI = (state) => state.ui;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectLoadingMessage = (state) => state.ui.loadingMessage;
export const selectModals = (state) => state.ui.modals;
export const selectBottomSheets = (state) => state.ui.bottomSheets;
export const selectToast = (state) => state.ui.toast;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectSearchActive = (state) => state.ui.searchActive;
export const selectFilters = (state) => state.ui.filters;
export const selectSortBy = (state) => state.ui.sortBy;
export const selectSortOrder = (state) => state.ui.sortOrder;
export const selectLayout = (state) => state.ui.layout;
export const selectSelectedProduct = (state) => state.ui.selectedProduct;
export const selectSelectedVente = (state) => state.ui.selectedVente;
export const selectSelectedClient = (state) => state.ui.selectedClient;

export default uiSlice.reducer;