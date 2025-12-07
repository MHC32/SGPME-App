/**
 * SGPME - Fonctions utilitaires
 * 
 * Ce fichier contient toutes les fonctions helper utilisées dans l'application
 * pour le formatage, les calculs, les conversions, etc.
 */

import {
  CURRENCY,
  DATE_FORMATS,
  PRODUCT_UNIT_LABELS,
  PRODUCT_UNIT_SHORT_LABELS,
  BUSINESS_MODULE_LABELS,
  PAYMENT_MODE_LABELS,
  VENTE_STATUT_LABELS,
  USER_ROLE_LABELS,
  ENTREPRISE_STATUT_LABELS,
} from './constants';

// ============================================================================
// FORMATAGE MONÉTAIRE
// ============================================================================

/**
 * Formate un montant en HTG
 * @param {number} amount - Montant à formater
 * @param {boolean} showSymbol - Afficher le symbole HTG
 * @returns {string} Montant formaté
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return showSymbol ? '0.00 HTG' : '0.00';
  }

  const formatted = parseFloat(amount).toFixed(CURRENCY.DECIMAL_PLACES);
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return showSymbol ? `${parts.join('.')} HTG` : parts.join('.');
};

/**
 * Parse un montant HTG en number
 * @param {string} currencyString - String à parser
 * @returns {number} Montant en number
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString === 'number') return currencyString;
  if (!currencyString) return 0;
  
  const cleaned = currencyString.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Calcule le total d'une liste d'articles
 * @param {Array} items - Liste d'articles avec propriété 'total'
 * @returns {number} Total
 */
export const calculateTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + (item.total || 0), 0);
};

/**
 * Calcule le total d'une ligne de vente
 * @param {number} quantite
 * @param {number} prix_unitaire
 * @param {number} remise - Remise en pourcentage (0-100)
 * @returns {number} Total
 */
export const calculateLigneTotal = (quantite, prix_unitaire, remise = 0) => {
  const subtotal = quantite * prix_unitaire;
  const discount = (subtotal * remise) / 100;
  return subtotal - discount;
};

/**
 * Calcule la marge bénéficiaire
 * @param {number} prix_vente
 * @param {number} prix_achat
 * @returns {number} Marge en pourcentage
 */
export const calculateMargin = (prix_vente, prix_achat) => {
  if (!prix_achat || prix_achat === 0) return 0;
  return ((prix_vente - prix_achat) / prix_achat) * 100;
};

/**
 * Calcule la monnaie à rendre
 * @param {number} total
 * @param {number} montantRecu
 * @returns {number} Monnaie
 */
export const calculateChange = (total, montantRecu) => {
  const change = montantRecu - total;
  return change >= 0 ? change : 0;
};

// ============================================================================
// FORMATAGE DATE/HEURE
// ============================================================================

/**
 * Formate une date
 * @param {string|Date} date
 * @param {string} format - Format de sortie
 * @returns {string} Date formatée
 */
export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const pad = (num) => String(num).padStart(2, '0');
  
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Formate une date relative (il y a X minutes/heures/jours)
 * @param {string|Date} date
 * @returns {string} Date relative
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - d;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return formatDate(date, DATE_FORMATS.DISPLAY);
};

/**
 * Obtient la date du jour au format API
 * @returns {string} Date du jour
 */
export const getTodayDate = () => {
  return formatDate(new Date(), DATE_FORMATS.API);
};

/**
 * Vérifie si une date est aujourd'hui
 * @param {string|Date} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  if (!date) return false;
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Vérifie si une date est dans une plage
 * @param {string|Date} date
 * @param {string|Date} startDate
 * @param {string|Date} endDate
 * @returns {boolean}
 */
export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return d >= start && d <= end;
};

// ============================================================================
// FORMATAGE TEXTE
// ============================================================================

