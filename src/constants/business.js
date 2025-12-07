/**
 * SGPME - Constantes Business
 * 
 * Constantes spécifiques aux différents modules d'entreprise
 * (pharmacie, restaurant, depot, shop)
 */

// ============================================================================
// 💊 PHARMACIE - Constantes spécifiques
// ============================================================================

export const PHARMACY_CONFIG = {
  // Nom du module
  name: 'Pharmacie',
  code: 'pharmacie',
  
  // Icône principale
  icon: 'medical-bag',
  
  // Catégories par défaut (exemples - seront récupérées du backend)
  defaultCategories: [
    'Analgésiques',
    'Antibiotiques',
    'Vitamines',
    'Antihistaminiques',
    'Antiseptiques',
    'Matériel médical',
  ],
  
  // Champs spécifiques produit
  productFields: {
    dosage: true,         // Afficher dosage (ex: 500mg)
    prescription: false,  // Prescription requise (v2)
    composition: false,   // Composition (v2)
    posologie: false,     // Posologie (v2)
  },
  
  // Configuration affichage
  display: {
    showStock: true,
    showCode: true,
    showDosage: true,
    gridColumns: 2,
    imageSize: 80,
  },
  
  // Terminologie
  labels: {
    product: 'Médicament',
    products: 'Médicaments',
    category: 'Catégorie',
    addToCart: 'Ajouter',
    stock: 'Stock disponible',
  },
};

// ============================================================================
// 🍽️ RESTAURANT - Constantes spécifiques
// ============================================================================

export const RESTAURANT_CONFIG = {
  // Nom du module
  name: 'Restaurant',
  code: 'restaurant',
  
  // Icône principale
  icon: 'restaurant',
  
  // Catégories par défaut (exemples)
  defaultCategories: [
    'Entrées',
    'Plats principaux',
    'Desserts',
    'Boissons',
    'Accompagnements',
  ],
  
  // Champs spécifiques produit
  productFields: {
    ingredients: false,      // Liste ingrédients (v2)
    allergenes: false,       // Allergènes (v2)
    calories: false,         // Calories (v2)
    prepTime: false,         // Temps préparation (v2)
    spicyLevel: false,       // Niveau épicé (v2)
  },
  
  // Configuration affichage
  display: {
    showStock: true,        // Disponible/Indisponible
    showCode: false,        // Pas de code pour restaurant
    showDosage: false,
    gridColumns: 1,         // 1 colonne (cards larges)
    imageSize: 120,         // Images GRANDES
  },
  
  // Terminologie
  labels: {
    product: 'Plat',
    products: 'Menu',
    category: 'Type de plat',
    addToCart: 'Commander',
    stock: 'Disponible',
  },
};

// ============================================================================
// 📦 DÉPÔT - Constantes spécifiques
// ============================================================================

export const DEPOT_CONFIG = {
  // Nom du module
  name: 'Dépôt',
  code: 'depot',
  
  // Icône principale
  icon: 'warehouse',
  
  // Catégories par défaut (exemples)
  defaultCategories: [
    'Alimentaire',
    'Boissons',
    'Hygiène',
    'Entretien',
    'Divers',
  ],
  
  // Champs spécifiques produit
  productFields: {
    bulkPrice: true,        // Prix en gros
    minBulkQty: true,       // Quantité min gros (ex: 12)
    packaging: true,        // Conditionnement (ex: carton de 24)
  },
  
  // Configuration affichage
  display: {
    showStock: true,        // TRÈS important
    showCode: true,
    showDosage: false,
    gridColumns: 2,
    imageSize: 80,
    showBulkPrice: true,
    showQuantityButtons: true, // Boutons 1, 12, 24, etc.
  },
  
  // Terminologie
  labels: {
    product: 'Article',
    products: 'Articles',
    category: 'Catégorie',
    addToCart: 'Ajouter',
    stock: 'Quantité en stock',
    bulkPrice: 'Prix en gros',
  },
  
  // Boutons quantité rapide
  quickQuantities: [1, 6, 12, 24, 48],
};

