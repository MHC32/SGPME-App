/**
 * DEPOT SLICE - Module Vente en Gros
 * 
 * Gère l'état du module Depot (Cash & Carry)
 * avec support des conditionnements multiples
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { depotService } from '../../services/depot.service';

// ===========================
// THUNKS (Actions Async)
// ===========================

/**
 * Charger les produits avec leurs conditionnements
 */
export const fetchProducts = createAsyncThunk(
  'depot/fetchProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await depotService.getProducts(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Charger les catégories
 */
export const fetchCategories = createAsyncThunk(
  'depot/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await depotService.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Créer une vente
 */
export const createVente = createAsyncThunk(
  'depot/createVente',
  async (venteData, { rejectWithValue }) => {
    try {
      const data = await depotService.createVente(venteData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Charger l'historique des ventes
 */
export const fetchVentes = createAsyncThunk(
  'depot/fetchVentes',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await depotService.getVentes(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ===========================
// SLICE
// ===========================

const initialState = {
  // Produits
  products: [],
  productsLoading: false,
  productsError: null,

  // Catégories
  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  // Filtres
  selectedCategory: null,
  searchQuery: '',

  // Panier
  cartItems: [],
  // Structure cartItem:
  // {
  //   id: 'unique-id',              // ID unique pour l'item panier
  //   productId: 1,                 // ID du produit
  //   productName: 'Coca-Cola',
  //   productCode: 'COC-001',
  //   productImage: null,
  //   emoji: '🥤',
  //   
  //   // Conditionnement
  //   conditionnementType: 'caisse', // Type: unite, caisse, sac, etc.
  //   conditionnementQte: 24,        // Quantité dans conditionnement
  //   conditionnementLabel: 'Caisse 24×',
  //   
  //   // Quantité & Prix
  //   quantite: 2,                   // Nombre de conditionnements
  //   unitLabel: 'caisses',          // Pour affichage: "2 caisses"
  //   prixUnitaire: 480.00,          // Prix par conditionnement
  //   total: 960.00,                 // Prix total
  //   
  //   // Stock
  //   stockDisponible: 67            // Stock restant
  // }

  // Totaux
  sousTotal: 0,
  remise: 0,
  remisePourcent: 0,
  total: 0,

  // Ventes
  ventes: [],
  ventesLoading: false,
  ventesError: null,
  lastVente: null,

  // UI States
  checkoutLoading: false,
  checkoutError: null
};

const depotSlice = createSlice({
  name: 'depot',
  initialState,
  reducers: {
    // ===========================
    // FILTRES
    // ===========================

    /**
     * Sélectionner une catégorie
     */
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    /**
     * Mettre à jour la recherche
     */
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    /**
     * Réinitialiser les filtres
     */
    resetFilters: (state) => {
      state.selectedCategory = null;
      state.searchQuery = '';
    },

    // ===========================
    // PANIER
    // ===========================

    /**
     * Ajouter un conditionnement au panier
     * 
     * @param {Object} payload
     * @param {number} payload.productId
     * @param {string} payload.productName
     * @param {string} payload.productCode
     * @param {string} payload.productImage
     * @param {string} payload.emoji
     * @param {string} payload.conditionnementType - Type (unite, caisse, sac)
     * @param {number} payload.conditionnementQte - Quantité dans conditionnement
     * @param {string} payload.conditionnementLabel - Label (Caisse 24×)
     * @param {number} payload.prixUnitaire - Prix du conditionnement
     * @param {number} payload.stockDisponible - Stock disponible
     */
    addToCart: (state, action) => {
      const {
        productId,
        productName,
        productCode,
        productImage,
        emoji,
        conditionnementType,
        conditionnementQte,
        conditionnementLabel,
        prixUnitaire,
        stockDisponible
      } = action.payload;

      // Vérifier si ce produit + conditionnement existe déjà
      const existingItemIndex = state.cartItems.findIndex(
        item => 
          item.productId === productId && 
          item.conditionnementType === conditionnementType
      );

      if (existingItemIndex >= 0) {
        // Incrémenter la quantité
        const item = state.cartItems[existingItemIndex];
        
        // Vérifier le stock
        if (item.quantite < stockDisponible) {
          item.quantite += 1;
          item.total = item.quantite * item.prixUnitaire;
        }
      } else {
        // Créer nouvel item
        const newItem = {
          id: `${productId}-${conditionnementType}-${Date.now()}`,
          productId,
          productName,
          productCode,
          productImage,
          emoji,
          conditionnementType,
          conditionnementQte,
          conditionnementLabel,
          quantite: 1,
          unitLabel: getUnitLabel(conditionnementType),
          prixUnitaire,
          total: prixUnitaire,
          stockDisponible
        };

        state.cartItems.push(newItem);
      }

      // Recalculer les totaux
      calculateTotals(state);
    },

    /**
     * Mettre à jour la quantité d'un item
     */
    updateQuantity: (state, action) => {
      const { itemId, delta } = action.payload;

      const item = state.cartItems.find(item => item.id === itemId);
      if (!item) return;

      const newQuantite = item.quantite + delta;

      // Vérifier les limites
      if (newQuantite <= 0) {
        // Supprimer l'item
        state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      } else if (newQuantite <= item.stockDisponible) {
        // Mettre à jour
        item.quantite = newQuantite;
        item.total = item.quantite * item.prixUnitaire;
      }

      // Recalculer les totaux
      calculateTotals(state);
    },

    /**
     * Définir la quantité exacte d'un item
     */
    setQuantity: (state, action) => {
      const { itemId, quantite } = action.payload;

      const item = state.cartItems.find(item => item.id === itemId);
      if (!item) return;

      // Vérifier les limites
      if (quantite <= 0) {
        state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      } else if (quantite <= item.stockDisponible) {
        item.quantite = quantite;
        item.total = item.quantite * item.prixUnitaire;
      }

      // Recalculer les totaux
      calculateTotals(state);
    },

    /**
     * Supprimer un item du panier
     */
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      calculateTotals(state);
    },

    /**
     * Vider le panier
     */
    clearCart: (state) => {
      state.cartItems = [];
      state.sousTotal = 0;
      state.remise = 0;
      state.remisePourcent = 0;
      state.total = 0;
    },

    /**
     * Appliquer une remise
     */
    setRemise: (state, action) => {
      const { montant, pourcent } = action.payload;

      if (pourcent !== undefined) {
        state.remisePourcent = pourcent;
        state.remise = (state.sousTotal * pourcent) / 100;
      } else if (montant !== undefined) {
        state.remise = montant;
        state.remisePourcent = state.sousTotal > 0 
          ? (montant / state.sousTotal) * 100 
          : 0;
      }

      state.total = state.sousTotal - state.remise;
    },

    // ===========================
    // CHECKOUT
    // ===========================

    /**
     * Réinitialiser l'état checkout
     */
    resetCheckout: (state) => {
      state.checkoutLoading = false;
      state.checkoutError = null;
    }
  },

  extraReducers: (builder) => {
    // ===========================
    // FETCH PRODUCTS
    // ===========================
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.payload || 'Erreur lors du chargement';
      })

    // ===========================
    // FETCH CATEGORIES
    // ===========================
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload || 'Erreur lors du chargement';
      })

    // ===========================
    // CREATE VENTE
    // ===========================
      .addCase(createVente.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutError = null;
      })
      .addCase(createVente.fulfilled, (state, action) => {
        state.checkoutLoading = false;
        state.lastVente = action.payload;
        // Vider le panier après vente réussie
        state.cartItems = [];
        state.sousTotal = 0;
        state.remise = 0;
        state.total = 0;
      })
      .addCase(createVente.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutError = action.payload || 'Erreur lors de la vente';
      })

    // ===========================
    // FETCH VENTES
    // ===========================
      .addCase(fetchVentes.pending, (state) => {
        state.ventesLoading = true;
        state.ventesError = null;
      })
      .addCase(fetchVentes.fulfilled, (state, action) => {
        state.ventesLoading = false;
        state.ventes = action.payload;
      })
      .addCase(fetchVentes.rejected, (state, action) => {
        state.ventesLoading = false;
        state.ventesError = action.payload || 'Erreur lors du chargement';
      });
  }
});

// ===========================
// HELPERS
// ===========================

/**
 * Obtenir le label d'unité selon le type de conditionnement
 */
function getUnitLabel(type) {
  const labels = {
    unite: 'unités',
    caisse: 'caisses',
    carton: 'cartons',
    sac: 'sacs',
    palette: 'palettes',
    bouteille: 'bouteilles',
    boite: 'boîtes',
    pack: 'packs'
  };
  return labels[type] || 'unités';
}

/**
 * Calculer les totaux du panier
 */
function calculateTotals(state) {
  state.sousTotal = state.cartItems.reduce((sum, item) => sum + item.total, 0);
  state.total = state.sousTotal - state.remise;
}

// ===========================
// SELECTORS
// ===========================

/**
 * Sélectionner les produits filtrés
 */
export const selectFilteredProducts = (state) => {
  const { products, selectedCategory, searchQuery } = state.depot;
  
  let filtered = [...products];

  // Filtrer par catégorie
  if (selectedCategory) {
    filtered = filtered.filter(
      product => product.categorie === selectedCategory || 
                 product.categorie_nom === selectedCategory
    );
  }

  // Filtrer par recherche
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      product => 
        product.nom?.toLowerCase().includes(query) ||
        product.code?.toLowerCase().includes(query)
    );
  }

  return filtered;
};

