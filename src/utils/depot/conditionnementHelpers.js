/**
 * CONDITIONNEMENT HELPERS
 * 
 * Fonctions utilitaires pour gérer les conditionnements
 */

/**
 * Obtenir le label d'affichage d'un conditionnement
 * 
 * @param {string} type - Type de conditionnement (unite, caisse, sac)
 * @param {number} qte - Quantité dans le conditionnement
 * @returns {string} Label formaté (ex: "Caisse 24×", "Sac 50kg")
 */
export const getConditionnementLabel = (type, qte) => {
  const labels = {
    unite: 'Unité',
    caisse: `Caisse ${qte}×`,
    carton: `Carton ${qte}×`,
    sac: `Sac ${qte}kg`,
    palette: `Palette ${qte}×`,
    bouteille: qte === 1 ? 'Bouteille' : `Pack ${qte}×`,
    boite: qte === 1 ? 'Boîte' : `Lot ${qte}×`,
    pack: `Pack ${qte}×`
  };

  return labels[type] || `${type} ${qte}`;
};

/**
 * Obtenir le label d'unité pour l'affichage
 * 
 * @param {string} type - Type de conditionnement
 * @param {number} quantite - Quantité (pour singulier/pluriel)
 * @returns {string} Label d'unité (ex: "caisse", "caisses")
 */
export const getUnitLabel = (type, quantite = 2) => {
  const labels = {
    unite: quantite > 1 ? 'unités' : 'unité',
    caisse: quantite > 1 ? 'caisses' : 'caisse',
    carton: quantite > 1 ? 'cartons' : 'carton',
    sac: quantite > 1 ? 'sacs' : 'sac',
    palette: quantite > 1 ? 'palettes' : 'palette',
    bouteille: quantite > 1 ? 'bouteilles' : 'bouteille',
    boite: quantite > 1 ? 'boîtes' : 'boîte',
    pack: quantite > 1 ? 'packs' : 'pack'
  };

  return labels[type] || type;
};

/**
 * Obtenir l'emoji d'un conditionnement
 * 
 * @param {string} type - Type de conditionnement
 * @returns {string} Emoji
 */
export const getConditionnementEmoji = (type) => {
  const emojis = {
    unite: '📦',
    caisse: '📦',
    carton: '📦',
    sac: '🛍️',
    palette: '🏗️',
    bouteille: '🍾',
    boite: '📦',
    pack: '📦'
  };

  return emojis[type] || '📦';
};

/**
 * Transformer les prix_vente_options de l'API en conditionnements
 * 
 * @param {Array} options - prix_vente_options de l'API
 * @returns {Array} Conditionnements formatés
 */
export const transformPrixVenteOptions = (options = []) => {
  return options.map(option => ({
    type: option.type || 'unite',
    qte: option.qte || 1,
    prix: option.prix || 0, // ✅ Valeur par défaut
    stock: option.stock || 0,
    label: getConditionnementLabel(option.type || 'unite', option.qte || 1),
    emoji: getConditionnementEmoji(option.type || 'unite'),
    unitLabel: getUnitLabel(option.type || 'unite', 2) // Pluriel par défaut
  }));
};

/**
 * Calculer le stock total en unités à partir des conditionnements
 * 
 * @param {Array} options - prix_vente_options
 * @returns {number} Stock total en unités
 */
export const calculateTotalStock = (options = []) => {
  // Trouver l'option "unite" qui a le stock en unités
  const uniteOption = options.find(opt => opt.type === 'unite');
  return uniteOption?.stock || 0;
};

/**
 * Calculer le stock restant après ajout au panier
 * 
 * @param {number} stockInitial - Stock initial
 * @param {number} quantiteConditionnement - Quantité dans le conditionnement
 * @param {number} quantiteAjoutee - Quantité de conditionnements ajoutés
 * @returns {number} Stock restant
 */
export const calculateStockRestant = (stockInitial, quantiteConditionnement, quantiteAjoutee) => {
  const stockUtilise = quantiteConditionnement * quantiteAjoutee;
  return Math.max(0, stockInitial - stockUtilise);
};

