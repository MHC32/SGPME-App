/**
 * SGPME - ThemedStatCard
 * 
 * Carte de statistique pour VENDEUR POS
 * Affichage : icône, label, valeur, évolution (optionnel)
 * 
 * Features:
 * - Icône adaptée
 * - Label descriptif
 * - Valeur GROSSE (HTG ou nombre)
 * - Évolution % (optionnel)
 * - Variante : small, medium, large
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';

/**
 * ThemedStatCard Component
 * 
 * @param {Object} props
 * @param {string} props.icon - Emoji icône
 * @param {string} props.label - Label statistique
 * @param {number|string} props.value - Valeur à afficher
 * @param {string} props.type - 'currency' | 'number' | 'text'
 * @param {number} props.evolution - Évolution % (ex: +15.5 ou -5.2)
 * @param {string} props.variant - 'small' | 'medium' | 'large'
 * @param {string} props.color - Couleur custom (sinon theme.colors.primary)
 * @param {Object} props.style - Style custom
 */
const ThemedStatCard = ({
  icon = '📊',
  label,
  value,
  type = 'currency',
  evolution,
  variant = 'medium',
  color,
  style,
}) => {
  const theme = useTheme();

  // Formatage valeur selon type
  const formatValue = () => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'number':
        return typeof value === 'number' ? value.toLocaleString('fr-HT') : value;
      default:
        return value;
    }
  };

  const displayValue = formatValue();
  const displayColor = color || theme.colors.primary;

  // Styles selon variante
  const variantStyles = {
    small: {
      padding: 12,
      iconSize: 24,
      valueSize: FONT_SIZES.xl,
      labelSize: FONT_SIZES.xs,
    },
    medium: {
      padding: 16,
      iconSize: 32,
      valueSize: FONT_SIZES['3xl'],
      labelSize: FONT_SIZES.sm,
    },
    large: {
      padding: 20,
      iconSize: 40,
      valueSize: FONT_SIZES['4xl'],
      labelSize: FONT_SIZES.md,
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.medium;

  // Évolution (positif/négatif)
  const hasEvolution = evolution !== undefined && evolution !== null;
  const isPositive = evolution > 0;
  const evolutionColor = isPositive ? '#10B981' : '#EF4444';
  const evolutionIcon = isPositive ? '↑' : '↓';

  return (
    <View
      style={[
        styles.container,
        {
          padding: currentVariant.padding,
          borderColor: displayColor + '30',
        },
        style,
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: currentVariant.iconSize }}>{icon}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Label */}
        <Text
          style={[
            styles.label,
            { fontSize: currentVariant.labelSize },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>

        {/* Value */}
        <Text
          style={[
            styles.value,
            {
              fontSize: currentVariant.valueSize,
              color: displayColor,
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {displayValue}
        </Text>

        {/* Évolution */}
        {hasEvolution && (
          <View style={styles.evolutionContainer}>
            <View
              style={[
                styles.evolutionBadge,
                { backgroundColor: evolutionColor + '20' },
              ]}
            >
              <Text style={[styles.evolutionText, { color: evolutionColor }]}>
                {evolutionIcon} {Math.abs(evolution).toFixed(1)}%
              </Text>
            </View>
            <Text style={styles.evolutionLabel}>vs hier</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI_COLORS.surface,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  iconContainer: {
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  label: {
    color: UI_COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },

  value: {
    fontWeight: '700',
    marginBottom: 4,
  },

  // Évolution
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  evolutionBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
  evolutionText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  evolutionLabel: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
  },
});

export default ThemedStatCard;