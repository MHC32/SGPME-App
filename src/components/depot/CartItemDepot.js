/**
 * CART ITEM DEPOT
 * 
 * Component pour afficher un item du panier
 * avec conditionnement, quantité, prix et contrôles
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const CartItemDepot = ({
  item,
  onUpdateQuantity,
  onRemove,
  style
}) => {
  const { theme } = useTheme();

  const handleDecrease = () => {
    if (item.quantite === 1) {
      // Confirm removal
      Alert.alert(
        'Retirer du panier',
        `Retirer ${item.productName} du panier ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Retirer', 
            style: 'destructive',
            onPress: () => onRemove(item.id) 
          }
        ]
      );
    } else {
      onUpdateQuantity(item.id, -1);
    }
  };

  const handleIncrease = () => {
    // Check stock
    if (item.quantite >= item.stockDisponible) {
      Alert.alert(
        'Stock insuffisant',
        `Stock disponible : ${item.stockDisponible} ${item.unitLabel}`,
        [{ text: 'OK' }]
      );
      return;
    }
    onUpdateQuantity(item.id, 1);
  };

  const handleRemove = () => {
    Alert.alert(
      'Retirer du panier',
      `Retirer ${item.productName} du panier ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Retirer', 
          style: 'destructive',
          onPress: () => onRemove(item.id) 
        }
      ]
    );
  };

  // Stock restant après cet item
  const stockRestant = item.stockDisponible - item.quantite;
  const isLowStock = stockRestant <= 5;

  return (
    <View style={[styles.container, { borderColor: theme.border }, style]}>
      <View style={styles.content}>
        {/* Product Image/Emoji */}
        <View style={[styles.imageContainer, { backgroundColor: theme.cardBg }]}>
          {item.productImage ? (
            <Image 
              source={{ uri: item.productImage }} 
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.emoji}>{item.emoji || '📦'}</Text>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          {/* Product Name */}
          <Text 
            style={[styles.name, { color: theme.textPrimary }]}
            numberOfLines={1}
          >
            {item.productName}
          </Text>

          {/* Code & Conditionnement */}
          <View style={styles.metaRow}>
            <Text style={[styles.code, { color: theme.textSecondary }]}>
              {item.productCode}
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={[styles.conditionnement, { color: theme.primary }]}>
              {item.conditionnementLabel}
            </Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={[styles.qtyBtn, { borderColor: theme.border }]}
              onPress={handleDecrease}
              activeOpacity={0.7}
            >
              <Text style={[styles.qtyBtnText, { color: theme.textPrimary }]}>
                −
              </Text>
            </TouchableOpacity>

            <Text style={[styles.quantity, { color: theme.textPrimary }]}>
              {item.quantite} {item.unitLabel}
            </Text>

            <TouchableOpacity
              style={[styles.qtyBtn, { borderColor: theme.border }]}
              onPress={handleIncrease}
              activeOpacity={0.7}
            >
              <Text style={[styles.qtyBtnText, { color: theme.textPrimary }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {/* Price Row */}
          <View style={styles.priceRow}>
            <Text style={[styles.priceCalc, { color: theme.textSecondary }]}>
              {item.prixUnitaire.toFixed(2)} HTG × {item.quantite}
            </Text>
            <Text style={[styles.total, { color: theme.primary }]}>
              {item.total.toFixed(2)} HTG
            </Text>
          </View>

          {/* Stock Restant */}
          <Text 
            style={[
              styles.stockRestant, 
              { color: isLowStock ? '#FF9800' : '#4CAF50' }
            ]}
          >
            Stock restant: {stockRestant} {item.unitLabel}
          </Text>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleRemove}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  content: {
    flexDirection: 'row',
    gap: 12
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    flexShrink: 0
  },
  image: {
    width: '100%',
    height: '100%'
  },
  emoji: {
    fontSize: 28
  },
  info: {
    flex: 1,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
    color: '#404040'
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6
  },
  code: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace'
  },
  separator: {
    fontSize: 12,
    color: '#999'
  },
  conditionnement: {
    fontSize: 12,
    fontWeight: '600',
    color: '#404040'
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#404040'
  },
  quantity: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'monospace',
    minWidth: 80,
    textAlign: 'center',
    color: '#404040'
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  priceCalc: {
    fontSize: 14,
    color: '#666'
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040'
  },
  stockRestant: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50'
  },
  deleteBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flexShrink: 0
  },
  deleteIcon: {
    fontSize: 20
  }
});

export default CartItemDepot;