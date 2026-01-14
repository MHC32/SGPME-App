/**
 * CONDITIONNEMENT CARD WITH QUANTITY SELECTOR
 * 
 * Card pour un conditionnement avec sélecteur de quantité
 * Permet de choisir la quantité avant d'ajouter au panier
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatPrice } from '../../utils/depot/conditionnementHelpers';

/**
 * ConditionnementCard Component
 * 
 * @param {object} props
 * @param {object} props.product - Produit complet
 * @param {object} props.conditionnement - Conditionnement avec type, qte, prix, stock, label, emoji
 * @param {function} props.onAddToCart - Callback(product, conditionnement)
 */
export const ConditionnementCard = ({
  product,
  conditionnement,
  onAddToCart
}) => {
  const theme = useTheme();
  const [quantite, setQuantite] = useState(1);

  // ✅ FIX: Données du conditionnement avec valeurs par défaut
  const {
    type = 'unite',
    qte: qteParConditionnement = 1,
    prix = 0, // ✅ Valeur par défaut
    stock = 0,
    label = 'Unité',
    emoji = '📦'
  } = conditionnement || {};

  // Calculs
  const total = prix * quantite;
  const isDisabled = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  // Handlers
  const handleDecrement = () => {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    }
  };

  const handleIncrement = () => {
    if (quantite < stock) {
      setQuantite(quantite + 1);
    } else {
      Alert.alert(
        'Stock insuffisant',
        `Stock disponible: ${stock} ${getUnitLabel(type)}`
      );
    }
  };

  const handleQuantityChange = (text) => {
    // Permettre seulement les nombres
    const numericValue = text.replace(/[^0-9]/g, '');
    
    if (numericValue === '') {
      setQuantite(1);
      return;
    }

    const newQuantite = parseInt(numericValue, 10);

    if (newQuantite <= 0) {
      setQuantite(1);
    } else if (newQuantite > stock) {
      Alert.alert(
        'Stock insuffisant',
        `Stock disponible: ${stock} ${getUnitLabel(type)}`
      );
      setQuantite(stock);
    } else {
      setQuantite(newQuantite);
    }
  };

  const handleAddToCart = () => {
    if (isDisabled) {
      Alert.alert('Stock épuisé', `Ce conditionnement n'est plus disponible.`);
      return;
    }

    // ✅ FIX: Créer un objet conditionnement avec données validées
    const validatedConditionnement = {
      ...conditionnement,
      type: type,
      qte: qteParConditionnement,
      prix: prix || 0, // ✅ Garantir un prix
      stock: stock,
      label: label,
      emoji: emoji,
      quantiteInitiale: quantite
    };

    // Appeler le callback avec la quantité sélectionnée
    onAddToCart(product, validatedConditionnement);

    // Reset à 1 après ajout
    setQuantite(1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.sm
        },
        isDisabled && styles.disabled
      ]}
    >
      {/* Header: Icon + Label */}
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text
          style={[
            styles.label,
            { color: theme.colors.text },
            isDisabled && styles.disabledText
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>

      {/* Prix */}
      <Text
        style={[
          styles.price,
          { color: theme.colors.primary },
          isDisabled && styles.disabledText
        ]}
      >
        {formatPrice(prix, 'HTG')}
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
          {stock} {getUnitLabel(type)}
        </Text>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      {/* Quantity Selector */}
      <View style={styles.quantitySection}>
        <Text style={[styles.quantityLabel, { color: theme.colors.textSecondary }]}>
          Quantité:
        </Text>

        <View style={styles.quantityControls}>
          {/* Minus Button */}
          <TouchableOpacity
            style={[
              styles.quantityButton,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              },
              (quantite <= 1 || isDisabled) && styles.quantityButtonDisabled
            ]}
            onPress={handleDecrement}
            disabled={quantite <= 1 || isDisabled}
          >
            <Icon
              name="minus"
              size={18}
              color={quantite <= 1 || isDisabled ? '#ccc' : theme.colors.text}
            />
          </TouchableOpacity>

          {/* Quantity Input */}
          <TextInput
            style={[
              styles.quantityInput,
              {
                borderColor: theme.colors.border,
                color: theme.colors.text
              }
            ]}
            value={quantite.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="number-pad"
            maxLength={4}
            editable={!isDisabled}
          />

          {/* Plus Button */}
          <TouchableOpacity
            style={[
              styles.quantityButton,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              },
              (quantite >= stock || isDisabled) && styles.quantityButtonDisabled
            ]}
            onPress={handleIncrement}
            disabled={quantite >= stock || isDisabled}
          >
            <Icon
              name="plus"
              size={18}
              color={quantite >= stock || isDisabled ? '#ccc' : theme.colors.text}
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

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: isDisabled ? '#ccc' : theme.colors.primary,
            borderRadius: theme.borderRadius.sm
          }
        ]}
        onPress={handleAddToCart}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        <Icon name="cart-plus" size={18} color="#FFF" />
        <Text style={styles.addButtonText}>
          {isDisabled ? 'Stock épuisé' : 'Ajouter au panier'}
        </Text>
      </TouchableOpacity>

      {/* Épuisé Overlay */}
      {isDisabled && (
        <View style={styles.epuiseOverlay}>
          <Icon name="close-circle" size={32} color="#FFF" />
          <Text style={styles.epuiseText}>Épuisé</Text>
        </View>
      )}
    </View>
  );
};

/**
 * Helper: Get unit label
 */
const getUnitLabel = (type) => {
  const labels = {
    unite: 'unités',
    caisse: 'caisses',
    carton: 'cartons',
    sac: 'sacs',
    palette: 'palettes',
    bouteille: 'bouteilles',
    boite: 'boîtes',
    pack: 'packs'
  };
  return labels[type] || 'unités';
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    position: 'relative'
  },
  disabled: {
    opacity: 0.6
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  emoji: {
    fontSize: 20,
    marginRight: 6
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#404040'
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 6
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10
  },
  quantitySection: {
    marginBottom: 10
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  quantityButtonDisabled: {
    opacity: 0.4
  },
  quantityInput: {
    flex: 1,
    height: 32,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    marginHorizontal: 6,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#404040',
    backgroundColor: '#f9f9f9'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 6
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666'
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#404040',
    borderRadius: 6,
    paddingVertical: 10,
    gap: 6
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700'
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
    fontWeight: '700',
    marginTop: 6
  }
});

export default ConditionnementCard;