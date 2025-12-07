/**
 * SGPME - Constantes de l'application
 * Basé sur le backend Django REST API
 * 
 * Ce fichier contient toutes les constantes utilisées dans l'application
 * pour garantir la cohérence avec le backend
 */

// ============================================================================
// RÔLES UTILISATEURS (core.User.role)
// ============================================================================
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  PROPRIETAIRE: 'proprietaire',
  VENDEUR: 'vendeur',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Administrateur',
  [USER_ROLES.PROPRIETAIRE]: 'Propriétaire',
  [USER_ROLES.VENDEUR]: 'Vendeur',
};

// Rôles qui peuvent se connecter à l'app mobile
export const MOBILE_APP_ROLES = [USER_ROLES.VENDEUR];

// Rôles qui peuvent gérer les utilisateurs
export const MANAGER_ROLES = [USER_ROLES.SUPER_ADMIN, USER_ROLES.PROPRIETAIRE];

// ============================================================================
// MODULES D'ENTREPRISE (core.Entreprise.module_actif)
// ============================================================================
export const BUSINESS_MODULES = {
  PHARMACIE: 'pharmacie',
  RESTAURANT: 'restaurant',
  DEPOT: 'depot',
  SHOP: 'shop',
};

export const BUSINESS_MODULE_LABELS = {
  [BUSINESS_MODULES.PHARMACIE]: 'Pharmacie',
  [BUSINESS_MODULES.RESTAURANT]: 'Restaurant',
  [BUSINESS_MODULES.DEPOT]: 'Dépôt',
  [BUSINESS_MODULES.SHOP]: 'Shop E-commerce',
};

export const BUSINESS_MODULE_ICONS = {
  [BUSINESS_MODULES.PHARMACIE]: 'medical-bag',
  [BUSINESS_MODULES.RESTAURANT]: 'restaurant',
  [BUSINESS_MODULES.DEPOT]: 'warehouse',
  [BUSINESS_MODULES.SHOP]: 'shopping-cart',
};

// ============================================================================
// STATUTS D'ENTREPRISE (core.Entreprise.statut)
// ============================================================================
export const ENTREPRISE_STATUTS = {
  ACTIF: 'actif',
  SUSPENDU: 'suspendu',
  EXPIRE: 'expire',
};

export const ENTREPRISE_STATUT_LABELS = {
  [ENTREPRISE_STATUTS.ACTIF]: 'Actif',
  [ENTREPRISE_STATUTS.SUSPENDU]: 'Suspendu',
  [ENTREPRISE_STATUTS.EXPIRE]: 'Expiré',
};

export const ENTREPRISE_STATUT_COLORS = {
  [ENTREPRISE_STATUTS.ACTIF]: '#10B981', // green
  [ENTREPRISE_STATUTS.SUSPENDU]: '#F59E0B', // orange
  [ENTREPRISE_STATUTS.EXPIRE]: '#EF4444', // red
};

// ============================================================================
// UNITÉS DE MESURE (inventory.Produit.unite)
// ============================================================================
export const PRODUCT_UNITS = {
  UNITE: 'unite',
  KG: 'kg',
  G: 'g',
  L: 'l',
  ML: 'ml',
  PAQUET: 'paquet',
  BOITE: 'boite',
};

export const PRODUCT_UNIT_LABELS = {
  [PRODUCT_UNITS.UNITE]: 'Unité',
  [PRODUCT_UNITS.KG]: 'Kilogramme (kg)',
  [PRODUCT_UNITS.G]: 'Gramme (g)',
  [PRODUCT_UNITS.L]: 'Litre (L)',
  [PRODUCT_UNITS.ML]: 'Millilitre (mL)',
  [PRODUCT_UNITS.PAQUET]: 'Paquet',
  [PRODUCT_UNITS.BOITE]: 'Boîte',
};

export const PRODUCT_UNIT_SHORT_LABELS = {
  [PRODUCT_UNITS.UNITE]: 'un.',
  [PRODUCT_UNITS.KG]: 'kg',
  [PRODUCT_UNITS.G]: 'g',
  [PRODUCT_UNITS.L]: 'L',
  [PRODUCT_UNITS.ML]: 'mL',
  [PRODUCT_UNITS.PAQUET]: 'pqt',
  [PRODUCT_UNITS.BOITE]: 'bte',
};

