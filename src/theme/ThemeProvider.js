/**
 * SGPME - Theme Provider
 * 
 * Context Provider pour le thème dynamique
 * Lit le module_actif depuis Redux et fournit le thème correspondant
 * 
 * Usage:
 * 1. Wrapper l'app dans <ThemeProvider>
 * 2. Utiliser useTheme() dans les composants
 */

import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getThemeByModule } from './themes';
import { BUSINESS_MODULES } from '../utils/constants';

// ============================================================================
// 🎨 CONTEXT
// ============================================================================

const ThemeContext = createContext(null);

// ============================================================================
// 🔧 PROVIDER
// ============================================================================

/**
 * ThemeProvider Component
 * 
 * Fournit le thème dynamique à toute l'application
 * Le thème change automatiquement selon le module_actif de l'entreprise
 * 
 * @param {object} props
 * @param {ReactNode} props.children - Composants enfants
 * @param {string} props.fallbackModule - Module par défaut si non connecté (optionnel)
 */
export const ThemeProvider = ({ children, fallbackModule = BUSINESS_MODULES.SHOP }) => {
  // Récupère le module_actif depuis Redux
  // Le vendeur se connecte → authSlice stocke user.entreprise.module_actif
  const moduleActif = useSelector((state) => {
    // Si user connecté
    if (state.auth?.user?.entreprise?.module_actif) {
      return state.auth.user.entreprise.module_actif;
    }
    
    // Sinon, fallback
    return fallbackModule;
  });

  // Sélectionne le thème correspondant au module
  const theme = useMemo(() => {
    const selectedTheme = getThemeByModule(moduleActif);
    
    if (__DEV__) {
      console.log('[ThemeProvider] Module actif:', moduleActif);
      console.log('[ThemeProvider] Thème chargé:', selectedTheme.name);
    }
    
    return selectedTheme;
  }, [moduleActif]);

  // Log les changements de thème (debug)
  useEffect(() => {
    if (__DEV__) {
      console.log('[ThemeProvider] Thème changé:', theme.name);
      console.log('[ThemeProvider] Couleur primaire:', theme.colors.primary);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// 🪝 HOOK
// ============================================================================

/**
 * Hook useTheme
 * 
 * Accède au thème courant dans n'importe quel composant
 * 
 * @returns {object} Thème complet (colors, icons, labels, layout, etc.)
 * 
 * @example
 * function MyComponent() {
 *   const theme = useTheme();
 *   
 *   return (
 *     <View style={{ backgroundColor: theme.colors.primary }}>
 *       <Text style={{ color: theme.colors.textInverse }}>
 *         {theme.labels.product}
 *       </Text>
 *     </View>
 *   );
 * }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your app with <ThemeProvider>...</ThemeProvider>'
    );
  }
  
  return context;
};

// ============================================================================
// 🎨 HOOKS SPÉCIALISÉS (Shortcuts)
// ============================================================================

/**
 * Hook useThemeColors
 * Accès direct aux couleurs du thème
 * 
 * @returns {object} Couleurs du thème
 * 
 * @example
 * const colors = useThemeColors();
 * <View style={{ backgroundColor: colors.primary }} />
 */
export const useThemeColors = () => {
  const theme = useTheme();
  return theme.colors;
};

/**
 * Hook useThemeIcons
 * Accès direct aux icônes du thème
 * 
 * @returns {object} Icônes du thème
 * 
 * @example
 * const icons = useThemeIcons();
 * <Icon name={icons.home} />
 */
export const useThemeIcons = () => {
  const theme = useTheme();
  return theme.icons;
};

/**
 * Hook useThemeLabels
 * Accès direct aux labels du thème
 * 
 * @returns {object} Labels du thème
 * 
 * @example
 * const labels = useThemeLabels();
 * <Text>{labels.addToCart}</Text>
 */
export const useThemeLabels = () => {
  const theme = useTheme();
  return theme.labels;
};

/**
 * Hook useThemeLayout
 * Accès direct à la configuration layout du thème
 * 
 * @returns {object} Configuration layout
 * 
 * @example
 * const layout = useThemeLayout();
 * if (layout.showStock) { ... }
 */
export const useThemeLayout = () => {
  const theme = useTheme();
  return theme.layout;
};

/**
 * Hook useThemeSpacing
 * Accès direct aux espacements du thème
 * 
 * @returns {object} Espacements
 * 
 * @example
 * const spacing = useThemeSpacing();
 * <View style={{ padding: spacing.md }} />
 */
export const useThemeSpacing = () => {
  const theme = useTheme();
  return theme.spacing;
};

// ============================================================================
// 🎯 HOC (Higher Order Component)
// ============================================================================

/**
 * HOC withTheme
 * Injecte le thème comme prop dans un composant
 * 
 * @param {Component} Component - Composant à wrapper
 * @returns {Component} Composant avec prop `theme`
 * 
 * @example
 * class MyComponent extends React.Component {
 *   render() {
 *     const { theme } = this.props;
 *     return <View style={{ backgroundColor: theme.colors.primary }} />;
 *   }
 * }
 * 
 * export default withTheme(MyComponent);
 */
export const withTheme = (Component) => {
  return (props) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

// ============================================================================
// 📦 EXPORTS
// ============================================================================

export default {
  ThemeProvider,
  useTheme,
  useThemeColors,
  useThemeIcons,
  useThemeLabels,
  useThemeLayout,
  useThemeSpacing,
  withTheme,
};