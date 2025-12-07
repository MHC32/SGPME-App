/**
 * SGPME - Cart Slice
 * 
 * Gère le panier du vendeur (articles à vendre)
 * Optimisé pour interface POS rapide
 */

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, LIMITS } from '../../utils';

// ============================================================================
// 🏪 SLICE
// ============================================================================

const initialState = {
  items: [],
  // Format d'un item:
  // {
  //   produit: 'id_produit',
  //   nom: 'Nom produit',
  //   prix_unitaire: 100.00,
  //   quantite: 2,
  //   remise: 0, // Pourcentage (0-100)
  //   total: 200.00,
  //   stock_actuel: 50,
  //   image: 'url',
  //   code: 'PROD-001',
  // }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ========================================================================
    // AJOUTER AU PANIER
    // ========================================================================
    addToCart: (state, action) => {
      const product = action.payload;

      // Vérifie si le produit est déjà dans le panier
      const existingItem = state.items.find(
        (item) => item.produit === product.id
      );

      if (existingItem) {
        // Augmente la quantité (max stock disponible)
        const newQuantite = Math.min(
          existingItem.quantite + 1,
          product.stock_actuel,
          LIMITS.MAX_QUANTITY_PER_ITEM
        );

        existingItem.quantite = newQuantite;
        existingItem.total = calculateItemTotal(
          newQuantite,
          existingItem.prix_unitaire,
          existingItem.remise
        );
      } else {
        // Ajoute un nouvel item
        state.items.push({
          produit: product.id,
          nom: product.nom,
          prix_unitaire: product.prix_vente,
          quantite: 1,
          remise: 0,
          total: product.prix_vente,
          stock_actuel: product.stock_actuel,
          image: product.image,
          code: product.code,
        });
      }

      // Sauvegarde dans AsyncStorage
      saveCartToStorage(state.items);
    },

    // ========================================================================
    // RETIRER DU PANIER
    // ========================================================================
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.produit !== productId);
      saveCartToStorage(state.items);
    },

    // ========================================================================
    // METTRE À JOUR LA QUANTITÉ
    // ========================================================================
    updateQuantity: (state, action) => {
      const { productId, quantite } = action.payload;
      const item = state.items.find((item) => item.produit === productId);

      if (item) {
        // Vérifie les limites
        const newQuantite = Math.max(
          1,
          Math.min(quantite, item.stock_actuel, LIMITS.MAX_QUANTITY_PER_ITEM)
        );

        item.quantite = newQuantite;
        item.total = calculateItemTotal(
          newQuantite,
          item.prix_unitaire,
          item.remise
        );

        saveCartToStorage(state.items);
      }
    },

    // ========================================================================
    // AUGMENTER LA QUANTITÉ (+1)
    // ========================================================================
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.produit === productId);

      if (item) {
        const newQuantite = Math.min(
          item.quantite + 1,
          item.stock_actuel,
          LIMITS.MAX_QUANTITY_PER_ITEM
        );

        item.quantite = newQuantite;
        item.total = calculateItemTotal(
          newQuantite,
          item.prix_unitaire,
          item.remise
        );

        saveCartToStorage(state.items);
      }
    },

    // ========================================================================
    // DIMINUER LA QUANTITÉ (-1)
    // ========================================================================
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.produit === productId);

      if (item) {
        if (item.quantite > 1) {
          item.quantite -= 1;
          item.total = calculateItemTotal(
            item.quantite,
            item.prix_unitaire,
            item.remise
          );
          saveCartToStorage(state.items);
        } else {
          // Si quantité = 1, on retire du panier
          state.items = state.items.filter((i) => i.produit !== productId);
          saveCartToStorage(state.items);
        }
      }
    },

    // ========================================================================
    // APPLIQUER UNE REMISE
    // ========================================================================
    applyDiscount: (state, action) => {
      const { productId, remise } = action.payload;
      const item = state.items.find((item) => item.produit === productId);

      if (item) {
        // Remise entre 0 et 100%
        item.remise = Math.max(0, Math.min(100, remise));
        item.total = calculateItemTotal(
          item.quantite,
          item.prix_unitaire,
          item.remise
        );

        saveCartToStorage(state.items);
      }
    },

    // ========================================================================
    // VIDER LE PANIER
    // ========================================================================
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },

    // ========================================================================
    // CHARGER LE PANIER DEPUIS LE STORAGE
    // ========================================================================
    loadCartFromStorage: (state, action) => {
      state.items = action.payload || [];
    },

    // ========================================================================
    // METTRE À JOUR LE STOCK (après validation vente)
    // ========================================================================
    updateStock: (state, action) => {
      const { productId, newStock } = action.payload;
      const item = state.items.find((item) => item.produit === productId);

      if (item) {
        item.stock_actuel = newStock;

        // Si quantité > nouveau stock, on ajuste
        if (item.quantite > newStock) {
          item.quantite = Math.max(1, newStock);
          item.total = calculateItemTotal(
            item.quantite,
            item.prix_unitaire,
            item.remise
          );
        }

        saveCartToStorage(state.items);
      }
    },
  },
});

// ============================================================================
// 🔧 HELPERS
// ============================================================================

/**
 * Calcule le total d'une ligne (avec remise)
 */
const calculateItemTotal = (quantite, prix_unitaire, remise) => {
  const subtotal = quantite * prix_unitaire;
  const discount = (subtotal * remise) / 100;
  return subtotal - discount;
};

/**
 * Sauvegarde le panier dans AsyncStorage
 */
const saveCartToStorage = async (items) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  } catch (error) {
    console.error('Erreur sauvegarde panier:', error);
  }
};

// ============================================================================
// 📤 EXPORTS
// ============================================================================

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  applyDiscount,
  clearCart,
  loadCartFromStorage,
  updateStock,
} = cartSlice.actions;

// Sélecteurs
export const selectCart = (state) => state.cart.items;

export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantite, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.total, 0);

export const selectCartItemById = (productId) => (state) =>
  state.cart.items.find((item) => item.produit === productId);

export const selectIsInCart = (productId) => (state) =>
  state.cart.items.some((item) => item.produit === productId);

export default cartSlice.reducer;