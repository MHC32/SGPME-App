/**
 * DEPOT SERVICE
 * 
 * Service pour les appels API du module Depot
 * Utilise les endpoints /inventory/
 */

import api from './api';
import { API_CONFIG } from '../config/api';

export const depotService = {
  // ===========================
  // PRODUITS
  // ===========================

  /**
   * Récupérer la liste des produits avec leurs conditionnements
   * 
   * @param {Object} filters - Filtres optionnels
   * @param {string} filters.search - Recherche par nom/code
   * @param {number} filters.categorie - ID catégorie
   * @param {boolean} filters.est_actif - Produits actifs seulement
   * @returns {Promise<Array>} Liste des produits
   */
  getProducts: async (filters = {}) => {
    try {
      const params = {};

      if (filters.search) {
        params.search = filters.search;
      }

      if (filters.categorie) {
        params.categorie = filters.categorie;
      }

      if (filters.est_actif !== undefined) {
        params.est_actif = filters.est_actif;
      }

      const response = await api.get(API_CONFIG.ENDPOINTS.PRODUITS, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Récupérer un produit par ID
   * 
   * @param {number} id - ID du produit
   * @returns {Promise<Object>} Détails du produit
   */
  getProductById: async (id) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PRODUITS_DETAIL(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Rechercher un produit par code-barres
   * 
   * @param {string} code - Code-barres
   * @returns {Promise<Object>} Produit trouvé
   */
  searchByCode: async (code) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PRODUITS, {
        params: { code }
      });
      
      // Retourner le premier résultat
      return response.data?.[0] || null;
    } catch (error) {
      console.error(`Error searching product by code ${code}:`, error);
      throw error;
    }
  },

  // ===========================
  // CATÉGORIES
  // ===========================

  /**
   * Récupérer la liste des catégories
   * 
   * @returns {Promise<Array>} Liste des catégories
   */
  getCategories: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Récupérer une catégorie par ID
   * 
   * @param {number} id - ID de la catégorie
   * @returns {Promise<Object>} Détails de la catégorie
   */
  getCategoryById: async (id) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIES_DETAIL(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  // ===========================
  // VENTES
  // ===========================

  /**
   * Créer une nouvelle vente
   * 
   * @param {Object} venteData - Données de la vente
   * @param {Array} venteData.lignes - Lignes de vente
   * @param {number} venteData.lignes[].produit - ID du produit
   * @param {number} venteData.lignes[].quantite - Quantité vendue
   * @param {number} venteData.lignes[].prix_unitaire - Prix unitaire
   * @param {string} venteData.mode_paiement - Mode de paiement
   * @param {number} venteData.montant_recu - Montant reçu
   * @returns {Promise<Object>} Vente créée
   */
  createVente: async (venteData) => {
    try {
      // Préparer les données selon le format API
      const payload = {
        lignes: venteData.lignes.map(ligne => ({
          produit: ligne.produit,
          quantite: ligne.quantite,
          prix_unitaire: ligne.prix_unitaire,
          // Optionnel: ajouter conditionnement si backend le supporte
          conditionnement: ligne.conditionnement
        })),
        mode_paiement: venteData.mode_paiement || 'especes',
        montant_recu: venteData.montant_recu,
        notes: venteData.notes || ''
      };

      const response = await api.post(API_CONFIG.ENDPOINTS.VENTES, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating vente:', error);
      throw error;
    }
  },

  /**
   * Récupérer la liste des ventes
   * 
   * @param {Object} filters - Filtres optionnels
   * @param {string} filters.date_debut - Date de début (YYYY-MM-DD)
   * @param {string} filters.date_fin - Date de fin (YYYY-MM-DD)
   * @param {number} filters.page - Numéro de page
   * @param {number} filters.page_size - Taille de page
   * @returns {Promise<Object>} Liste paginée des ventes
   */
  getVentes: async (filters = {}) => {
    try {
      const params = {};

      if (filters.date_debut) {
        params.date_debut = filters.date_debut;
      }

      if (filters.date_fin) {
        params.date_fin = filters.date_fin;
      }

      if (filters.page) {
        params.page = filters.page;
      }

      if (filters.page_size) {
        params.page_size = filters.page_size;
      }

      const response = await api.get(API_CONFIG.ENDPOINTS.VENTES, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching ventes:', error);
      throw error;
    }
  },

  /**
   * Récupérer une vente par ID
   * 
   * @param {number} id - ID de la vente
   * @returns {Promise<Object>} Détails de la vente
   */
  getVenteById: async (id) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.VENTES_DETAIL(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching vente ${id}:`, error);
      throw error;
    }
  },

  // ===========================
  // STATISTIQUES (OPTIONNEL)
  // ===========================

  /**
   * Récupérer les statistiques du dépôt
   * 
   * @param {Object} params - Paramètres optionnels
   * @param {string} params.periode - Période (jour, semaine, mois)
   * @returns {Promise<Object>} Statistiques
   */
  getStats: async (params = {}) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.MOUVEMENTS_STATS, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Si l'endpoint n'existe pas, retourner stats vides
      return {
        total_produits: 0,
        valeur_stock: 0,
        stock_bas: 0,
        stock_rupture: 0
      };
    }
  },

  // ===========================
  // HELPERS
  // ===========================

  /**
   * Transformer les prix_vente_options pour le frontend
   * 
   * @param {Object} product - Produit de l'API
   * @returns {Object} Produit avec conditionnements transformés
   */
  transformProduct: (product) => {
    // Le backend retourne déjà prix_vente_options
    // On peut optionnellement ajouter des transformations
    return {
      ...product,
      // Ajouter un emoji par défaut selon la catégorie
      emoji: getProductEmoji(product.categorie_nom)
    };
  },

  /**
   * Préparer les lignes de vente pour l'API
   * 
   * @param {Array} cartItems - Items du panier
   * @returns {Array} Lignes formatées pour l'API
   */
  prepareVenteLignes: (cartItems) => {
    return cartItems.map(item => ({
      produit: item.productId,
      quantite: item.quantite * item.conditionnementQte, // Quantité totale en unités
      prix_unitaire: item.prixUnitaire / item.conditionnementQte, // Prix par unité
      conditionnement: item.conditionnementType,
      conditionnement_qte: item.conditionnementQte
    }));
  }
};

// ===========================
// HELPERS PRIVÉS
// ===========================

/**
 * Obtenir un emoji selon la catégorie
 */
function getProductEmoji(categorieName) {
  const emojiMap = {
    'Boisson': '🥤',
    'Boissons': '🥤',
    'Alimentaire': '🍞',
    'Alimentation': '🍞',
    'Hygiène': '🧼',
    'Nettoyage': '🧹',
    'Épicerie': '🛒',
    'Fruits': '🍎',
    'Légumes': '🥕',
    'Viande': '🥩',
    'Poisson': '🐟',
    'Produits laitiers': '🥛',
    'Boulangerie': '🥖',
    'Confiserie': '🍬',
    'Conserves': '🥫'
  };

  return emojiMap[categorieName] || '📦';
}

export default depotService;