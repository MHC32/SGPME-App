/**
 * PRODUCT CARD DEPOT - AVEC FALLBACK UNITÉ
 * 
 * Card produit pour le module Depot
 * Si pas de conditionnements → Fallback automatique à l'unité avec sélecteur de quantité
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Utils
import {
  transformPrixVenteOptions,
  getStockBadge,
  formatPrice
} from '../../utils/depot/conditionnementHelpers';

/**
 * ProductCardDepot Component
 */
export const ProductCardDepot = ({
  product,
  onAddConditionnement,
  style
}) => {
  const theme = useTheme();

  // Transform prix_vente_options to conditionnements
  const conditionnements = useMemo(() => {
    if (!product.prix_vente_options || product.prix_vente_options.length === 0) {
      return [];
    }
    return transformPrixVenteOptions(product.prix_vente_options);
  }, [product.prix_vente_options]);

  // Check if product has conditionnements
  const hasConditionnements = conditionnements.length > 0;

  // Get stock badge
  const stockBadge = useMemo(() => {
    const stock = hasConditionnements 
      ? conditionnements[0]?.stock || 0
      : product.stock_actuel || 0;
    
    return getStockBadge(stock, 10);
  }, [conditionnements, product.stock_actuel, hasConditionnements]);

  // Handle conditionnement press
  const handleConditionnementPress = (conditionnement) => {
    if (conditionnement.stock === 0) {
      Alert.alert(
        'Stock épuisé',
        `Le ${conditionnement.label} n'est plus disponible.`
      );
      return;
    }

    onAddConditionnement?.(product, conditionnement);
  };

  // Render conditionnement card
  const renderConditionnement = (conditionnement, index) => {
    const isDisabled = conditionnement.stock === 0;
    const isLowStock = conditionnement.stock > 0 && conditionnement.stock <= 10;

    return (
      <View
        key={index}
        style={[
          styles.conditionnementCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            borderRadius: theme.borderRadius.sm
          },
          isDisabled && styles.conditionnementDisabled
        ]}
      >
        {/* Icon & Label */}
        <View style={styles.conditionnementHeader}>
          <Text style={styles.conditionnementIcon}>
            {conditionnement.emoji}
          </Text>
          <Text
            style={[
              styles.conditionnementLabel,
              { color: theme.colors.text },
              isDisabled && styles.disabledText
            ]}
            numberOfLines={1}
          >
            {conditionnement.label}
          </Text>
        </View>

        {/* Price */}
        <Text
          style={[
            styles.conditionnementPrice,
            { color: theme.colors.primary },
            isDisabled && styles.disabledText
          ]}
        >
          {formatPrice(conditionnement.prix, 'HTG')}
        </Text>

        {/* Stock */}
        <View style={styles.stockRow}>
          <Icon
            name={isDisabled ? 'close-circle' : isLowStock ? 'alert-circle' : 'check-circle'}
            size={14}
            color={isDisabled ? '#f44336' : isLowStock ? '#FF9800' : '#4CAF50'}
          />
          <Text
            style={[
              styles.stockText,
              {
                color: isDisabled ? '#f44336' : isLowStock ? '#FF9800' : '#4CAF50'
              }
            ]}
          >
            {conditionnement.stock}
          </Text>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: isDisabled ? '#ccc' : theme.colors.primary,
              borderRadius: theme.borderRadius.sm
            }
          ]}
          onPress={() => handleConditionnementPress(conditionnement)}
          disabled={isDisabled}
          activeOpacity={0.7}
        >
          <Icon name="plus" size={18} color="#FFF" />
        </TouchableOpacity>

        {/* Épuisé overlay */}
        {isDisabled && (
          <View style={styles.epuiseOverlay}>
            <Text style={styles.epuiseText}>Épuisé</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.md
        },
        theme.shadows.sm,
        style
      ]}
    >
      {/* Header: Image + Info + Stock Badge */}
      <View style={styles.header}>
        {/* Image or Emoji */}
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>
              {product.emoji || '📦'}
            </Text>
          </View>
        )}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text
            style={[
              styles.productName,
              { color: theme.colors.text }
            ]}
            numberOfLines={2}
          >
            {product.nom}
          </Text>

          {product.code && (
            <Text
              style={[
                styles.productCode,
                { color: theme.colors.textSecondary }
              ]}
            >
              {product.code}
            </Text>
          )}

          {/* Stock Badge */}
          {stockBadge && (
            <View
              style={[
                styles.stockBadge,
                { backgroundColor: stockBadge.color + '20' }
              ]}
            >
              <Text style={styles.stockBadgeIcon}>{stockBadge.icon}</Text>
              <Text
                style={[
                  styles.stockBadgeText,
                  { color: stockBadge.color }
                ]}
              >
                {stockBadge.label} • {hasConditionnements ? conditionnements[0]?.stock || 0 : product.stock_actuel || 0}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* CASE 1: Product HAS conditionnements */}
      {hasConditionnements ? (
        <>
          <Text
            style={[
              styles.conditionnementsSectionLabel,
              { color: theme.colors.textSecondary }
            ]}
          >
            Conditionnements disponibles:
          </Text>

          <View style={styles.conditionnementsList}>
            {conditionnements.map((conditionnement, index) =>
              renderConditionnement(conditionnement, index)
            )}
          </View>
        </>
      ) : (
        /* CASE 2: Product has NO conditionnements → Fallback to unit selector */
        <UnitQuantitySelector
          product={product}
          onAddToCart={onAddConditionnement}
        />
      )}
    </View>
  );
};

