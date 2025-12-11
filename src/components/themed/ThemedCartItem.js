/**
 * SGPME - ThemedCartItem
 * 
 * Ligne d'article dans le panier pour VENDEUR POS
 * Affichage horizontal avec image, détails, prix et contrôle quantité
 * 
 * Features:
 * - Image produit (ou fallback)
 * - Nom + code produit
 * - Prix unitaire
 * - Contrôle quantité (+/-)
 * - Sous-total (quantité × prix)
 * - Bouton supprimer
 * - Style adapté au module
 */

import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Platform 
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { formatCurrency } from '../../utils/helpers';

/**
 * ThemedCartItem Component
 * 
 * @param {Object} props
 * @param {Object} props.item - Item panier {produit, nom, image, prix_unitaire, quantite, stock_actuel}
 * @param {Function} props.onUpdateQuantity - Callback (itemId, newQuantity)
 * @param {Function} props.onRemove - Callback (itemId)
 * @param {boolean} props.showStock - Afficher stock disponible
 * @param {Object} props.style - Style custom
 */
const ThemedCartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  showStock = true,
  style,
}) => {
  const theme = useTheme();

  // Calcul sous-total
  const subtotal = item.quantite * item.prix_unitaire;
  const discount = (subtotal * (item.remise || 0)) / 100;
  const total = subtotal - discount;

  // Gestion quantité
  const handleDecrease = () => {
    if (item.quantite > 1) {
      onUpdateQuantity?.(item.produit, item.quantite - 1);
    }
  };

  const handleIncrease = () => {
    // Vérifier stock si disponible
    if (item.stock_actuel !== undefined && item.quantite >= item.stock_actuel) {
      // Stock insuffisant
      return;
    }
    onUpdateQuantity?.(item.produit, item.quantite + 1);
  };

  const handleRemove = () => {
    onRemove?.(item.produit);
  };

  // Stock disponible restant
  const stockRestant = item.stock_actuel !== undefined 
    ? item.stock_actuel - item.quantite 
    : null;

  const isLowStock = stockRestant !== null && stockRestant <= 5;
  const isOutOfStock = stockRestant !== null && stockRestant <= 0;

  return (
    <View style={[styles.container, style]}>
      {/* Image produit */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.primaryLight }]}>
            <Text style={[styles.placeholderText, { color: theme.colors.primary }]}>
              {item.nom?.charAt(0) || '?'}
            </Text>
          </View>
        )}
      </View>

      {/* Détails produit */}
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.nom}
        </Text>
        
        {item.code && (
          <Text style={styles.code}>Code: {item.code}</Text>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Prix unitaire:</Text>
          <Text style={styles.price}>
            {formatCurrency(item.prix_unitaire)}
          </Text>
        </View>

        {/* Stock restant */}
        {showStock && stockRestant !== null && (
          <Text 
            style={[
              styles.stock,
              isLowStock && styles.stockLow,
              isOutOfStock && styles.stockOut,
            ]}
          >
            {isOutOfStock 
              ? '⚠️ Plus de stock' 
              : isLowStock
                ? `⚠️ ${stockRestant} restant${stockRestant > 1 ? 's' : ''}`
                : `${stockRestant} en stock`
            }
          </Text>
        )}
      </View>

      {/* Contrôles droite */}
      <View style={styles.controls}>
        {/* Quantité */}
        <View style={styles.quantityControl}>
          <TouchableOpacity 
            style={[styles.qtyButton, { borderColor: theme.colors.primary }]}
            onPress={handleDecrease}
            disabled={item.quantite <= 1}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.qtyButtonText, 
              { color: item.quantite <= 1 ? UI_COLORS.textLight : theme.colors.primary }
            ]}>
              −
            </Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantite}</Text>

          <TouchableOpacity 
            style={[styles.qtyButton, { borderColor: theme.colors.primary }]}
            onPress={handleIncrease}
            disabled={isOutOfStock}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.qtyButtonText, 
              { color: isOutOfStock ? UI_COLORS.textLight : theme.colors.primary }
            ]}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sous-total */}
        <Text style={[styles.total, { color: theme.colors.primary }]}>
          {formatCurrency(total)}
        </Text>

        {/* Bouton supprimer */}
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={handleRemove}
          activeOpacity={0.7}
        >
          <Text style={styles.removeIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: UI_COLORS.surface,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: UI_COLORS.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // Image
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '700',
  },

  // Détails
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 4,
  },
  code: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    marginRight: 4,
  },
  price: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  stock: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    marginTop: 4,
  },
  stockLow: {
    color: '#F59E0B', // Orange
  },
  stockOut: {
    color: '#EF4444', // Rouge
  },

  // Contrôles droite
  controls: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 100,
  },

  // Quantité
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  quantity: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: UI_COLORS.text,
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },

  // Total
  total: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: 8,
  },

  // Supprimer
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    fontSize: 20,
  },
});

export default ThemedCartItem;