/**
 * DEPOT CONSTANTS
 * 
 * Constantes business pour le module Depot
 */

/**
 * Configuration du module Depot
 */
export const DEPOT_CONFIG = {
  name: 'Depot',
  displayName: 'Vente en Gros',
  icon: '🏪',
  description: 'Cash & Carry - Conditionnements multiples',
  color: '#404040'
};

/**
 * Types de conditionnements
 */
export const CONDITIONNEMENT_TYPES = {
  UNITE: 'unite',
  CAISSE: 'caisse',
  CARTON: 'carton',
  SAC: 'sac',
  PALETTE: 'palette',
  BOUTEILLE: 'bouteille',
  BOITE: 'boite',
  PACK: 'pack'
};

/**
 * Labels des conditionnements
 */
export const CONDITIONNEMENT_LABELS = {
  [CONDITIONNEMENT_TYPES.UNITE]: 'Unité',
  [CONDITIONNEMENT_TYPES.CAISSE]: 'Caisse',
  [CONDITIONNEMENT_TYPES.CARTON]: 'Carton',
  [CONDITIONNEMENT_TYPES.SAC]: 'Sac',
  [CONDITIONNEMENT_TYPES.PALETTE]: 'Palette',
  [CONDITIONNEMENT_TYPES.BOUTEILLE]: 'Bouteille',
  [CONDITIONNEMENT_TYPES.BOITE]: 'Boîte',
  [CONDITIONNEMENT_TYPES.PACK]: 'Pack'
};

/**
 * Emojis des conditionnements
 */
export const CONDITIONNEMENT_EMOJIS = {
  [CONDITIONNEMENT_TYPES.UNITE]: '📦',
  [CONDITIONNEMENT_TYPES.CAISSE]: '📦',
  [CONDITIONNEMENT_TYPES.CARTON]: '📦',
  [CONDITIONNEMENT_TYPES.SAC]: '🛍️',
  [CONDITIONNEMENT_TYPES.PALETTE]: '🏗️',
  [CONDITIONNEMENT_TYPES.BOUTEILLE]: '🍾',
  [CONDITIONNEMENT_TYPES.BOITE]: '📦',
  [CONDITIONNEMENT_TYPES.PACK]: '📦'
};

/**
 * Modes de paiement
 */
export const PAYMENT_MODES = {
  ESPECES: 'especes',
  CARTE: 'carte',
  MOBILE: 'mobile'
};

/**
 * Labels des modes de paiement
 */
export const PAYMENT_MODE_LABELS = {
  [PAYMENT_MODES.ESPECES]: 'Espèces',
  [PAYMENT_MODES.CARTE]: 'Carte bancaire',
  [PAYMENT_MODES.MOBILE]: 'Paiement mobile'
};

/**
 * Emojis des modes de paiement
 */
export const PAYMENT_MODE_EMOJIS = {
  [PAYMENT_MODES.ESPECES]: '💵',
  [PAYMENT_MODES.CARTE]: '💳',
  [PAYMENT_MODES.MOBILE]: '📱'
};

/**
 * Niveaux de stock
 */
export const STOCK_LEVELS = {
  OUT: 'out',        // Stock = 0
  LOW: 'low',        // Stock <= minimum
  OK: 'ok'           // Stock > minimum
};

/**
 * Configuration des badges de stock
 */
export const STOCK_BADGES = {
  [STOCK_LEVELS.OUT]: {
    color: '#f44336',
    icon: '🔴',
    label: 'Rupture'
  },
  [STOCK_LEVELS.LOW]: {
    color: '#FF9800',
    icon: '🟠',
    label: 'Stock bas'
  },
  [STOCK_LEVELS.OK]: {
    color: '#4CAF50',
    icon: '🟢',
    label: 'En stock'
  }
};

/**
 * Seuils de stock
 */
export const STOCK_THRESHOLDS = {
  MINIMUM_DEFAULT: 10,  // Stock minimum par défaut
  CRITICAL: 5,          // Niveau critique
  REORDER: 20           // Niveau de réapprovisionnement
};

