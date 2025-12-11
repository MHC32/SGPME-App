/**
 * SGPME - ThemedPriceDisplay
 * 
 * Affichage prix formaté standalone pour VENDEUR POS
 * Support HTG avec formatage cohérent
 * 
 * Features:
 * - Formatage HTG automatique
 * - Prix barré (ancien prix)
 * - Remise % (optionnel)
 * - Tailles : small, medium, large, xlarge
 * - Variantes : primary, secondary, success, danger
 * - Affichage compact ou détaillé
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';

/**
 * ThemedPriceDisplay Component
 * 
 * @param {Object} props
 * @param {number} props.price - Prix actuel
 * @param {number} props.oldPrice - Ancien prix (barré)
 * @param {number} props.discount - Remise % (calculé auto si oldPrice fourni)
 * @param {string} props.size - 'small' | 'medium' | 'large' | 'xlarge'
 * @param {string} props.variant - 'primary' | 'secondary' | 'success' | 'danger'
 * @param {boolean} props.showCurrency - Afficher "HTG"
 * @param {string} props.align - 'left' | 'center' | 'right'
 * @param {Object} props.style - Style custom
 */
const ThemedPriceDisplay = ({
  price,
  oldPrice,
  discount,
  size = 'medium',
  variant = 'primary',
  showCurrency = true,
  align = 'left',
  style,
}) => {
  const theme = useTheme();

  // Couleurs selon variante
  const variantColors = {
    primary: theme.colors.primary,
    secondary: UI_COLORS.textSecondary,
    success: '#10B981',
    danger: '#EF4444',
  };

  const color = variantColors[variant] || variantColors.primary;

  // Tailles
  const sizeStyles = {
    small: {
      fontSize: FONT_SIZES.sm,
      oldPriceSize: FONT_SIZES.xs,
      discountSize: FONT_SIZES.xs,
    },
    medium: {
      fontSize: FONT_SIZES.lg,
      oldPriceSize: FONT_SIZES.sm,
      discountSize: FONT_SIZES.xs,
    },
    large: {
      fontSize: FONT_SIZES['2xl'],
      oldPriceSize: FONT_SIZES.md,
      discountSize: FONT_SIZES.sm,
    },
    xlarge: {
      fontSize: FONT_SIZES['4xl'],
      oldPriceSize: FONT_SIZES.lg,
      discountSize: FONT_SIZES.md,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  // Calcul remise si oldPrice fourni
  const calculatedDiscount = oldPrice && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : discount;

  const hasDiscount = calculatedDiscount > 0;

  // Alignement
  const alignmentStyle = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: alignmentStyle[align] || 'flex-start' },
        style,
      ]}
    >
      {/* Ancien prix (barré) */}
      {oldPrice && oldPrice > price && (
        <Text
          style={[
            styles.oldPrice,
            {
              fontSize: currentSize.oldPriceSize,
              textAlign: align,
            },
          ]}
        >
          {formatCurrency(oldPrice, showCurrency)}
        </Text>
      )}

      {/* Prix actuel + Remise */}
      <View style={styles.priceRow}>
        <Text
          style={[
            styles.price,
            {
              color: color,
              fontSize: currentSize.fontSize,
            },
          ]}
        >
          {formatCurrency(price, showCurrency)}
        </Text>

        {/* Badge remise */}
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text
              style={[
                styles.discountText,
                { fontSize: currentSize.discountSize },
              ]}
            >
              -{calculatedDiscount}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Wrapper
  },

  oldPrice: {
    color: UI_COLORS.textLight,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  price: {
    fontWeight: '700',
  },

  discountBadge: {
    backgroundColor: '#EF444420',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },

  discountText: {
    color: '#EF4444',
    fontWeight: '700',
  },
});

export default ThemedPriceDisplay;