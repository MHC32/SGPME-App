/**
 * SGPME - Typographie de l'application
 * 
 * Système de typographie cohérent basé sur SF Pro (iOS) / Roboto (Android)
 * Optimisé pour lisibilité sur interface POS (vendeur)
 */

// ============================================================================
// 📝 FAMILLES DE POLICES
// ============================================================================

export const FONT_FAMILIES = {
  // Système (défaut iOS/Android)
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
  
  // Monospace (pour codes, numéros)
  mono: 'monospace',
};

// ============================================================================
// 📏 TAILLES DE POLICE
// ============================================================================

export const FONT_SIZES = {
  // Très petit
  xs: 10,
  
  // Petit
  sm: 12,
  
  // Normal
  base: 14,
  
  // Moyen
  md: 16,
  
  // Grand
  lg: 18,
  
  // Très grand
  xl: 20,
  
  // Extra large
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 42,
};

// ============================================================================
// 🔤 POIDS DE POLICE
// ============================================================================

export const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// ============================================================================
// 📐 HAUTEURS DE LIGNE
// ============================================================================

export const LINE_HEIGHTS = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// ============================================================================
// 📄 STYLES DE TEXTE PRÉDÉFINIS
// ============================================================================

/**
 * Headers (Titres)
 */
export const HEADERS = {
  h1: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  h2: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  h3: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.snug,
  },
  h4: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.snug,
  },
  h5: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
  },
  h6: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
  },
};

/**
 * Body (Corps de texte)
 */
export const BODY = {
  // Grand (principal)
  large: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  
  // Normal (défaut)
  normal: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  
  // Petit
  small: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  
  // Très petit
  tiny: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
};

/**
 * Labels (Étiquettes)
 */
export const LABELS = {
  // Grand
  large: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.snug,
  },
  
  // Normal
  normal: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.snug,
  },
  
  // Petit
  small: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.snug,
  },
};

/**
 * Boutons
 */
export const BUTTONS = {
  // Grand
  large: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Normal
  normal: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Petit
  small: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.tight,
  },
};

/**
 * Prix (Optimisés POS - GROS et lisibles)
 */
export const PRICES = {
  // Très grand (Total panier)
  xlarge: {
    fontSize: FONT_SIZES['5xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Grand (Prix principal)
  large: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Moyen (Prix produit)
  medium: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Normal (Prix secondaire)
  normal: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Petit
  small: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
};

/**
 * Captions (Légendes)
 */
export const CAPTIONS = {
  // Normal
  normal: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  
  // Petit
  small: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
};

/**
 * Codes (Monospace)
 */
export const CODES = {
  normal: {
    fontSize: FONT_SIZES.base,
    fontFamily: FONT_FAMILIES.mono,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
  small: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONT_FAMILIES.mono,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
  },
};

// ============================================================================
// 🎯 STYLES SPÉCIALISÉS POS
// ============================================================================

/**
 * Styles optimisés pour interface VENDEUR
 */
export const POS_STYLES = {
  // Nom produit (dans card)
  productName: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.snug,
  },
  
  // Prix produit (dans card)
  productPrice: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Stock
  stockBadge: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Total panier (toujours visible)
  cartTotal: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Nombre d'articles
  itemCount: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Montants dans checkout
  checkoutAmount: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  
  // Numéro de vente
  saleNumber: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONT_FAMILIES.mono,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
  },
};

// ============================================================================
// 📱 RESPONSIVE (Optionnel)
// ============================================================================

/**
 * Facteur d'échelle pour petits écrans
 */
export const SCALE_FACTORS = {
  small: 0.9,   // < 360px width
  medium: 1,    // 360-600px
  large: 1.1,   // > 600px
};

// ============================================================================
// 🔧 HELPERS TYPOGRAPHIE
// ============================================================================

/**
 * Crée un style de texte complet
 * @param {number} fontSize
 * @param {string} fontWeight
 * @param {number} lineHeight
 * @returns {Object}
 */
export const createTextStyle = (fontSize, fontWeight, lineHeight = LINE_HEIGHTS.normal) => {
  return {
    fontSize,
    fontWeight,
    lineHeight: fontSize * lineHeight,
  };
};

/**
 * Applique un scale factor aux tailles
 * @param {Object} style
 * @param {number} factor
 * @returns {Object}
 */
export const scaleText = (style, factor) => {
  return {
    ...style,
    fontSize: style.fontSize * factor,
  };
};

// ============================================================================
// 📦 EXPORT PAR DÉFAUT
// ============================================================================

export default {
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  HEADERS,
  BODY,
  LABELS,
  BUTTONS,
  PRICES,
  CAPTIONS,
  CODES,
  POS_STYLES,
  SCALE_FACTORS,
  createTextStyle,
  scaleText,
};