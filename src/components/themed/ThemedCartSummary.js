/**
 * SGPME - ThemedCartSummary
 * 
 * Résumé du panier pour VENDEUR POS
 * Affichage sous-total, remises, et TOTAL en GROS
 * 
 * Features:
 * - Sous-total
 * - Remise globale (optionnel)
 * - TOTAL en gros (HTG)
 * - Nombre d'articles
 * - Style adapté au module
 * - Bouton action (ex: Passer au paiement)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';

/**
 * ThemedCartSummary Component
 * 
 * @param {Object} props
 * @param {number} props.subtotal - Sous-total HTG
 * @param {number} props.discount - Remise HTG (optionnel)
 * @param {number} props.total - Total HTG
 * @param {number} props.itemsCount - Nombre d'articles
 * @param {string} props.actionLabel - Label bouton action
 * @param {Function} props.onAction - Callback bouton action
 * @param {boolean} props.actionDisabled - Désactiver bouton
 * @param {boolean} props.showDetails - Afficher détails (sous-total, remise)
 * @param {Object} props.style - Style custom
 */
const ThemedCartSummary = ({
  subtotal = 0,
  discount = 0,
  total = 0,
  itemsCount = 0,
  actionLabel = 'Passer au paiement',
  onAction,
  actionDisabled = false,
  showDetails = true,
  style,
}) => {
  const theme = useTheme();

  const hasDiscount = discount > 0;

  return (
    <View style={[styles.container, style]}>
      {/* Détails */}
      {showDetails && (
        <View style={styles.details}>
          {/* Nombre d'articles */}
          <View style={styles.row}>
            <Text style={styles.label}>Articles</Text>
            <Text style={styles.value}>{itemsCount}</Text>
          </View>

          {/* Sous-total */}
          <View style={styles.row}>
            <Text style={styles.label}>Sous-total</Text>
            <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
          </View>

          {/* Remise */}
          {hasDiscount && (
            <View style={styles.row}>
              <Text style={[styles.label, styles.discountLabel]}>Remise</Text>
              <Text style={[styles.value, styles.discountValue]}>
                - {formatCurrency(discount)}
              </Text>
            </View>
          )}

          {/* Divider */}
          <View style={styles.divider} />
        </View>
      )}

      {/* Total (GROS) */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={[styles.total, { color: theme.colors.primary }]}>
          {formatCurrency(total)}
        </Text>
      </View>

      {/* Bouton Action */}
      {onAction && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: actionDisabled 
                ? UI_COLORS.borderLight 
                : theme.colors.primary,
            },
          ]}
          onPress={onAction}
          disabled={actionDisabled}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.actionButtonText,
              {
                color: actionDisabled ? UI_COLORS.textLight : '#FFFFFF',
              },
            ]}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI_COLORS.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: UI_COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  // Détails
  details: {
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  label: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.textSecondary,
  },

  value: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: UI_COLORS.text,
  },

  discountLabel: {
    color: '#10B981', // Vert
  },

  discountValue: {
    color: '#10B981', // Vert
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: UI_COLORS.borderLight,
    marginVertical: 8,
  },

  // Total (GROS)
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: UI_COLORS.text,
  },

  total: {
    fontSize: FONT_SIZES['4xl'], // TRÈS GROS
    fontWeight: '700',
  },

  // Bouton action
  actionButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  actionButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
});

export default ThemedCartSummary;