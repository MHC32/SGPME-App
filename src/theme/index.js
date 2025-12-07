/**
 * SGPME - Theme System
 * 
 * Export central du système de thème dynamique
 * 
 * Usage:
 * import { ThemeProvider, useTheme, ThemedButton } from '@/theme';
 */

// Provider & Hooks
export { ThemeProvider, useTheme, useThemeColors, useThemeIcons, useThemeLabels, useThemeLayout, useThemeSpacing, withTheme } from './ThemeProvider';



// Themes
export { PHARMACY_THEME, RESTAURANT_THEME, DEPOT_THEME, SHOP_THEME, THEMES, getThemeByModule, getThemeColors, getThemeIcons, getThemeLabels, getThemeLayout } from './themes';

// Composants thémés
export { ThemedButton } from './ThemedButton';
export { ThemedProductCard } from './ThemedProductCard';

// Export par défaut
// export default {
//   ThemeProvider,
//   useTheme,
//   useThemeColors,
//   useThemeIcons,
//   useThemeLabels,
//   useThemeLayout,
//   useThemeSpacing,
//   withTheme,
//   ThemedButton,
//   ThemedProductCard,
// };