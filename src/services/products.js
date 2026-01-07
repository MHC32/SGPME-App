/**
 * SGPME - Products Service
 * 
 * Service pour gérer les produits
 * Utilise l'API Django backend
 */

import apiClient, { parseImageUrl } from './api';
import { API_CONFIG } from '../config/api';

/**
 * Récupère tous les produits disponibles pour la vente
 * @param {Object} filters - Filtres optionnels
 * @returns {Promise<Array>} Liste des produits
 */
export const getProduitsPourVente = async (filters = {}) => {
  console.log('🔵 [ProductsService] getProduitsPourVente() START');
  console.log('   filters:', filters);
  
  try {
    // Construire les paramètres de requête
    const params = new URLSearchParams();
    
    if (filters.categorie) {
      params.append('categorie', filters.categorie);
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    if (filters.en_stock !== undefined) {
      params.append('en_stock', filters.en_stock);
    }
    
    const url = `${API_CONFIG.ENDPOINTS.PRODUITS_VENTE}?${params.toString()}`;
    console.log('   URL:', url);
    
    const response = await apiClient.get(url);
    
    // Parse les URLs d'images
    const products = response.data.map(product => ({
      ...product,
      image: product.image ? parseImageUrl(product.image) : null,
    }));
    
    console.log('✅ [ProductsService] Products fetched');
    console.log('   Count:', products.length);
    
    return products;
    
  } catch (error) {
    console.log('❌ [ProductsService] getProduitsPourVente() ERROR:', error);
    throw error;
  }
};

/**
 * Récupère un produit par ID
 * @param {string} productId - ID du produit
 * @returns {Promise<Object>} Produit
 */
export const getProductById = async (productId) => {
  console.log('🔵 [ProductsService] getProductById() START');
  console.log('   productId:', productId);
  
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUITS_DETAIL(productId));
    
    // Parse l'URL de l'image
    const product = {
      ...response.data,
      image: response.data.image ? parseImageUrl(response.data.image) : null,
    };
    
    console.log('✅ [ProductsService] Product fetched:', product.nom);
    
    return product;
    
  } catch (error) {
    console.log('❌ [ProductsService] getProductById() ERROR:', error);
    throw error;
  }
};

/**
 * Recherche des produits
 * @param {string} query - Terme de recherche
 * @returns {Promise<Array>} Produits trouvés
 */
export const searchProducts = async (query) => {
  console.log('🔵 [ProductsService] searchProducts() START');
  console.log('   query:', query);
  
  try {
    const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.PRODUITS_VENTE}?search=${query}`);
    
    // Parse les URLs d'images
    const products = response.data.map(product => ({
      ...product,
      image: product.image ? parseImageUrl(product.image) : null,
    }));
    
    console.log('✅ [ProductsService] Search results:', products.length);
    
    return products;
    
  } catch (error) {
    console.log('❌ [ProductsService] searchProducts() ERROR:', error);
    throw error;
  }
};

/**
 * Récupère les produits en rupture de stock
 * @returns {Promise<Array>} Produits en rupture
 */
export const getProduitsEnRupture = async () => {
  console.log('🔵 [ProductsService] getProduitsEnRupture() START');
  
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUITS_EN_RUPTURE);
    
    console.log('✅ [ProductsService] Products en rupture fetched:', response.data.length);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [ProductsService] getProduitsEnRupture() ERROR:', error);
    throw error;
  }
};

/**
 * Récupère les produits avec stock faible
 * @returns {Promise<Array>} Produits avec stock faible
 */
export const getProduitsStockFaible = async () => {
  console.log('🔵 [ProductsService] getProduitsStockFaible() START');
  
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUITS_STOCK_FAIBLE);
    
    console.log('✅ [ProductsService] Products stock faible fetched:', response.data.length);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [ProductsService] getProduitsStockFaible() ERROR:', error);
    throw error;
  }
};

/**
 * Récupère les produits par catégorie
 * @param {string} categoryId - ID de la catégorie
 * @returns {Promise<Array>} Produits de la catégorie
 */
export const getProductsByCategory = async (categoryId) => {
  console.log('🔵 [ProductsService] getProductsByCategory() START');
  console.log('   categoryId:', categoryId);
  
  try {
    const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.PRODUITS_VENTE}?categorie=${categoryId}`);
    
    // Parse les URLs d'images
    const products = response.data.map(product => ({
      ...product,
      image: product.image ? parseImageUrl(product.image) : null,
    }));
    
    console.log('✅ [ProductsService] Products by category fetched:', products.length);
    
    return products;
    
  } catch (error) {
    console.log('❌ [ProductsService] getProductsByCategory() ERROR:', error);
    throw error;
  }
};

/**
 * Créer un nouveau produit
 * @param {Object} productData - Données du produit
 * @returns {Promise<Object>} Produit créé
 */
export const createProduct = async (productData) => {
  console.log('🔵 [ProductsService] createProduct() START');
  console.log('   productData:', productData);
  
  try {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.PRODUITS, productData);
    
    console.log('✅ [ProductsService] Product created:', response.data.nom);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [ProductsService] createProduct() ERROR:', error);
    throw error;
  }
};

/**
 * Mettre à jour un produit
 * @param {string} productId - ID du produit
 * @param {Object} productData - Nouvelles données
 * @returns {Promise<Object>} Produit mis à jour
 */
export const updateProduct = async (productId, productData) => {
  console.log('🔵 [ProductsService] updateProduct() START');
  console.log('   productId:', productId);
  
  try {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.PRODUITS_DETAIL(productId), productData);
    
    console.log('✅ [ProductsService] Product updated:', response.data.nom);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [ProductsService] updateProduct() ERROR:', error);
    throw error;
  }
};

/**
 * Supprimer un produit
 * @param {string} productId - ID du produit
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  console.log('🔵 [ProductsService] deleteProduct() START');
  console.log('   productId:', productId);
  
  try {
    await apiClient.delete(API_CONFIG.ENDPOINTS.PRODUITS_DETAIL(productId));
    
    console.log('✅ [ProductsService] Product deleted');
    
  } catch (error) {
    console.log('❌ [ProductsService] deleteProduct() ERROR:', error);
    throw error;
  }
};

/**
 * Vérifier la disponibilité d'un produit
 * @param {string} productId - ID du produit
 * @param {number} quantite - Quantité demandée
 * @returns {Promise<Object>} { disponible: boolean, stock_actuel: number }
 */
export const checkProductAvailability = async (productId, quantite) => {
  console.log('🔵 [ProductsService] checkProductAvailability() START');
  console.log('   productId:', productId);
  console.log('   quantite:', quantite);
  
  try {
    const product = await getProductById(productId);
    
    const disponible = product.stock_actuel >= quantite;
    
    console.log('✅ [ProductsService] Availability checked');
    console.log('   Disponible:', disponible);
    console.log('   Stock actuel:', product.stock_actuel);
    
    return {
      disponible,
      stock_actuel: product.stock_actuel,
    };
    
  } catch (error) {
    console.log('❌ [ProductsService] checkProductAvailability() ERROR:', error);
    throw error;
  }
};

// Export par défaut
const productsService = {
  getProduitsPourVente,
  getProductById,
  searchProducts,
  getProduitsEnRupture,
  getProduitsStockFaible,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductAvailability,
};

export default productsService;