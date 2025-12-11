/**
 * SGPME - ThemedNumericKeypad
 * 
 * ⭐ CLAVIER NUMÉRIQUE - CRUCIAL pour POS VENDEUR ⭐
 * 
 * Clavier tactile avec GROS boutons pour saisie rapide
 * Utilisé pour : quantités, montants reçus, codes produits
 * 
 * Features:
 * - Grille 4×3 (1-9, 0, ., ⌫)
 * - GROS boutons tactiles (faciles à taper)
 * - Feedback visuel (active state)
 * - Support virgule/point décimal
 * - Bouton clear/backspace
 * - Style adapté au module
 * - Son optionnel (v2)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedNumericKeypad Component
 * 
 * @param {Object} props
 * @param {Function} props.onKeyPress - Callback (key) appelé à chaque touche
 * @param {boolean} props.showDecimal - Afficher bouton décimal (.)
 * @param {boolean} props.vibrate - Vibration au tap (défaut: true)
 * @param {string} props.variant - 'default' | 'compact' (défaut: 'default')
 * @param {Object} props.style - Style custom
 */
const ThemedNumericKeypad = ({
  onKeyPress,
  showDecimal = true,
  vibrate = true,
  variant = 'default',
  style,
}) => {
  const theme = useTheme();

  // Layout clavier
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [showDecimal ? '.' : '', '0', '⌫'],
  ];

  const handlePress = (key) => {
    if (!key) return; // Case vide
    
    // Vibration tactile
    if (vibrate) {
      Vibration.vibrate(10);
    }

    // Callback
    onKeyPress?.(key);
  };

  // Styles selon variante
  const isCompact = variant === 'compact';
  const buttonSize = isCompact ? 60 : 80;
  const fontSize = isCompact ? FONT_SIZES['2xl'] : FONT_SIZES['4xl'];
  const gap = isCompact ? 8 : 12;

  return (
    <View style={[styles.container, style]}>
      {keys.map((row, rowIndex) => (
        <View 
          key={rowIndex} 
          style={[styles.row, { marginBottom: gap }]}
        >
          {row.map((key, keyIndex) => {
            const isBackspace = key === '⌫';
            const isEmpty = !key;

            return (
              <TouchableOpacity
                key={keyIndex}
                style={[
                  styles.key,
                  {
                    width: buttonSize,
                    height: buttonSize,
                    marginHorizontal: gap / 2,
                    backgroundColor: isEmpty 
                      ? 'transparent' 
                      : isBackspace
                        ? UI_COLORS.backgroundTertiary
                        : theme.colors.primary,
                  },
                ]}
                onPress={() => handlePress(key)}
                disabled={isEmpty}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.keyText,
                    {
                      fontSize: fontSize,
                      color: isEmpty 
                        ? 'transparent' 
                        : isBackspace
                          ? UI_COLORS.text
                          : '#FFFFFF',
                    },
                  ]}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  key: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  keyText: {
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default ThemedNumericKeypad;