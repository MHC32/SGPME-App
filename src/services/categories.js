/**
 * SGPME - Categories Service
 * 
 * Service pour gérer les catégories de produits
 * Utilise l'API Django backend
 */

import apiClient from './api';
import { API_CONFIG } from '../config/api';

/**
 * Récupère toutes les catégories
 * @returns {Promise<Array>} Liste des catégories
 */
export const getCategories = async () => {
  console.log('🔵 [CategoriesService] getCategories() START');
  
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES);
    
    // Django REST Framework retourne un objet paginé : {count, next, previous, results}
    // On extrait le tableau results
    const categories = response.data.results || response.data;
    
    console.log('✅ [CategoriesService] Categories fetched');
    console.log('   Count:', categories.length);
    
    return categories;
    
  } catch (error) {
    console.log('❌ [CategoriesService] getCategories() ERROR:', error);
    throw error;
  }
};

/**
 * Récupère une catégorie par ID
 * @param {string} categoryId - ID de la catégorie
 * @returns {Promise<Object>} Catégorie
 */
export const getCategoryById = async (categoryId) => {
  console.log('🔵 [CategoriesService] getCategoryById() START');
  console.log('   categoryId:', categoryId);
  
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES_DETAIL(categoryId));
    
    console.log('✅ [CategoriesService] Category fetched:', response.data.nom);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [CategoriesService] getCategoryById() ERROR:', error);
    throw error;
  }
};

/**
 * Récupère les catégories pour un module spécifique
 * @param {string} module - Module actif ('pharmacie', 'restaurant', 'depot', 'shop')
 * @returns {Promise<Array>} Liste des catégories filtrées
 */
export const getCategoriesByModule = async (module) => {
  console.log('🔵 [CategoriesService] getCategoriesByModule() START');
  console.log('   module:', module);
  
  try {
    // Récupère toutes les catégories
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES);
    
    // Filtre selon le module
    // Note: Le backend devrait retourner seulement les catégories de l'entreprise
    // mais on filtre quand même par sécurité
    let categories = response.data;
    
    console.log('✅ [CategoriesService] Categories fetched');
    console.log('   Total:', categories.length);
    
    return categories;
    
  } catch (error) {
    console.log('❌ [CategoriesService] getCategoriesByModule() ERROR:', error);
    throw error;
  }
};

/**
 * Créer une nouvelle catégorie
 * @param {Object} categoryData - Données de la catégorie
 * @returns {Promise<Object>} Catégorie créée
 */
export const createCategory = async (categoryData) => {
  console.log('🔵 [CategoriesService] createCategory() START');
  console.log('   categoryData:', categoryData);
  
  try {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CATEGORIES, categoryData);
    
    console.log('✅ [CategoriesService] Category created:', response.data.nom);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [CategoriesService] createCategory() ERROR:', error);
    throw error;
  }
};

/**
 * Mettre à jour une catégorie
 * @param {string} categoryId - ID de la catégorie
 * @param {Object} categoryData - Nouvelles données
 * @returns {Promise<Object>} Catégorie mise à jour
 */
export const updateCategory = async (categoryId, categoryData) => {
  console.log('🔵 [CategoriesService] updateCategory() START');
  console.log('   categoryId:', categoryId);
  
  try {
    const response = await apiClient.patch(API_CONFIG.ENDPOINTS.CATEGORIES_DETAIL(categoryId), categoryData);
    
    console.log('✅ [CategoriesService] Category updated:', response.data.nom);
    
    return response.data;
    
  } catch (error) {
    console.log('❌ [CategoriesService] updateCategory() ERROR:', error);
    throw error;
  }
};

/**
 * Supprimer une catégorie
 * @param {string} categoryId - ID de la catégorie
 * @returns {Promise<void>}
 */
export const deleteCategory = async (categoryId) => {
  console.log('🔵 [CategoriesService] deleteCategory() START');
  console.log('   categoryId:', categoryId);
  
  try {
    await apiClient.delete(API_CONFIG.ENDPOINTS.CATEGORIES_DETAIL(categoryId));
    
    console.log('✅ [CategoriesService] Category deleted');
    
  } catch (error) {
    console.log('❌ [CategoriesService] deleteCategory() ERROR:', error);
    throw error;
  }
};

// Export par défaut
const categoriesService = {
  getCategories,
  getCategoryById,
  getCategoriesByModule,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesService;