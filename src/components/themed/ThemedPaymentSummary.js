/**
 * SGPME - ThemedPaymentSummary
 * 
 * Résumé paiement pour VENDEUR POS
 * Affichage total, montant reçu, et calcul automatique monnaie à rendre
 * 
 * Features:
 * - Total à payer (GROS)
 * - Montant reçu (input ou affiché)
 * - Calcul automatique monnaie à rendre
 * - Validation (montant >= total)
 * - Feedback visuel (insuffisant/ok)
 * - Style adapté au module
 * - Intégration ThemedNumericKeypad (optionnel)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { formatCurrency, calculateChange } from '../../utils/helpers';

/**
 * ThemedPaymentSummary Component
 * 
 * @param {Object} props
 * @param {number} props.total - Total à payer (HTG)
 * @param {number} props.amountReceived - Montant reçu (HTG)
 * @param {Function} props.onAmountChange - Callback (newAmount)
 * @param {boolean} props.editable - Montant éditable (défaut: true)
 * @param {boolean} props.showKeypad - Afficher suggestions montants rapides
 * @param {string} props.paymentMode - Mode de paiement ('especes', 'carte', etc.)
 * @param {Object} props.style - Style custom
 */
const ThemedPaymentSummary = ({
  total = 0,
  amountReceived = 0,
  onAmountChange,
  editable = true,
  showKeypad = true,
  paymentMode = 'especes',
  style,
}) => {
  const theme = useTheme();

  // État local montant si non contrôlé
  const [localAmount, setLocalAmount] = useState(amountReceived);

  // Sync avec prop
  useEffect(() => {
    setLocalAmount(amountReceived);
  }, [amountReceived]);

  const handleAmountChange = (newAmount) => {
    setLocalAmount(newAmount);
    onAmountChange?.(newAmount);
  };

  // Calculs
  const change = calculateChange(total, localAmount);
  const isValid = localAmount >= total;
  const isExact = localAmount === total;
  const isInsufficient = localAmount > 0 && localAmount < total;

  // Suggestions montants rapides (espèces uniquement)
  const getSuggestedAmounts = () => {
    if (paymentMode !== 'especes') return [];

    const roundUp = Math.ceil(total / 100) * 100; // Arrondi à 100 supérieur
    const suggestions = [
      total, // Montant exact
      roundUp,
      roundUp + 100,
      roundUp + 200,
    ];

    // Retirer doublons
    return [...new Set(suggestions)].slice(0, 4);
  };

  const suggestedAmounts = getSuggestedAmounts();

  return (
    <View style={[styles.container, style]}>
      {/* Total à payer */}
      <View style={styles.totalSection}>
        <Text style={styles.label}>Total à payer</Text>
        <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>
          {formatCurrency(total)}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Montant reçu */}
      <View style={styles.receivedSection}>
        <Text style={styles.label}>Montant reçu</Text>
        <Text
          style={[
            styles.receivedAmount,
            isInsufficient && styles.insufficientAmount,
            isValid && styles.validAmount,
          ]}
        >
          {formatCurrency(localAmount)}
        </Text>
      </View>

      {/* Suggestions montants rapides */}
      {editable && showKeypad && suggestedAmounts.length > 0 && (
        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsLabel}>Montants rapides:</Text>
          <View style={styles.suggestions}>
            {suggestedAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.suggestionButton,
                  {
                    borderColor: theme.colors.primary,
                    backgroundColor:
                      localAmount === amount
                        ? theme.colors.primary
                        : 'transparent',
                  },
                ]}
                onPress={() => handleAmountChange(amount)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.suggestionText,
                    {
                      color:
                        localAmount === amount
                          ? '#FFFFFF'
                          : theme.colors.primary,
                    },
                  ]}
                >
                  {formatCurrency(amount, false)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Monnaie à rendre */}
      <View style={styles.changeSection}>
        <Text style={styles.label}>Monnaie à rendre</Text>
        <Text
          style={[
            styles.changeAmount,
            isInsufficient && styles.changeInsufficient,
            isValid && styles.changeValid,
          ]}
        >
          {isInsufficient ? '⚠️ Insuffisant' : formatCurrency(change)}
        </Text>
      </View>

      {/* Feedback visuel */}
      {isExact && (
        <View style={styles.exactBadge}>
          <Text style={styles.exactBadgeText}>✓ Montant exact</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI_COLORS.surface,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: UI_COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.textSecondary,
    marginBottom: 4,
  },

  // Total
  totalSection: {
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: '700',
  },

  // Montant reçu
  receivedSection: {
    marginBottom: 16,
  },
  receivedAmount: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: UI_COLORS.text,
  },
  insufficientAmount: {
    color: '#EF4444', // Rouge
  },
  validAmount: {
    color: '#10B981', // Vert
  },

  // Suggestions
  suggestionsSection: {
    marginBottom: 16,
  },
  suggestionsLabel: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    marginBottom: 8,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  suggestionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },

  // Monnaie
  changeSection: {
    marginTop: 16,
  },
  changeAmount: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: UI_COLORS.text,
  },
  changeInsufficient: {
    fontSize: FONT_SIZES.lg,
    color: '#EF4444',
  },
  changeValid: {
    color: '#10B981', // Vert
  },

  // Badge montant exact
  exactBadge: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#D1FAE5', // Green 100
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  exactBadgeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: '#047857', // Green 700
  },

  divider: {
    height: 1,
    backgroundColor: UI_COLORS.borderLight,
    marginVertical: 12,
  },
});

export default ThemedPaymentSummary;