/**
 * Sélectionner le nombre total d'items dans le panier
 */
export const selectCartItemsCount = (state) => {
  return state.depot.cartItems.length;
};

/**
 * Sélectionner le nombre total d'unités dans le panier
 */
export const selectCartTotalUnits = (state) => {
  return state.depot.cartItems.reduce((sum, item) => sum + item.quantite, 0);
};

/**
 * Vérifier si le panier est vide
 */
export const selectIsCartEmpty = (state) => {
  return state.depot.cartItems.length === 0;
};

/**
 * Sélectionner les items du panier
 */
export const selectCartItems = (state) => state.depot.cartItems;

/**
 * Sélectionner les totaux
 */
export const selectCartTotals = (state) => ({
  sousTotal: state.depot.sousTotal,
  remise: state.depot.remise,
  remisePourcent: state.depot.remisePourcent,
  total: state.depot.total
});

/**
 * Sélectionner les produits
 */
export const selectProducts = (state) => state.depot.products;

/**
 * Sélectionner les catégories
 */
export const selectCategories = (state) => state.depot.categories;

/**
 * Sélectionner l'état de chargement des produits
 */
export const selectProductsLoading = (state) => state.depot.productsLoading;

/**
 * Sélectionner la dernière vente
 */
export const selectLastVente = (state) => state.depot.lastVente;

// ===========================
// EXPORTS
// ===========================

export const {
  // Filtres
  setSelectedCategory,
  setSearchQuery,
  resetFilters,
  
  // Panier
  addToCart,
  updateQuantity,
  setQuantity,
  removeFromCart,
  clearCart,
  setRemise,
  
  // Checkout
  resetCheckout
} = depotSlice.actions;

export default depotSlice.reducer;