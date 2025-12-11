/**
 * SGPME - ThemedBadge
 * 
 * Badge générique pour VENDEUR POS
 * Affichage nombre, texte ou statut
 * 
 * Features:
 * - Type : number, text, dot
 * - Variantes : primary, success, warning, danger, info, neutral
 * - Tailles : small, medium, large
 * - Position : standalone ou badge sur icon
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedBadge Component
 * 
 * @param {Object} props
 * @param {string|number} props.value - Valeur à afficher
 * @param {string} props.type - 'number' | 'text' | 'dot'
 * @param {string} props.variant - 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {number} props.max - Max pour nombres (ex: 99+)
 * @param {boolean} props.showZero - Afficher si value === 0
 * @param {Object} props.style - Style custom
 */
const ThemedBadge = ({
  value,
  type = 'number',
  variant = 'primary',
  size = 'medium',
  max = 99,
  showZero = false,
  style,
}) => {
  const theme = useTheme();

  // Ne rien afficher si value vide (sauf showZero)
  if (value === undefined || value === null || (value === 0 && !showZero)) {
    return null;
  }

  // Couleurs selon variante
  const variantColors = {
    primary: {
      bg: theme.colors.primary,
      text: UI_COLORS.white,
    },
    success: {
      bg: '#10B981',
      text: UI_COLORS.white,
    },
    warning: {
      bg: '#F59E0B',
      text: UI_COLORS.white,
    },
    danger: {
      bg: '#EF4444',
      text: UI_COLORS.white,
    },
    info: {
      bg: '#3B82F6',
      text: UI_COLORS.white,
    },
    neutral: {
      bg: UI_COLORS.backgroundTertiary,
      text: UI_COLORS.text,
    },
  };

  const colors = variantColors[variant] || variantColors.primary;

  // Tailles
  const sizeStyles = {
    small: {
      minWidth: 16,
      height: 16,
      paddingHorizontal: 4,
      fontSize: FONT_SIZES.xs,
      borderRadius: 8,
    },
    medium: {
      minWidth: 20,
      height: 20,
      paddingHorizontal: 6,
      fontSize: FONT_SIZES.xs,
      borderRadius: 10,
    },
    large: {
      minWidth: 24,
      height: 24,
      paddingHorizontal: 8,
      fontSize: FONT_SIZES.sm,
      borderRadius: 12,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  // Formatage valeur
  const formatValue = () => {
    if (type === 'dot') return '';
    
    if (type === 'number') {
      const num = Number(value);
      if (isNaN(num)) return value;
      return num > max ? `${max}+` : String(num);
    }
    
    return String(value);
  };

  const displayValue = formatValue();

  // Style dot (petit point)
  if (type === 'dot') {
    return (
      <View
        style={[
          styles.dot,
          {
            backgroundColor: colors.bg,
            width: currentSize.height / 2,
            height: currentSize.height / 2,
            borderRadius: currentSize.height / 4,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          minWidth: currentSize.minWidth,
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
          borderRadius: currentSize.borderRadius,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: currentSize.fontSize,
          },
        ]}
        numberOfLines={1}
      >
        {displayValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
  dot: {
    // Petit point simple
  },
});

export default ThemedBadge;