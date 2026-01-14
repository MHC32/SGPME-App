/**
 * DEPOT THEME
 * 
 * Configuration du thème pour le module Depot
 * Couleur principale: Gris #404040
 */

export const depotTheme = {
  // Couleurs principales
  colors: {  // ⬅️ IMPORTANT: wrapper dans "colors"
    primary: '#404040',
    primaryDark: '#2a2a2a',
    primaryLight: '#737373',
    accent: '#737373',

    // Couleurs de fond
    background: '#f5f5f5',
    card: '#FFFFFF',  // ⬅️ Changer "cardBg" à "card"
    surface: '#FAFAFA',

    // Couleurs de texte
    text: '#404040',        // ⬅️ "text" au lieu de "textPrimary"
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',

    // Couleurs de bordure
    border: '#e0e0e0',
    borderLight: '#f0f0f0',
    borderDark: '#cccccc',

    // Couleurs d'état
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#f44336',
    info: '#2196F3',

    // Couleurs spécifiques Stock
    stockOk: '#4CAF50',
    stockLow: '#FF9800',
    stockOut: '#f44336',
  },

  // Espacement
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24
  },

  // Rayons de bordure (utilisez md, sm, lg au lieu de small, medium, large)
  borderRadius: {
    sm: 8,
    md: 12,    // ⬅️ Utiliser "md" au lieu de "medium"
    lg: 16,
    full: 9999
  },

  // Ombres
  shadows: {  // ⬅️ "shadows" au pluriel
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5
    }
  },

  // Typographie
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28
  },

  fontWeight: {
    regular: '400',
    medium: '600',
    bold: '700',
    heavy: '800'
  },

  // Icon & emoji
  icon: '🏪',
  iconSize: {
    small: 20,
    medium: 28,
    large: 40
  }
};

export default depotTheme;