// ============================================================================
// MODES DE PAIEMENT (inventory.Vente.mode_paiement)
// ============================================================================
export const PAYMENT_MODES = {
  ESPECES: 'especes',
  CARTE: 'carte',
  MOBILE: 'mobile',
  CREDIT: 'credit',
  CHEQUE: 'cheque',
};

export const PAYMENT_MODE_LABELS = {
  [PAYMENT_MODES.ESPECES]: 'Espèces',
  [PAYMENT_MODES.CARTE]: 'Carte bancaire',
  [PAYMENT_MODES.MOBILE]: 'Paiement mobile',
  [PAYMENT_MODES.CREDIT]: 'Crédit',
  [PAYMENT_MODES.CHEQUE]: 'Chèque',
};

export const PAYMENT_MODE_ICONS = {
  [PAYMENT_MODES.ESPECES]: 'cash',
  [PAYMENT_MODES.CARTE]: 'credit-card',
  [PAYMENT_MODES.MOBILE]: 'phone',
  [PAYMENT_MODES.CREDIT]: 'receipt',
  [PAYMENT_MODES.CHEQUE]: 'document-text',
};

// Modes de paiement disponibles pour l'app mobile (v1)
export const MOBILE_PAYMENT_MODES = [
  PAYMENT_MODES.ESPECES,
  PAYMENT_MODES.CARTE,
  PAYMENT_MODES.MOBILE,
];

// ============================================================================
// STATUTS DE VENTE (inventory.Vente.statut)
// ============================================================================
export const VENTE_STATUTS = {
  EN_COURS: 'en_cours',
  VALIDEE: 'validee',
  ANNULEE: 'annulee',
};

export const VENTE_STATUT_LABELS = {
  [VENTE_STATUTS.EN_COURS]: 'En cours',
  [VENTE_STATUTS.VALIDEE]: 'Validée',
  [VENTE_STATUTS.ANNULEE]: 'Annulée',
};

export const VENTE_STATUT_COLORS = {
  [VENTE_STATUTS.EN_COURS]: '#F59E0B', // orange
  [VENTE_STATUTS.VALIDEE]: '#10B981', // green
  [VENTE_STATUTS.ANNULEE]: '#EF4444', // red
};

// ============================================================================
// TYPES DE MOUVEMENT STOCK (inventory.MouvementStock.type_mouvement)
// ============================================================================
export const MOUVEMENT_TYPES = {
  ENTREE: 'entree',
  SORTIE: 'sortie',
  AJUSTEMENT: 'ajustement',
  RETOUR: 'retour',
};

export const MOUVEMENT_TYPE_LABELS = {
  [MOUVEMENT_TYPES.ENTREE]: 'Entrée',
  [MOUVEMENT_TYPES.SORTIE]: 'Sortie',
  [MOUVEMENT_TYPES.AJUSTEMENT]: 'Ajustement',
  [MOUVEMENT_TYPES.RETOUR]: 'Retour',
};

// ============================================================================
// DEVISE
// ============================================================================
export const CURRENCY = {
  CODE: 'HTG',
  SYMBOL: 'G',
  NAME: 'Gourde Haïtienne',
  DECIMAL_PLACES: 2,
};

// ============================================================================
// LIMITES ET SEUILS
// ============================================================================
export const LIMITS = {
  // Stock
  STOCK_MIN_DEFAULT: 10,
  STOCK_ALERT_THRESHOLD: 20, // Alert si stock <= seuil
  
  // Pagination
  ITEMS_PER_PAGE: 20,
  PRODUCTS_PER_PAGE: 30,
  VENTES_PER_PAGE: 50,
  
  // Recherche
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_RESULTS: 50,
  
  // Vente
  MAX_CART_ITEMS: 100,
  MAX_QUANTITY_PER_ITEM: 999,
  
  // Client
  VIP_THRESHOLD: 10000, // HTG - Seuil pour client VIP
  POINTS_PER_HTG: 1, // 1 point par gourde dépensée
  
  // Fichiers
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5 MB
  MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2 MB
};

// ============================================================================
// FORMATS DE DATE
// ============================================================================
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_TIME: 'DD/MM/YYYY HH:mm',
  DISPLAY_FULL: 'DD/MM/YYYY à HH:mm:ss',
  API: 'YYYY-MM-DD',
  API_TIME: 'YYYY-MM-DDTHH:mm:ss',
  TIME_ONLY: 'HH:mm',
};