/**
 * Capitalise la première lettre
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalise chaque mot
 * @param {string} str
 * @returns {string}
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Tronque un texte
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength) + '...';
};

/**
 * Génère des initiales depuis un nom
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// ============================================================================
// FORMATAGE LABELS
// ============================================================================

/**
 * Obtient le label d'une unité de produit
 * @param {string} unite
 * @param {boolean} short - Version courte
 * @returns {string}
 */
export const getUnitLabel = (unite, short = false) => {
  const labels = short ? PRODUCT_UNIT_SHORT_LABELS : PRODUCT_UNIT_LABELS;
  return labels[unite] || unite;
};

/**
 * Obtient le label d'un module business
 * @param {string} module
 * @returns {string}
 */
export const getModuleLabel = (module) => {
  return BUSINESS_MODULE_LABELS[module] || module;
};

/**
 * Obtient le label d'un mode de paiement
 * @param {string} mode
 * @returns {string}
 */
export const getPaymentModeLabel = (mode) => {
  return PAYMENT_MODE_LABELS[mode] || mode;
};

/**
 * Obtient le label d'un statut de vente
 * @param {string} statut
 * @returns {string}
 */
export const getVenteStatutLabel = (statut) => {
  return VENTE_STATUT_LABELS[statut] || statut;
};

/**
 * Obtient le label d'un rôle utilisateur
 * @param {string} role
 * @returns {string}
 */
export const getRoleLabel = (role) => {
  return USER_ROLE_LABELS[role] || role;
};

/**
 * Obtient le label d'un statut d'entreprise
 * @param {string} statut
 * @returns {string}
 */
export const getEntrepriseStatutLabel = (statut) => {
  return ENTREPRISE_STATUT_LABELS[statut] || statut;
};

// ============================================================================
// GÉNÉRATION DE DONNÉES
// ============================================================================

/**
 * Génère un ID unique
 * @param {string} prefix - Préfixe optionnel
 * @returns {string}
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
};

/**
 * Génère un numéro de vente
 * @param {string} entrepriseId
 * @param {number} counter
 * @returns {string} Format: V-PHARM001-0001
 */
export const generateNumeroVente = (entrepriseId, counter) => {
  const paddedCounter = String(counter).padStart(4, '0');
  return `V-${entrepriseId}-${paddedCounter}`;
};

/**
 * Génère un code produit
 * @param {string} prefix
 * @param {number} counter
 * @returns {string}
 */
export const generateCodeProduit = (prefix, counter) => {
  const paddedCounter = String(counter).padStart(5, '0');
  return `${prefix}-${paddedCounter}`;
};

// ============================================================================
// MANIPULATION DE TABLEAUX
// ============================================================================

/**
 * Groupe un tableau par une clé
 * @param {Array} array
 * @param {string} key
 * @returns {Object}
 */