/**
 * Configuration des montants rapides
 */
export const QUICK_AMOUNTS_CONFIG = {
  ENABLED: true,
  ROUND_TO: [100, 500, 1000], // Arrondis possibles
  MAX_BUTTONS: 4               // Nombre max de boutons
};

/**
 * Configuration du clavier numérique
 */
export const NUMERIC_KEYPAD_CONFIG = {
  DECIMAL_SEPARATOR: '.',
  ALLOW_NEGATIVE: false,
  MAX_DECIMALS: 2,
  MAX_LENGTH: 10
};

/**
 * Messages de validation
 */
export const VALIDATION_MESSAGES = {
  EMPTY_CART: 'Le panier est vide',
  NO_AMOUNT: 'Veuillez entrer le montant reçu',
  INSUFFICIENT_AMOUNT: 'Le montant reçu est insuffisant',
  STOCK_INSUFFICIENT: 'Stock insuffisant',
  NO_CONDITIONNEMENT: 'Aucun conditionnement disponible',
  REMOVE_ITEM: 'Retirer cet article du panier ?',
  CLEAR_CART: 'Êtes-vous sûr de vouloir vider le panier ?',
  CANCEL_PAYMENT: 'Êtes-vous sûr de vouloir annuler le paiement ?'
};

/**
 * Messages de succès
 */
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Ajouté au panier',
  REMOVED_FROM_CART: 'Article retiré',
  CART_CLEARED: 'Panier vidé',
  SALE_CREATED: 'Vente enregistrée !',
  QUANTITY_UPDATED: 'Quantité mise à jour'
};

/**
 * Messages d'erreur
 */
export const ERROR_MESSAGES = {
  LOAD_PRODUCTS: 'Impossible de charger les produits',
  LOAD_CATEGORIES: 'Impossible de charger les catégories',
  LOAD_HISTORY: 'Impossible de charger l\'historique',
  CREATE_SALE: 'Impossible d\'enregistrer la vente',
  ADD_TO_CART: 'Impossible d\'ajouter au panier',
  UNKNOWN_MODULE: 'Module inconnu',
  NO_ACTIVE_MODULE: 'Aucun module actif'
};

/**
 * Configuration des filtres
 */
export const FILTER_CONFIG = {
  SHOW_ALL_LABEL: 'Tout',
  SHOW_IN_STOCK_ONLY: false,  // Par défaut, afficher tous les produits
  SHOW_ACTIVE_ONLY: true       // Par défaut, seulement produits actifs
};

/**
 * Configuration de la pagination
 */
export const PAGINATION_CONFIG = {
  PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
  SHOW_LOAD_MORE: true
};

/**
 * Configuration des toasts
 */
export const TOAST_CONFIG = {
  POSITION: 'bottom',
  VISIBILITY_TIME: 2000,
  AUTO_HIDE: true
};

/**
 * Unité monétaire
 */
export const CURRENCY = {
  CODE: 'HTG',
  SYMBOL: 'HTG',
  NAME: 'Gourde haïtienne',
  DECIMAL_PLACES: 2
};

/**
 * Configuration de l'impression (Future)
 */
export const PRINT_CONFIG = {
  ENABLED: false,
  AUTO_PRINT: false,
  SHOW_LOGO: true,
  SHOW_QR_CODE: false,
  PAPER_SIZE: '80mm'
};

export default {
  DEPOT_CONFIG,
  CONDITIONNEMENT_TYPES,
  CONDITIONNEMENT_LABELS,
  CONDITIONNEMENT_EMOJIS,
  PAYMENT_MODES,
  PAYMENT_MODE_LABELS,
  PAYMENT_MODE_EMOJIS,
  STOCK_LEVELS,
  STOCK_BADGES,
  STOCK_THRESHOLDS,
  QUICK_AMOUNTS_CONFIG,
  NUMERIC_KEYPAD_CONFIG,
  VALIDATION_MESSAGES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  FILTER_CONFIG,
  PAGINATION_CONFIG,
  TOAST_CONFIG,
  CURRENCY,
  PRINT_CONFIG
};