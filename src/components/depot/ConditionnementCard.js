/**
 * CONDITIONNEMENT CARD
 * 
 * Card pour afficher un conditionnement d'un produit
 * avec prix et bouton d'ajout au panier
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const ConditionnementCard = ({
  icon = '📦',
  label,
  price,
  stock,
  onPress,
  disabled = false,
  loading = false,
  style
}) => {
  const { theme } = useTheme();

  const isDisabled = disabled || stock === 0 || loading;

  return (
    <View style={[styles.card, { borderColor: theme.border }, style]}>
      {/* Icon */}
      <Text style={styles.icon}>{icon}</Text>

      {/* Label */}
      <Text 
        style={[styles.label, { color: theme.textPrimary }]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {/* Price */}
      <Text style={[styles.price, { color: theme.primary }]}>
        {price.toFixed(2)} HTG
      </Text>

      {/* Stock indicator (optional) */}
      {stock !== undefined && stock <= 10 && stock > 0 && (
        <Text style={styles.lowStock}>Stock: {stock}</Text>
      )}

      {/* Add Button */}
      <TouchableOpacity
        style={[
          styles.addBtn,
          { backgroundColor: theme.primary },
          isDisabled && styles.addBtnDisabled
        ]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.addBtnText}>
            {stock === 0 ? '✕' : '+'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Out of stock overlay */}
      {stock === 0 && (
        <View style={styles.outOfStockOverlay}>
          <Text style={styles.outOfStockText}>Épuisé</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 140,
    position: 'relative'
  },
  icon: {
    fontSize: 22,
    marginBottom: 4
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
    color: '#404040'
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    color: '#404040'
  },
  lowStock: {
    fontSize: 10,
    color: '#FF9800',
    fontWeight: '600',
    marginBottom: 4
  },
  addBtn: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32
  },
  addBtnDisabled: {
    opacity: 0.5
  },
  addBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700'
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outOfStockText: {
    color: '#f44336',
    fontSize: 13,
    fontWeight: '700'
  }
});

export default ConditionnementCard;