/**
 * SGPME - ThemedSearchBar
 * 
 * Barre de recherche rapide produits pour VENDEUR POS
 * Placeholder dynamique selon module business
 * 
 * Features:
 * - Placeholder adapté au module (ex: "Chercher un médicament...")
 * - Icon search
 * - Bouton clear (X)
 * - Style selon module
 * - Optimisé pour rapidité (vendeur en action)
 */

import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Platform,
  Text
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedSearchBar Component
 * 
 * @param {Object} props
 * @param {string} props.value - Valeur contrôlée
 * @param {Function} props.onChangeText - Callback changement texte
 * @param {string} props.placeholder - Placeholder custom (sinon auto)
 * @param {Function} props.onSearch - Callback soumission recherche
 * @param {Function} props.onClear - Callback clear
 * @param {boolean} props.autoFocus - Auto focus au mount
 * @param {Object} props.style - Style custom container
 */
const ThemedSearchBar = ({
  value,
  onChangeText,
  placeholder,
  onSearch,
  onClear,
  autoFocus = false,
  style,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Placeholder par défaut selon module
  const getDefaultPlaceholder = () => {
    switch (theme.module) {
      case 'pharmacie':
        return 'Chercher un médicament...';
      case 'restaurant':
        return 'Chercher un plat...';
      case 'depot':
        return 'Chercher un article...';
      case 'shop':
        return 'Chercher un produit...';
      default:
        return 'Rechercher...';
    }
  };

  const displayPlaceholder = placeholder || getDefaultPlaceholder();

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChangeText) {
      onChangeText('');
    }
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.searchBox,
          isFocused && { 
            borderColor: theme.colors.primary,
            borderWidth: 2,
          }
        ]}
      >
        {/* Search Icon */}
        <View style={styles.iconContainer}>
          <Text style={[styles.icon, { color: theme.colors.primary }]}>
            🔍
          </Text>
        </View>

        {/* Input */}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={displayPlaceholder}
          placeholderTextColor={UI_COLORS.textLight}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          clearButtonMode="never" // On gère manuellement
        />

        {/* Clear Button */}
        {value && value.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.7}
          >
            <View style={styles.clearIcon}>
              <Text style={styles.clearText}>✕</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: UI_COLORS.background,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UI_COLORS.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: UI_COLORS.borderLight,
    paddingHorizontal: 12,
    height: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  iconContainer: {
    marginRight: 8,
  },
  icon: {
    fontSize: 20,
  },

  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: UI_COLORS.text,
    paddingVertical: 0, // Important pour Android
  },

  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: UI_COLORS.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 12,
    color: UI_COLORS.white,
    fontWeight: 'bold',
  },
});

export default ThemedSearchBar;