/**
 * UNIT QUANTITY SELECTOR
 * 
 * Sélecteur de quantité pour vente à l'unité
 */
const UnitQuantitySelector = ({ product, onAddToCart }) => {
  const theme = useTheme();
  const [quantite, setQuantite] = useState(1);

  const prixUnitaire = product.prix_vente || 0;
  const stockDisponible = product.stock_actuel || 0;
  const total = prixUnitaire * quantite;

  const handleDecrement = () => {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    }
  };

  const handleIncrement = () => {
    if (quantite < stockDisponible) {
      setQuantite(quantite + 1);
    } else {
      Alert.alert(
        'Stock insuffisant',
        `Stock disponible: ${stockDisponible} unités`
      );
    }
  };

  const handleAddToCart = () => {
    if (stockDisponible === 0) {
      Alert.alert('Stock épuisé', 'Ce produit n\'est plus disponible.');
      return;
    }

    // Create unit conditionnement
    const unitConditionnement = {
      type: 'unite',
      qte: 1,
      prix: prixUnitaire,
      stock: stockDisponible,
      label: `${quantite} Unité${quantite > 1 ? 's' : ''}`,
      emoji: '📦'
    };

    // Call parent with quantite override
    onAddToCart?.(product, { ...unitConditionnement, quantiteInitiale: quantite });

    // Reset quantity
    setQuantite(1);
  };

  const isDisabled = stockDisponible === 0;

  return (
    <View style={styles.unitSelectorContainer}>
      {/* Prix unitaire */}
      <View style={styles.unitPriceRow}>
        <Text style={[styles.unitPriceLabel, { color: theme.colors.textSecondary }]}>
          Prix unitaire:
        </Text>
        <Text style={[styles.unitPrice, { color: theme.colors.primary }]}>
          {formatPrice(prixUnitaire, 'HTG')}
        </Text>
      </View>

      {/* Quantity selector */}
      <View style={styles.quantitySelectorContainer}>
        <Text style={[styles.quantityLabel, { color: theme.colors.textSecondary }]}>
          Quantité:
        </Text>

        <View style={styles.quantityControls}>
          {/* Minus button */}
          <TouchableOpacity
            style={[
              styles.quantityButton,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              },
              quantite <= 1 && styles.quantityButtonDisabled
            ]}
            onPress={handleDecrement}
            disabled={quantite <= 1 || isDisabled}
          >
            <Icon name="minus" size={20} color={quantite <= 1 ? '#ccc' : theme.colors.text} />
          </TouchableOpacity>

          {/* Quantity display */}
          <View style={[styles.quantityDisplay, { borderColor: theme.colors.border }]}>
            <Text style={[styles.quantityText, { color: theme.colors.text }]}>
              {quantite}
            </Text>
            <Text style={[styles.quantityUnit, { color: theme.colors.textSecondary }]}>
              unité{quantite > 1 ? 's' : ''}
            </Text>
          </View>

          {/* Plus button */}
          <TouchableOpacity
            style={[
              styles.quantityButton,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              },
              (quantite >= stockDisponible || isDisabled) && styles.quantityButtonDisabled
            ]}
            onPress={handleIncrement}
            disabled={quantite >= stockDisponible || isDisabled}
          >
            <Icon 
              name="plus" 
              size={20} 
              color={quantite >= stockDisponible || isDisabled ? '#ccc' : theme.colors.text} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
          Total:
        </Text>
        <Text style={[styles.totalAmount, { color: theme.colors.primary }]}>
          {formatPrice(total, 'HTG')}
        </Text>
      </View>

      {/* Add to cart button */}
      <TouchableOpacity
        style={[
          styles.addToCartButton,
          {
            backgroundColor: isDisabled ? '#ccc' : theme.colors.primary,
            borderRadius: theme.borderRadius.sm
          }
        ]}
        onPress={handleAddToCart}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        <Icon name="cart-plus" size={20} color="#FFF" />
        <Text style={styles.addToCartButtonText}>
          {isDisabled ? 'Stock épuisé' : 'Ajouter au panier'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderEmoji: {
    fontSize: 32
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 4
  },
  productCode: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  stockBadgeIcon: {
    fontSize: 12,
    marginRight: 4
  },
  stockBadgeText: {
    fontSize: 11,
    fontWeight: '600'
  },
  conditionnementsSectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8
  },
  conditionnementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  conditionnementCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    position: 'relative'
  },
  conditionnementDisabled: {
    opacity: 0.6
  },
  conditionnementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  conditionnementIcon: {
    fontSize: 20,
    marginRight: 6
  },
  conditionnementLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#404040'
  },
  conditionnementPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 6
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4
  },
  addButton: {
    backgroundColor: '#404040',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledText: {
    opacity: 0.5
  },
  epuiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  epuiseText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700'
  },

  // Unit Selector Styles
  unitSelectorContainer: {
    paddingTop: 8
  },
  unitPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  unitPriceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  unitPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#404040'
  },
  quantitySelectorContainer: {
    marginBottom: 12
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  quantityButtonDisabled: {
    opacity: 0.4
  },
  quantityDisplay: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#404040'
  },
  quantityUnit: {
    fontSize: 11,
    color: '#666'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666'
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#404040'
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#404040',
    borderRadius: 8,
    paddingVertical: 14,
    gap: 8
  },
  addToCartButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700'
  }
});

export default ProductCardDepot;