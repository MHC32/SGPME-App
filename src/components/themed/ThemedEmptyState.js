/**
 * SGPME - ThemedEmptyState
 * 
 * État vide pour VENDEUR POS
 * Affichage liste/panier/recherche vide
 * 
 * Features:
 * - Icône emoji grande
 * - Titre descriptif
 * - Message explicatif
 * - Bouton action optionnel
 * - Variante : default, minimal, illustrated
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import ThemedButton from '../../theme/ThemedButton';

/**
 * ThemedEmptyState Component
 * 
 * @param {Object} props
 * @param {string} props.icon - Emoji icône
 * @param {string} props.title - Titre
 * @param {string} props.message - Message explicatif
 * @param {string} props.actionLabel - Label bouton action
 * @param {Function} props.onAction - Callback action
 * @param {string} props.variant - 'default' | 'minimal' | 'illustrated'
 * @param {Object} props.style - Style custom
 */
const ThemedEmptyState = ({
  icon = '📦',
  title = 'Aucun élément',
  message,
  actionLabel,
  onAction,
  variant = 'default',
  style,
}) => {
  const theme = useTheme();

  // Styles selon variante
  const variantStyles = {
    default: {
      iconSize: 64,
      padding: 40,
      showBackground: true,
    },
    minimal: {
      iconSize: 48,
      padding: 24,
      showBackground: false,
    },
    illustrated: {
      iconSize: 80,
      padding: 48,
      showBackground: true,
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <View
      style={[
        styles.container,
        {
          padding: currentVariant.padding,
          backgroundColor: currentVariant.showBackground
            ? UI_COLORS.backgroundSecondary
            : 'transparent',
        },
        style,
      ]}
    >
      {/* Icône */}
      <View
        style={[
          styles.iconContainer,
          currentVariant.showBackground && styles.iconBackground,
        ]}
      >
        <Text style={{ fontSize: currentVariant.iconSize }}>{icon}</Text>
      </View>

      {/* Titre */}
      <Text style={styles.title}>{title}</Text>

      {/* Message */}
      {message && <Text style={styles.message}>{message}</Text>}

      {/* Action */}
      {actionLabel && onAction && (
        <View style={styles.actionContainer}>
          <ThemedButton
            title={actionLabel}
            onPress={onAction}
            variant="outlined"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  iconContainer: {
    marginBottom: 16,
  },

  iconBackground: {
    backgroundColor: UI_COLORS.white,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: UI_COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },

  message: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },

  actionContainer: {
    marginTop: 24,
    minWidth: 200,
  },
});

export default ThemedEmptyState;