export const groupBy = (array, key) => {
  if (!Array.isArray(array)) return {};
  
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Trie un tableau par une clé
 * @param {Array} array
 * @param {string} key
 * @param {string} order - 'asc' ou 'desc'
 * @returns {Array}
 */
export const sortBy = (array, key, order = 'asc') => {
  if (!Array.isArray(array)) return [];
  
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filtre un tableau par recherche texte
 * @param {Array} array
 * @param {string} searchText
 * @param {Array} searchKeys - Clés à rechercher
 * @returns {Array}
 */
export const filterBySearch = (array, searchText, searchKeys) => {
  if (!Array.isArray(array) || !searchText) return array;
  
  const lowerSearch = searchText.toLowerCase();
  
  return array.filter(item => {
    return searchKeys.some(key => {
      const value = item[key];
      if (!value) return false;
      return String(value).toLowerCase().includes(lowerSearch);
    });
  });
};

// ============================================================================
// VALIDATION SIMPLE
// ============================================================================

/**
 * Vérifie si une valeur est vide
 * @param {any} value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Vérifie si un nombre est valide
 * @param {any} value
 * @returns {boolean}
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Vérifie si un montant est positif
 * @param {number} amount
 * @returns {boolean}
 */
export const isPositiveAmount = (amount) => {
  return isValidNumber(amount) && parseFloat(amount) > 0;
};

// ============================================================================
// UTILITAIRES STOCK
// ============================================================================

/**
 * Vérifie si un produit est en rupture
 * @param {Object} produit
 * @returns {boolean}
 */
export const isOutOfStock = (produit) => {
  return produit.stock_actuel <= 0;
};

/**
 * Vérifie si un produit est en stock faible
 * @param {Object} produit
 * @returns {boolean}
 */
export const isLowStock = (produit) => {
  return (
    produit.stock_actuel > 0 &&
    produit.stock_actuel <= produit.stock_minimum
  );
};

/**
 * Obtient le statut du stock
 * @param {Object} produit
 * @returns {Object} {status: 'ok'|'low'|'out', label: string, color: string}
 */
export const getStockStatus = (produit) => {
  if (isOutOfStock(produit)) {
    return {
      status: 'out',
      label: 'Rupture',
      color: '#EF4444',
    };
  }
  
  if (isLowStock(produit)) {
    return {
      status: 'low',
      label: 'Stock faible',
      color: '#F59E0B',
    };
  }
  
  return {
    status: 'ok',
    label: 'En stock',
    color: '#10B981',
  };
};

// ============================================================================
// UTILITAIRES PANIER
// ============================================================================

/**
 * Trouve un article dans le panier
 * @param {Array} cart
 * @param {string} productId
 * @returns {Object|null}
 */
export const findCartItem = (cart, productId) => {
  if (!Array.isArray(cart)) return null;
  return cart.find(item => item.produit === productId) || null;
};

/**
 * Calcule le nombre total d'articles dans le panier
 * @param {Array} cart
 * @returns {number}
 */
export const getCartItemsCount = (cart) => {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((total, item) => total + item.quantite, 0);
};

/**
 * Calcule le sous-total du panier
 * @param {Array} cart
 * @returns {number}
 */
export const getCartSubtotal = (cart) => {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((total, item) => {
    const itemTotal = item.quantite * item.prix_unitaire;
    const discount = (itemTotal * (item.remise || 0)) / 100;
    return total + (itemTotal - discount);
  }, 0);
};

// ============================================================================
// UTILITAIRES DIVERS
// ============================================================================

/**
 * Attend X millisecondes (pour simulations)
 * @param {number} ms
 * @returns {Promise}
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Deep clone un objet
 * @param {Object} obj
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Génère une couleur aléatoire
 * @returns {string} Couleur hex
 */
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * Log de debug (seulement en dev)
 * @param {string} tag
 * @param {any} data
 */
export const debugLog = (tag, data) => {
  if (__DEV__) {
    console.log(`[${tag}]`, data);
  }
};

// ============================================================================
// EXPORTS
// ============================================================================
export default {
  // Monétaire
  formatCurrency,
  parseCurrency,
  calculateTotal,
  calculateLigneTotal,
  calculateMargin,
  calculateChange,
  
  // Date
  formatDate,
  formatRelativeDate,
  getTodayDate,
  isToday,
  isDateInRange,
  
  // Texte
  capitalize,
  capitalizeWords,
  truncate,
  getInitials,
  
  // Labels
  getUnitLabel,
  getModuleLabel,
  getPaymentModeLabel,
  getVenteStatutLabel,
  getRoleLabel,
  getEntrepriseStatutLabel,
  
  // Génération
  generateId,
  generateNumeroVente,
  generateCodeProduit,
  
  // Tableaux
  groupBy,
  sortBy,
  filterBySearch,
  
  // Validation
  isEmpty,
  isValidNumber,
  isPositiveAmount,
  
  // Stock
  isOutOfStock,
  isLowStock,
  getStockStatus,
  
  // Panier
  findCartItem,
  getCartItemsCount,
  getCartSubtotal,
  
  // Divers
  sleep,
  deepClone,
  randomColor,
  debugLog,
};