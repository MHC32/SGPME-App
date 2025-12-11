/**
 * SGPME - ThemedHeader
 * 
 * Header adaptatif selon le module business (pharmacie/restaurant/depot/shop)
 * Optimisé pour interface VENDEUR POS
 * 
 * Features:
 * - Titre dynamique selon module
 * - Bouton back optionnel
 * - Actions : Search icon, Cart badge
 * - Style adapté au module actif
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../redux/slices/cartSlice';

/**
 * ThemedHeader Component
 * 
 * @param {Object} props
 * @param {string} props.title - Titre du header (ou auto selon module)
 * @param {boolean} props.showBack - Afficher bouton retour
 * @param {Function} props.onBack - Callback bouton retour
 * @param {boolean} props.showSearch - Afficher icon search
 * @param {Function} props.onSearch - Callback search
 * @param {boolean} props.showCart - Afficher badge panier
 * @param {Function} props.onCart - Callback panier
 * @param {React.ReactNode} props.rightActions - Actions custom à droite
 */
const ThemedHeader = ({
  title,
  showBack = false,
  onBack,
  showSearch = false,
  onSearch,
  showCart = false,
  onCart,
  rightActions,
}) => {
  const theme = useTheme();
  const cartItemsCount = useSelector(selectCartItemsCount);

  // Titre par défaut selon module si non fourni
  const displayTitle = title || theme.labels.products;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      {/* Left: Back button OU Spacer */}
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>

      {/* Center: Title */}
      <View style={styles.centerSection}>
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>
      </View>

      {/* Right: Actions */}
      <View style={styles.rightSection}>
        {rightActions || (
          <>
            {/* Search Icon */}
            {showSearch && (
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={onSearch}
                activeOpacity={0.7}
              >
                <Text style={styles.actionIcon}>🔍</Text>
              </TouchableOpacity>
            )}

            {/* Cart Badge */}
            {showCart && (
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={onCart}
                activeOpacity={0.7}
              >
                <View style={styles.cartContainer}>
                  <Text style={styles.actionIcon}>🛒</Text>
                  {cartItemsCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 44 : 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Sections
  leftSection: {
    width: 50,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 50,
  },

  // Title
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Buttons
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  actionIcon: {
    fontSize: 22,
  },

  // Cart Badge
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444', // Rouge
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default ThemedHeader;