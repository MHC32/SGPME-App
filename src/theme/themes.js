/**
 * SGPME - Configuration des Thèmes Dynamiques
 * 
 * Thèmes optimisés pour interface VENDEUR (POS)
 * Basés sur le logo noir/blanc avec accents subtils par module
 * 
 * Modules supportés : pharmacie, restaurant, depot, shop
 */

import {
  BASE_COLORS,
  PHARMACY_COLORS,
  RESTAURANT_COLORS,
  DEPOT_COLORS,
  SHOP_COLORS,
  STATUS_COLORS,
  UI_COLORS,
} from '../constants/colors';

import { BUSINESS_MODULES } from '../utils/constants';

// ============================================================================
// 💊 THÈME PHARMACIE
// ============================================================================

export const PHARMACY_THEME = {
  // Identifiant
  id: BUSINESS_MODULES.PHARMACIE,
  name: 'Pharmacie',
  
  // Couleurs (Bleu médical + Noir/Blanc)
  colors: {
    // Primaires
    primary: PHARMACY_COLORS.primary,           // Bleu #007AFF
    primaryLight: PHARMACY_COLORS.primaryLight, // Bleu clair
    primaryDark: PHARMACY_COLORS.primaryDark,   // Bleu foncé
    accent: PHARMACY_COLORS.accent,             // Bleu accent
    
    // Backgrounds (blanc dominant)
    background: BASE_COLORS.white,
    backgroundSecondary: BASE_COLORS.gray50,
    card: BASE_COLORS.gray50,
    cardActive: PHARMACY_COLORS.primaryLight,
    
    // Textes (noir dominant)
    text: BASE_COLORS.black,
    textSecondary: BASE_COLORS.gray600,
    textLight: BASE_COLORS.gray500,
    textInverse: BASE_COLORS.white,
    
    // UI
    border: UI_COLORS.border,
    divider: UI_COLORS.divider,
    shadow: UI_COLORS.shadow,
    
    // Status (standards)
    success: STATUS_COLORS.success,
    warning: STATUS_COLORS.warning,
    error: STATUS_COLORS.error,
    info: STATUS_COLORS.info,
  },
  
  // Icônes spécifiques
  icons: {
    home: 'medical-bag',
    product: 'pill',
    products: 'clipboard-list',
    category: 'flask',
    cart: 'shopping-basket',
    stock: 'package-variant',
    add: 'plus-circle',
    remove: 'minus-circle',
    search: 'magnify',
    barcode: 'barcode-scan',
  },
  
  // Terminologie métier
  labels: {
    product: 'Médicament',
    products: 'Médicaments',
    category: 'Catégorie',
    categories: 'Catégories',
    addToCart: 'Ajouter',
    removeFromCart: 'Retirer',
    stock: 'Stock disponible',
    outOfStock: 'Rupture de stock',
    lowStock: 'Stock faible',
    unit: 'Unité',
    price: 'Prix',
    total: 'Total',
    search: 'Rechercher un médicament...',
  },
  
  // Configuration layout VENDEUR
  layout: {
    // Type de card produit
    productCardStyle: 'medical',
    
    // Grille produits
    gridColumns: 2,
    gridSpacing: 12,
    
    // Affichage
    showDosage: true,           // Afficher dosage (ex: 500mg)
    showStock: true,            // Toujours afficher stock
    showStockBadge: true,       // Badge couleur stock
    showQuickAdd: true,         // Bouton + rapide
    showImage: true,            // Image produit
    showCode: true,             // Code produit/barre
    
    // Tailles
    productImageSize: 80,       // Taille image
    priceSize: 'large',         // Prix gros et visible
    buttonSize: 'medium',       // Bouton taille moyenne
    
    // Header
    headerStyle: 'professional',
    showSearchBar: true,        // Recherche toujours visible
    showCartBadge: true,        // Badge panier visible
  },
  
  // Espacement (identique pour tous)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Bordures
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  
  // Ombres
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// ============================================================================
// 🍽️ THÈME RESTAURANT
// ============================================================================

export const RESTAURANT_THEME = {
  id: BUSINESS_MODULES.RESTAURANT,
  name: 'Restaurant',
  
  // Couleurs (Vert principal + Noir/Blanc)
  colors: {
    primary: '#34C759',                    // Vert (ajusté depuis orange)
    primaryLight: '#E8F5E9',               // Vert clair
    primaryDark: '#2BA048',                // Vert foncé
    accent: RESTAURANT_COLORS.primary,     // Orange en accent (#FF9500)
    
    background: BASE_COLORS.white,
    backgroundSecondary: '#FFFBF5',        // Légèrement chaud
    card: BASE_COLORS.gray50,
    cardActive: '#E8F5E9',
    
    text: BASE_COLORS.black,
    textSecondary: BASE_COLORS.gray600,
    textLight: BASE_COLORS.gray500,
    textInverse: BASE_COLORS.white,
    
    border: UI_COLORS.border,
    divider: UI_COLORS.divider,
    shadow: UI_COLORS.shadow,
    
    success: STATUS_COLORS.success,
    warning: STATUS_COLORS.warning,
    error: STATUS_COLORS.error,
    info: STATUS_COLORS.info,
  },
  
  icons: {
    home: 'restaurant',
    product: 'food',
    products: 'food-variant',
    category: 'silverware-fork-knife',
    cart: 'food-apple',
    stock: 'check-circle',
    add: 'plus-circle',
    remove: 'minus-circle',
    search: 'magnify',
    barcode: 'qrcode',
  },
  
  labels: {
    product: 'Plat',
    products: 'Menu',
    category: 'Type',
    categories: 'Types de plats',
    addToCart: 'Commander',
    removeFromCart: 'Retirer',
    stock: 'Disponible',
    outOfStock: 'Indisponible',
    lowStock: 'Bientôt épuisé',
    unit: 'Portion',
    price: 'Prix',
    total: 'Total',
    search: 'Rechercher un plat...',
  },
  
  layout: {
    productCardStyle: 'appetizing',
    
    // Layout différent : 1 colonne (cards plus larges)
    gridColumns: 1,
    gridSpacing: 12,
    
    showDosage: false,
    showStock: true,            // Disponible/Indisponible
    showStockBadge: true,
    showQuickAdd: true,
    showImage: true,            // Images IMPORTANTES pour food
    showCode: false,            // Pas de code-barre restaurant
    
    productImageSize: 120,      // Images plus GRANDES
    priceSize: 'xlarge',        // Prix TRÈS gros
    buttonSize: 'large',        // Boutons larges
    
    headerStyle: 'warm',
    showSearchBar: true,
    showCartBadge: true,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// ============================================================================
// 📦 THÈME DÉPÔT
// ============================================================================

export const DEPOT_THEME = {
  id: BUSINESS_MODULES.DEPOT,
  name: 'Dépôt',
  
  // Couleurs (Gris sobre + Noir/Blanc)
  colors: {
    primary: DEPOT_COLORS.primary,         // Gris foncé #404040
    primaryLight: DEPOT_COLORS.primaryLight,
    primaryDark: DEPOT_COLORS.primaryDark,
    accent: DEPOT_COLORS.accent,
    
    background: BASE_COLORS.white,
    backgroundSecondary: BASE_COLORS.gray50,
    card: BASE_COLORS.gray50,
    cardActive: BASE_COLORS.gray100,
    
    text: BASE_COLORS.black,
    textSecondary: BASE_COLORS.gray600,
    textLight: BASE_COLORS.gray500,
    textInverse: BASE_COLORS.white,
    
    border: UI_COLORS.border,
    divider: UI_COLORS.divider,
    shadow: UI_COLORS.shadow,
    
    success: STATUS_COLORS.success,
    warning: STATUS_COLORS.warning,
    error: STATUS_COLORS.error,
    info: STATUS_COLORS.info,
  },
  
  icons: {
    home: 'warehouse',
    product: 'box',
    products: 'package-variant-closed',
    category: 'format-list-bulleted',
    cart: 'cart-outline',
    stock: 'chart-line',
    add: 'plus-circle',
    remove: 'minus-circle',
    search: 'magnify',
    barcode: 'barcode',
  },
  
  labels: {
    product: 'Article',
    products: 'Articles',
    category: 'Catégorie',
    categories: 'Catégories',
    addToCart: 'Ajouter',
    removeFromCart: 'Retirer',
    stock: 'Quantité en stock',
    outOfStock: 'Rupture',
    lowStock: 'Stock faible',
    unit: 'Unité',
    bulkUnit: 'Gros',
    price: 'Prix unitaire',
    bulkPrice: 'Prix en gros',
    total: 'Total',
    search: 'Rechercher un article...',
  },
  
  layout: {
    productCardStyle: 'wholesale',
    
    gridColumns: 2,
    gridSpacing: 12,
    
    showDosage: false,
    showStock: true,            // TRÈS important pour wholesale
    showStockBadge: true,
    showQuickAdd: true,
    showImage: true,
    showCode: true,
    showBulkPrice: true,        // Afficher prix gros
    showQuantityButtons: true,  // Boutons 1, 12, 24, etc.
    
    productImageSize: 80,
    priceSize: 'large',
    buttonSize: 'medium',
    
    headerStyle: 'simple',
    showSearchBar: true,
    showCartBadge: true,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// ============================================================================
// 👕 THÈME SHOP
// ============================================================================

export const SHOP_THEME = {
  id: BUSINESS_MODULES.SHOP,
  name: 'Shop E-commerce',
  
  // Couleurs (Noir moderne + Blanc)
  colors: {
    primary: SHOP_COLORS.primary,          // Noir #000000
    primaryLight: SHOP_COLORS.primaryLight,
    primaryDark: SHOP_COLORS.primaryDark,
    accent: SHOP_COLORS.accent,
    
    background: BASE_COLORS.white,
    backgroundSecondary: BASE_COLORS.gray50,
    card: BASE_COLORS.gray50,
    cardActive: BASE_COLORS.gray100,
    
    text: BASE_COLORS.black,
    textSecondary: BASE_COLORS.gray600,
    textLight: BASE_COLORS.gray500,
    textInverse: BASE_COLORS.white,
    
    border: UI_COLORS.border,
    divider: UI_COLORS.divider,
    shadow: UI_COLORS.shadow,
    
    success: STATUS_COLORS.success,
    warning: STATUS_COLORS.warning,
    error: STATUS_COLORS.error,
    info: STATUS_COLORS.info,
  },
  
  icons: {
    home: 'shopping',
    product: 'tag',
    products: 'shopping-outline',
    category: 'grid',
    cart: 'basket',
    stock: 'package-variant',
    add: 'plus-circle',
    remove: 'minus-circle',
    search: 'magnify',
    barcode: 'barcode-scan',
  },
  
  labels: {
    product: 'Produit',
    products: 'Produits',
    category: 'Catégorie',
    categories: 'Catégories',
    addToCart: 'Ajouter au panier',
    removeFromCart: 'Retirer',
    stock: 'En stock',
    outOfStock: 'Rupture',
    lowStock: 'Stock limité',
    unit: 'Pièce',
    price: 'Prix',
    total: 'Total',
    search: 'Rechercher un produit...',
    variant: 'Variante',
    size: 'Taille',
    color: 'Couleur',
  },
  
  layout: {
    productCardStyle: 'modern',
    
    gridColumns: 2,
    gridSpacing: 12,
    
    showDosage: false,
    showStock: true,
    showStockBadge: true,
    showQuickAdd: true,
    showImage: true,
    showCode: true,
    showVariants: true,         // Tailles/couleurs
    showBrand: false,           // Marque (optionnel v2)
    
    productImageSize: 100,
    priceSize: 'large',
    buttonSize: 'medium',
    
    headerStyle: 'trendy',
    showSearchBar: true,
    showCartBadge: true,
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// ============================================================================
// 🎨 MAP DES THÈMES
// ============================================================================

export const THEMES = {
  [BUSINESS_MODULES.PHARMACIE]: PHARMACY_THEME,
  [BUSINESS_MODULES.RESTAURANT]: RESTAURANT_THEME,
  [BUSINESS_MODULES.DEPOT]: DEPOT_THEME,
  [BUSINESS_MODULES.SHOP]: SHOP_THEME,
};

// ============================================================================
// 🔧 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère le thème complet selon le module
 * @param {string} moduleActif - Module actif ('pharmacie', 'restaurant', 'depot', 'shop')
 * @returns {object} Configuration thème complète
 */
export const getThemeByModule = (moduleActif) => {
  return THEMES[moduleActif] || THEMES[BUSINESS_MODULES.SHOP];
};

/**
 * Récupère uniquement les couleurs d'un thème
 * @param {string} moduleActif
 * @returns {object} Couleurs du thème
 */
export const getThemeColors = (moduleActif) => {
  const theme = getThemeByModule(moduleActif);
  return theme.colors;
};

/**
 * Récupère les icônes d'un thème
 * @param {string} moduleActif
 * @returns {object} Icônes du thème
 */
export const getThemeIcons = (moduleActif) => {
  const theme = getThemeByModule(moduleActif);
  return theme.icons;
};

/**
 * Récupère les labels d'un thème
 * @param {string} moduleActif
 * @returns {object} Labels du thème
 */
export const getThemeLabels = (moduleActif) => {
  const theme = getThemeByModule(moduleActif);
  return theme.labels;
};

/**
 * Récupère la configuration layout d'un thème
 * @param {string} moduleActif
 * @returns {object} Configuration layout
 */
export const getThemeLayout = (moduleActif) => {
  const theme = getThemeByModule(moduleActif);
  return theme.layout;
};

// ============================================================================
// 📦 EXPORT PAR DÉFAUT
// ============================================================================

export default {
  PHARMACY_THEME,
  RESTAURANT_THEME,
  DEPOT_THEME,
  SHOP_THEME,
  THEMES,
  getThemeByModule,
  getThemeColors,
  getThemeIcons,
  getThemeLabels,
  getThemeLayout,
};