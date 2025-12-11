/**
 * SGPME - ThemedStockBadge
 * 
 * Badge stock spécialisé pour VENDEUR POS
 * Warnings automatiques selon niveau de stock
 * 
 * Features:
 * - Couleur auto selon stock (vert/orange/rouge)
 * - Icônes warnings (⚠️)
 * - Seuils configurables
 * - Label customisable
 * - Format compact ou détaillé
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedStockBadge Component
 * 
 * Badge stock adapté au module actif
 * État "good" utilise la couleur du module
 * 
 * @param {Object} props
 * @param {number} props.stock - Quantité en stock
 * @param {number} props.lowThreshold - Seuil stock faible (défaut: 5)
 * @param {number} props.criticalThreshold - Seuil stock critique (défaut: 0)
 * @param {string} props.format - 'compact' | 'detailed'
 * @param {boolean} props.showIcon - Afficher icône warning
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {Object} props.style - Style custom
 */
const ThemedStockBadge = ({
  stock,
  lowThreshold = 5,
  criticalThreshold = 0,
  format = 'compact',
  showIcon = true,
  size = 'medium',
  style,
}) => {
  const theme = useTheme();

  // Déterminer niveau de stock
  const getStockLevel = () => {
    if (stock <= criticalThreshold) return 'critical'; // Rupture
    if (stock <= lowThreshold) return 'low'; // Stock faible
    return 'good'; // Stock OK
  };

  const stockLevel = getStockLevel();

  // Couleurs selon niveau (good utilise theme.colors.primary)
  const levelColors = {
    good: {
      bg: theme.colors.primary + '20', // 🎨 Adapté au module
      text: theme.colors.primary, // 🎨 Adapté au module
      border: theme.colors.primary, // 🎨 Adapté au module
    },
    low: {
      bg: '#F59E0B20',
      text: '#F59E0B',
      border: '#F59E0B',
    },
    critical: {
      bg: '#EF444420',
      text: '#EF4444',
      border: '#EF4444',
    },
  };

  const colors = levelColors[stockLevel];

  // Icônes selon niveau
  const levelIcons = {
    good: '✓',
    low: '⚠️',
    critical: '⚠️',
  };

  const icon = levelIcons[stockLevel];

  // Labels selon niveau
  const levelLabels = {
    good: 'En stock',
    low: 'Stock faible',
    critical: 'Rupture',
  };

  const label = levelLabels[stockLevel];

  // Tailles
  const sizeStyles = {
    small: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: FONT_SIZES.xs,
      iconSize: FONT_SIZES.xs,
      borderRadius: 6,
    },
    medium: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: FONT_SIZES.sm,
      iconSize: FONT_SIZES.sm,
      borderRadius: 8,
    },
    large: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      fontSize: FONT_SIZES.md,
      iconSize: FONT_SIZES.md,
      borderRadius: 10,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  // Format texte
  const getText = () => {
    if (format === 'detailed') {
      return `${label} (${stock})`;
    }
    return `${stock} restant${stock > 1 ? 's' : ''}`;
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingHorizontal: currentSize.paddingHorizontal,
          paddingVertical: currentSize.paddingVertical,
          borderRadius: currentSize.borderRadius,
        },
        style,
      ]}
    >
      {showIcon && stockLevel !== 'good' && (
        <Text
          style={[
            styles.icon,
            {
              fontSize: currentSize.iconSize,
              marginRight: 4,
            },
          ]}
        >
          {icon}
        </Text>
      )}

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
        {getText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    // Icône warning
  },
  text: {
    fontWeight: '600',
  },
});

export default ThemedStockBadge;