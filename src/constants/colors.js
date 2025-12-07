/**
 * SGPME - Couleurs de l'application
 * 
 * Palette de couleurs basée sur le logo SGPME (noir/blanc)
 * avec accents subtils par module business
 */

// ============================================================================
// 🎨 COULEURS DE BASE (Noir/Blanc/Gris)
// ============================================================================

export const BASE_COLORS = {
  // Noir
  black: '#000000',
  
  // Blanc
  white: '#FFFFFF',
  
  // Gris (échelle de 50 à 900)
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
};

// ============================================================================
// 💊 COULEURS PHARMACIE (Bleu médical)
// ============================================================================

export const PHARMACY_COLORS = {
  // Primaire (Bleu médical)
  primary: '#007AFF',        // Bleu iOS standard
  primaryLight: '#E5F1FF',   // Très clair
  primaryDark: '#0051A8',    // Foncé
  
  // Accent
  accent: '#4A90E2',         // Bleu moyen
  accentLight: '#E8F4FF',
  accentDark: '#2E6DB8',
};

// ============================================================================
// 🍽️ COULEURS RESTAURANT (Vert)
// ============================================================================

export const RESTAURANT_COLORS = {
  // Primaire (Vert)
  primary: '#34C759',        // Vert iOS
  primaryLight: '#E8F5E9',   // Très clair
  primaryDark: '#2BA048',    // Foncé
  
  // Accent (Orange - secondaire)
  accent: '#FF9500',         // Orange iOS
  accentLight: '#FFF4E5',
  accentDark: '#CC7700',
};

// ============================================================================
// 📦 COULEURS DÉPÔT (Gris sobre)
// ============================================================================

export const DEPOT_COLORS = {
  // Primaire (Gris foncé)
  primary: '#404040',        // Gris 700
  primaryLight: '#E5E5E5',   // Gris 200
  primaryDark: '#262626',    // Gris 800
  
  // Accent
  accent: '#737373',         // Gris 500
  accentLight: '#F5F5F5',
  accentDark: '#525252',
};

// ============================================================================
// 👕 COULEURS SHOP (Noir moderne)
// ============================================================================

export const SHOP_COLORS = {
  // Primaire (Noir)
  primary: '#000000',        // Noir pur
  primaryLight: '#F5F5F5',   // Gris très clair
  primaryDark: '#000000',    // Noir (identique)
  
  // Accent (Gris foncé)
  accent: '#404040',         // Gris 700
  accentLight: '#E5E5E5',
  accentDark: '#262626',
};

// ============================================================================
// 🚦 COULEURS DE STATUT (Standards)
// ============================================================================

export const STATUS_COLORS = {
  // Succès (Vert)
  success: '#10B981',        // Green 500
  successLight: '#D1FAE5',   // Green 100
  successDark: '#047857',    // Green 700
  
  // Avertissement (Orange/Jaune)
  warning: '#F59E0B',        // Amber 500
  warningLight: '#FEF3C7',   // Amber 100
  warningDark: '#D97706',    // Amber 600
  
  // Erreur (Rouge)
  error: '#EF4444',          // Red 500
  errorLight: '#FEE2E2',     // Red 100
  errorDark: '#DC2626',      // Red 600
  
  // Info (Bleu)
  info: '#3B82F6',           // Blue 500
  infoLight: '#DBEAFE',      // Blue 100
  infoDark: '#2563EB',       // Blue 600
};

// ============================================================================
// 🎯 COULEURS UI (Interface)
// ============================================================================

export const UI_COLORS = {
  // Backgrounds
  background: BASE_COLORS.white,
  backgroundSecondary: BASE_COLORS.gray50,
  backgroundTertiary: BASE_COLORS.gray100,
  
  // Surfaces
  surface: BASE_COLORS.white,
  surfaceHover: BASE_COLORS.gray50,
  surfaceActive: BASE_COLORS.gray100,
  
  // Texte
  text: BASE_COLORS.black,
  textSecondary: BASE_COLORS.gray600,
  textTertiary: BASE_COLORS.gray500,
  textLight: BASE_COLORS.gray400,
  textDisabled: BASE_COLORS.gray300,
  textInverse: BASE_COLORS.white,
  
  // Bordures
  border: BASE_COLORS.gray300,
  borderLight: BASE_COLORS.gray200,
  borderDark: BASE_COLORS.gray400,
  
  // Dividers
  divider: BASE_COLORS.gray200,
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// ============================================================================
// 📊 COULEURS GRAPHIQUES (Charts)
// ============================================================================

export const CHART_COLORS = {
  primary: '#007AFF',
  secondary: '#34C759',
  tertiary: '#FF9500',
  quaternary: '#AF52DE',
  quinary: '#FF2D55',
  
  // Palette complète pour graphiques
  palette: [
    '#007AFF', // Bleu
    '#34C759', // Vert
    '#FF9500', // Orange
    '#AF52DE', // Violet
    '#FF2D55', // Rose
    '#5AC8FA', // Cyan
    '#FFCC00', // Jaune
    '#FF3B30', // Rouge
  ],
};

// ============================================================================
// 🎨 COULEURS SOCIALES (Optionnel - v2)
// ============================================================================

export const SOCIAL_COLORS = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  twitter: '#1DA1F2',
  whatsapp: '#25D366',
  youtube: '#FF0000',
};

// ============================================================================
// 🔢 OPACITÉS STANDARDS
// ============================================================================

export const OPACITY = {
  transparent: 0,
  translucent: 0.1,
  light: 0.2,
  medium: 0.5,
  heavy: 0.8,
  opaque: 1,
};

// ============================================================================
// 🎨 HELPERS COULEURS
// ============================================================================

/**
 * Ajoute une opacité à une couleur hex
 * @param {string} hex - Couleur hex (#RRGGBB)
 * @param {number} opacity - Opacité (0-1)
 * @returns {string} Couleur rgba
 */
export const addOpacity = (hex, opacity) => {
  if (!hex) return 'transparent';
  
  // Enlever le #
  const cleanHex = hex.replace('#', '');
  
  // Convertir en RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Éclaircit une couleur
 * @param {string} hex
 * @param {number} percent - Pourcentage (0-100)
 * @returns {string}
 */
export const lighten = (hex, percent) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

/**
 * Assombrit une couleur
 * @param {string} hex
 * @param {number} percent - Pourcentage (0-100)
 * @returns {string}
 */
export const darken = (hex, percent) => {
  return lighten(hex, -percent);
};

// ============================================================================
// 📦 EXPORT PAR DÉFAUT
// ============================================================================

export default {
  BASE_COLORS,
  PHARMACY_COLORS,
  RESTAURANT_COLORS,
  DEPOT_COLORS,
  SHOP_COLORS,
  STATUS_COLORS,
  UI_COLORS,
  CHART_COLORS,
  SOCIAL_COLORS,
  OPACITY,
  addOpacity,
  lighten,
  darken,
};