// ============================================================================
// 👕 SHOP - Constantes spécifiques
// ============================================================================

export const SHOP_CONFIG = {
  // Nom du module
  name: 'Shop E-commerce',
  code: 'shop',
  
  // Icône principale
  icon: 'shopping-cart',
  
  // Catégories par défaut (exemples)
  defaultCategories: [
    'Vêtements',
    'Chaussures',
    'Accessoires',
    'Électronique',
    'Beauté',
  ],
  
  // Champs spécifiques produit
  productFields: {
    variants: true,         // Variantes (tailles, couleurs)
    brand: false,           // Marque (v2)
    material: false,        // Matière (v2)
    collection: false,      // Collection (v2)
  },
  
  // Configuration affichage
  display: {
    showStock: true,
    showCode: true,
    showDosage: false,
    gridColumns: 2,
    imageSize: 100,
    showVariants: true,
  },
  
  // Terminologie
  labels: {
    product: 'Produit',
    products: 'Produits',
    category: 'Catégorie',
    addToCart: 'Ajouter au panier',
    stock: 'En stock',
    variant: 'Variante',
    size: 'Taille',
    color: 'Couleur',
  },
  
  // Tailles standards
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  
  // Couleurs standards
  colors: [
    { name: 'Noir', hex: '#000000' },
    { name: 'Blanc', hex: '#FFFFFF' },
    { name: 'Gris', hex: '#808080' },
    { name: 'Bleu', hex: '#007AFF' },
    { name: 'Rouge', hex: '#FF3B30' },
    { name: 'Vert', hex: '#34C759' },
  ],
};

// ============================================================================
// 🗂️ MAP DES CONFIGURATIONS
// ============================================================================

export const BUSINESS_CONFIGS = {
  pharmacie: PHARMACY_CONFIG,
  restaurant: RESTAURANT_CONFIG,
  depot: DEPOT_CONFIG,
  shop: SHOP_CONFIG,
};

// ============================================================================
// 🔧 HELPERS
// ============================================================================

/**
 * Récupère la configuration d'un module
 * @param {string} moduleCode - Code du module ('pharmacie', 'restaurant', etc.)
 * @returns {Object} Configuration du module
 */
export const getBusinessConfig = (moduleCode) => {
  return BUSINESS_CONFIGS[moduleCode] || BUSINESS_CONFIGS.shop;
};

/**
 * Récupère les catégories par défaut d'un module
 * @param {string} moduleCode
 * @returns {Array<string>}
 */
export const getDefaultCategories = (moduleCode) => {
  const config = getBusinessConfig(moduleCode);
  return config.defaultCategories || [];
};

/**
 * Récupère les labels d'un module
 * @param {string} moduleCode
 * @returns {Object}
 */
export const getBusinessLabels = (moduleCode) => {
  const config = getBusinessConfig(moduleCode);
  return config.labels || {};
};

/**
 * Récupère la config d'affichage d'un module
 * @param {string} moduleCode
 * @returns {Object}
 */
export const getBusinessDisplay = (moduleCode) => {
  const config = getBusinessConfig(moduleCode);
  return config.display || {};
};

/**
 * Vérifie si un module supporte les variantes
 * @param {string} moduleCode
 * @returns {boolean}
 */
export const supportsVariants = (moduleCode) => {
  const config = getBusinessConfig(moduleCode);
  return config.productFields?.variants || false;
};

/**
 * Vérifie si un module supporte le prix en gros
 * @param {string} moduleCode
 * @returns {boolean}
 */
export const supportsBulkPrice = (moduleCode) => {
  const config = getBusinessConfig(moduleCode);
  return config.productFields?.bulkPrice || false;
};

// ============================================================================
// 📦 EXPORT PAR DÉFAUT
// ============================================================================

export default {
  PHARMACY_CONFIG,
  RESTAURANT_CONFIG,
  DEPOT_CONFIG,
  SHOP_CONFIG,
  BUSINESS_CONFIGS,
  getBusinessConfig,
  getDefaultCategories,
  getBusinessLabels,
  getBusinessDisplay,
  supportsVariants,
  supportsBulkPrice,
};