// ============================================================================
// MESSAGES D'ERREUR STANDARDS
// ============================================================================
export const ERROR_MESSAGES = {
  NETWORK: 'Erreur de connexion. Vérifiez votre internet.',
  SERVER: 'Erreur serveur. Réessayez plus tard.',
  AUTH: 'Session expirée. Reconnectez-vous.',
  NOT_FOUND: 'Élément introuvable.',
  PERMISSION: "Vous n'avez pas la permission.",
  VALIDATION: 'Données invalides.',
  STOCK: 'Stock insuffisant.',
  UNKNOWN: 'Une erreur est survenue.',
};

// ============================================================================
// MESSAGES DE SUCCÈS STANDARDS
// ============================================================================
export const SUCCESS_MESSAGES = {
  VENTE_CREATED: 'Vente enregistrée avec succès !',
  VENTE_UPDATED: 'Vente mise à jour !',
  VENTE_DELETED: 'Vente supprimée !',
  PRODUCT_ADDED: 'Produit ajouté au panier !',
  PRODUCT_REMOVED: 'Produit retiré du panier !',
  LOGIN_SUCCESS: 'Connexion réussie !',
  LOGOUT_SUCCESS: 'Déconnexion réussie !',
  PRINT_SUCCESS: 'Ticket imprimé avec succès !',
};

// ============================================================================
// CONFIGURATION APP
// ============================================================================
export const APP_CONFIG = {
  NAME: 'SGPME',
  VERSION: '1.0.0',
  API_TIMEOUT: 30000, // 30 secondes
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 300000, // 5 minutes
  SESSION_TIMEOUT: 3600000, // 1 heure
};

// ============================================================================
// REGEX VALIDATION
// ============================================================================
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_HT: /^(\+509|00509|509)?[0-9]{8}$/,
  PHONE_SIMPLE: /^[0-9]{8}$/,
  CODE_PRODUIT: /^[A-Z0-9-]{3,20}$/,
  NUMERO_VENTE: /^V-[A-Z]+-[0-9]+-[0-9]{4}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
};

// ============================================================================
// STORAGE KEYS (AsyncStorage)
// ============================================================================
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@sgpme_auth_token',
  REFRESH_TOKEN: '@sgpme_refresh_token',
  USER_DATA: '@sgpme_user_data',
  ENTREPRISE_DATA: '@sgpme_entreprise_data',
  CART: '@sgpme_cart',
  PRINTER_CONFIG: '@sgpme_printer_config',
  SETTINGS: '@sgpme_settings',
  LAST_SYNC: '@sgpme_last_sync',
};

// ============================================================================
// API ENDPOINTS (à adapter selon votre backend)
// ============================================================================
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login/',
  LOGOUT: '/api/auth/logout/',
  REFRESH: '/api/auth/refresh/',
  REGISTER: '/api/auth/register/',
  ME: '/api/users/me/',
  CHANGE_PASSWORD: '/api/users/change_password/',
  
  // Inventory
  CATEGORIES: '/api/inventory/categories/',
  PRODUITS: '/api/inventory/produits/',
  CLIENTS: '/api/inventory/clients/',
  VENTES: '/api/inventory/ventes/',
  MOUVEMENTS: '/api/inventory/mouvements/',
  
  // Stats
  STATS: '/api/inventory/stats/',
  DASHBOARD: '/api/inventory/dashboard/',
};

// ============================================================================
// EXPORTS PAR DÉFAUT
// ============================================================================
export default {
  USER_ROLES,
  USER_ROLE_LABELS,
  MOBILE_APP_ROLES,
  MANAGER_ROLES,
  
  BUSINESS_MODULES,
  BUSINESS_MODULE_LABELS,
  BUSINESS_MODULE_ICONS,
  
  ENTREPRISE_STATUTS,
  ENTREPRISE_STATUT_LABELS,
  ENTREPRISE_STATUT_COLORS,
  
  PRODUCT_UNITS,
  PRODUCT_UNIT_LABELS,
  PRODUCT_UNIT_SHORT_LABELS,
  
  PAYMENT_MODES,
  PAYMENT_MODE_LABELS,
  PAYMENT_MODE_ICONS,
  MOBILE_PAYMENT_MODES,
  
  VENTE_STATUTS,
  VENTE_STATUT_LABELS,
  VENTE_STATUT_COLORS,
  
  MOUVEMENT_TYPES,
  MOUVEMENT_TYPE_LABELS,
  
  CURRENCY,
  LIMITS,
  DATE_FORMATS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  APP_CONFIG,
  REGEX,
  STORAGE_KEYS,
  API_ENDPOINTS,
};