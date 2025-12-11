/**
 * SGPME - ThemedCard
 * 
 * Wrapper générique réutilisable pour VENDEUR POS
 * Conteneur avec styles cohérents
 * 
 * Features:
 * - Variantes : elevated, outlined, flat
 * - Padding configurable
 * - Bordures arrondies
 * - Shadow selon variante
 * - Pressable optionnel
 * - Style adapté au module
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS } from '../../constants';

/**
 * ThemedCard Component
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Contenu de la carte
 * @param {string} props.variant - 'elevated' | 'outlined' | 'flat'
 * @param {number|string} props.padding - Padding (number ou 'none'|'sm'|'md'|'lg')
 * @param {Function} props.onPress - Callback si pressable
 * @param {boolean} props.disabled - Désactiver press
 * @param {Object} props.style - Style custom
 */
const ThemedCard = ({
  children,
  variant = 'elevated',
  padding = 'md',
  onPress,
  disabled = false,
  style,
}) => {
  const theme = useTheme();

  // Padding selon valeur
  const getPadding = () => {
    if (typeof padding === 'number') return padding;
    
    const paddingMap = {
      none: 0,
      sm: 8,
      md: 16,
      lg: 24,
    };
    
    return paddingMap[padding] || 16;
  };

  // Styles selon variante
  const variantStyles = {
    elevated: {
      backgroundColor: UI_COLORS.surface,
      borderWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    outlined: {
      backgroundColor: UI_COLORS.surface,
      borderWidth: 1,
      borderColor: UI_COLORS.borderLight,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
    flat: {
      backgroundColor: UI_COLORS.backgroundSecondary,
      borderWidth: 0,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.elevated;

  // Rendu pressable ou simple View
  const CardWrapper = onPress && !disabled ? TouchableOpacity : View;

  const cardProps = onPress && !disabled
    ? {
        onPress,
        activeOpacity: 0.7,
      }
    : {};

  return (
    <CardWrapper
      style={[
        styles.card,
        currentVariant,
        {
          padding: getPadding(),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...cardProps}
    >
      {children}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default ThemedCard;