/**
 * Vérifier si le stock est suffisant
 * 
 * @param {number} stockDisponible - Stock disponible
 * @param {number} quantiteConditionnement - Quantité dans conditionnement
 * @param {number} quantiteDemandee - Quantité demandée
 * @returns {boolean} true si stock suffisant
 */
export const isStockSuffisant = (stockDisponible, quantiteConditionnement, quantiteDemandee) => {
  const stockNecessaire = quantiteConditionnement * quantiteDemandee;
  return stockDisponible >= stockNecessaire;
};

/**
 * Formater le prix avec la devise
 * 
 * @param {number|string} prix - Prix
 * @param {string} devise - Devise (HTG par défaut)
 * @returns {string} Prix formaté
 */
export const formatPrice = (prix, devise = 'HTG') => {
  // ✅ FIX: Vérifier si prix est valide
  if (prix === undefined || prix === null || isNaN(Number(prix))) {
    return `0.00 ${devise}`;
  }
  
  const prixNum = Number(prix);
  return `${prixNum.toFixed(2)} ${devise}`;
};

/**
 * Formater le stock avec l'unité
 * 
 * @param {number} stock - Stock
 * @param {string} type - Type de conditionnement
 * @returns {string} Stock formaté (ex: "45 sacs")
 */
export const formatStock = (stock, type) => {
  const unitLabel = getUnitLabel(type, stock);
  return `${stock} ${unitLabel}`;
};

/**
 * Obtenir le badge de stock (couleur selon niveau)
 * 
 * @param {number} stockActuel - Stock actuel
 * @param {number} stockMinimum - Stock minimum
 * @returns {Object} { color, icon, label }
 */
export const getStockBadge = (stockActuel, stockMinimum = 10) => {
  if (stockActuel === 0) {
    return {
      color: '#f44336', // Rouge
      icon: '🔴',
      label: 'Rupture',
      status: 'out'
    };
  } else if (stockActuel <= stockMinimum) {
    return {
      color: '#FF9800', // Orange
      icon: '🟠',
      label: 'Stock bas',
      status: 'low'
    };
  } else {
    return {
      color: '#4CAF50', // Vert
      icon: '🟢',
      label: 'En stock',
      status: 'ok'
    };
  }
};

/**
 * Trier les conditionnements par prix croissant
 * 
 * @param {Array} options - Conditionnements
 * @returns {Array} Conditionnements triés
 */
export const sortConditionnementsByPrice = (options) => {
  return [...options].sort((a, b) => (a.prix || 0) - (b.prix || 0));
};

/**
 * Trier les conditionnements par quantité croissante
 * 
 * @param {Array} options - Conditionnements
 * @returns {Array} Conditionnements triés
 */
export const sortConditionnementsByQuantity = (options) => {
  return [...options].sort((a, b) => (a.qte || 0) - (b.qte || 0));
};

/**
 * Filtrer les conditionnements en stock
 * 
 * @param {Array} options - Conditionnements
 * @returns {Array} Conditionnements avec stock > 0
 */
export const filterInStockConditionnements = (options) => {
  return options.filter(opt => (opt.stock || 0) > 0);
};

/**
 * Générer un ID unique pour un item de panier
 * 
 * @param {number} productId - ID du produit
 * @param {string} conditionnementType - Type de conditionnement
 * @returns {string} ID unique
 */
export const generateCartItemId = (productId, conditionnementType) => {
  return `${productId}-${conditionnementType}-${Date.now()}`;
};

export default {
  getConditionnementLabel,
  getUnitLabel,
  getConditionnementEmoji,
  transformPrixVenteOptions,
  calculateTotalStock,
  calculateStockRestant,
  isStockSuffisant,
  formatPrice,
  formatStock,
  getStockBadge,
  sortConditionnementsByPrice,
  sortConditionnementsByQuantity,
  filterInStockConditionnements,
  generateCartItemId
};