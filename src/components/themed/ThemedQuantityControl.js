/**
 * SGPME - ThemedQuantityControl
 * 
 * Contrôle de quantité standalone pour VENDEUR POS
 * Boutons +/- GROS et tactiles pour faciliter la saisie rapide
 * 
 * Features:
 * - Gros boutons tactiles (faciles à taper)
 * - Affichage quantité centrale
 * - Min/Max validation
 * - Feedback visuel (disabled states)
 * - Style adapté au module
 * - Variante compacte ou large
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedQuantityControl Component
 * 
 * @param {Object} props
 * @param {number} props.value - Quantité actuelle
 * @param {Function} props.onChange - Callback (newValue)
 * @param {number} props.min - Quantité minimum (défaut: 1)
 * @param {number} props.max - Quantité maximum (défaut: 999)
 * @param {number} props.step - Incrément (défaut: 1)
 * @param {string} props.size - 'small' | 'medium' | 'large' (défaut: 'medium')
 * @param {boolean} props.disabled - Désactiver contrôle
 * @param {Object} props.style - Style custom
 */
const ThemedQuantityControl = ({
  value = 1,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  size = 'medium',
  disabled = false,
  style,
}) => {
  const theme = useTheme();

  const handleDecrease = () => {
    if (disabled || value <= min) return;
    const newValue = Math.max(min, value - step);
    onChange?.(newValue);
  };

  const handleIncrease = () => {
    if (disabled || value >= max) return;
    const newValue = Math.min(max, value + step);
    onChange?.(newValue);
  };

  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && value < max;

  // Styles selon taille
  const sizeStyles = {
    small: {
      buttonSize: 32,
      fontSize: 16,
      quantityFont: FONT_SIZES.md,
      spacing: 8,
    },
    medium: {
      buttonSize: 44,
      fontSize: 20,
      quantityFont: FONT_SIZES.xl,
      spacing: 12,
    },
    large: {
      buttonSize: 56,
      fontSize: 24,
      quantityFont: FONT_SIZES['3xl'],
      spacing: 16,
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <View style={[styles.container, style]}>
      {/* Bouton - */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: currentSize.buttonSize,
            height: currentSize.buttonSize,
            backgroundColor: canDecrease 
              ? theme.colors.primary 
              : UI_COLORS.backgroundTertiary,
          },
        ]}
        onPress={handleDecrease}
        disabled={!canDecrease}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            {
              fontSize: currentSize.fontSize,
              color: canDecrease ? '#FFFFFF' : UI_COLORS.textLight,
            },
          ]}
        >
          −
        </Text>
      </TouchableOpacity>

      {/* Quantité */}
      <View 
        style={[
          styles.quantityContainer,
          { marginHorizontal: currentSize.spacing }
        ]}
      >
        <Text
          style={[
            styles.quantity,
            {
              fontSize: currentSize.quantityFont,
              color: disabled ? UI_COLORS.textLight : UI_COLORS.text,
            },
          ]}
        >
          {value}
        </Text>
      </View>

      {/* Bouton + */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: currentSize.buttonSize,
            height: currentSize.buttonSize,
            backgroundColor: canIncrease 
              ? theme.colors.primary 
              : UI_COLORS.backgroundTertiary,
          },
        ]}
        onPress={handleIncrease}
        disabled={!canIncrease}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.buttonText,
            {
              fontSize: currentSize.fontSize,
              color: canIncrease ? '#FFFFFF' : UI_COLORS.textLight,
            },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  buttonText: {
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  quantityContainer: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantity: {
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ThemedQuantityControl;