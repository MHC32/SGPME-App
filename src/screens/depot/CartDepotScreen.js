/**
 * CART DEPOT SCREEN
 * 
 * Écran panier du module Depot
 * Affiche les items avec conditionnements et résumé des totaux
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import Toast from 'react-native-toast-message';

// Redux
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotals,
  selectCartItemsCount,
  selectCartTotalUnits,
  selectIsCartEmpty
} from '../../redux/slices/depotSlice';

// Components
import { CartItemDepot } from '../../components/depot';
import EmptyState from '../../components/themed/ThemedEmptyState';

const CartDepotScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme(); // ⬅️ FIX: Pas de destructuring, retourne directement le thème

  // Redux state
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const itemsCount = useSelector(selectCartItemsCount);
  const totalUnits = useSelector(selectCartTotalUnits);
  const isEmpty = useSelector(selectIsCartEmpty);

  // Update quantity handler
  const handleUpdateQuantity = (itemId, delta) => {
    dispatch(updateQuantity({ itemId, delta }));

    // Show feedback
    if (delta > 0) {
      Toast.show({
        type: 'success',
        text1: 'Quantité augmentée',
        position: 'bottom',
        visibilityTime: 1500
      });
    }
  };

  // Remove item handler
  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    
    Toast.show({
      type: 'success',
      text1: 'Article retiré',
      position: 'bottom',
      visibilityTime: 2000
    });
  };

  // Clear cart handler
  const handleClearCart = () => {
    Alert.alert(
      'Vider le panier',
      'Êtes-vous sûr de vouloir vider tout le panier ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Vider',
          style: 'destructive',
          onPress: () => {
            dispatch(clearCart());
            Toast.show({
              type: 'success',
              text1: 'Panier vidé',
              position: 'bottom',
              visibilityTime: 2000
            });
          }
        }
      ]
    );
  };

  // Navigate to checkout
  const handleCheckout = () => {
    if (isEmpty) {
      Toast.show({
        type: 'error',
        text1: 'Panier vide',
        text2: 'Ajoutez des produits avant de passer au paiement'
      });
      return;
    }

    navigation.navigate('CheckoutDepot');
  };

  // Navigate back
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Render cart item
  const renderCartItem = ({ item }) => (
    <CartItemDepot
      item={item}
      onUpdateQuantity={handleUpdateQuantity}
      onRemove={handleRemove}
    />
  );

  // Render empty state
  const renderEmpty = () => (
    <EmptyState
      icon="🛒"
      title="Panier vide"
      message="Ajoutez des produits pour commencer votre vente"
      action={{
        label: 'Voir les produits',
        onPress: () => navigation.navigate('ProductsDepot')
      }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors?.primary || '#f5f5f5' }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors?.border || '#e0e0e0' }]}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: theme.colors?.primary || '#404040' }]}>
            ← Panier
          </Text>
        </TouchableOpacity>

        {!isEmpty && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearCart}
            activeOpacity={0.7}
          >
            <Text style={styles.clearText}>Vider</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Items count badge */}
      {!isEmpty && (
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: theme.colors?.primary || '#404040' }]}>
            <Text style={styles.badgeText}>
              {itemsCount} article{itemsCount > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      )}

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary (only if cart not empty) */}
      {!isEmpty && (
        <View style={[styles.summaryContainer, { borderTopColor: theme.colors?.border || '#e0e0e0' }]}>
          {/* Total units info */}
          <View style={styles.unitsRow}>
            <Text style={[styles.unitsText, { color: theme.colors?.textSecondary || '#666' }]}>
              {itemsCount} article{itemsCount > 1 ? 's' : ''} ({totalUnits} unités totales)
            </Text>
          </View>

          {/* Subtotal */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors?.textSecondary || '#666' }]}>
              Sous-total
            </Text>
            <Text style={[styles.amount, { color: theme.colors?.textPrimary || '#404040' }]}>
              {totals.sousTotal.toFixed(2)} HTG
            </Text>
          </View>

          {/* Discount */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors?.textSecondary || '#666' }]}>
              Remise ({totals.remisePourcent.toFixed(0)}%)
            </Text>
            <Text style={[styles.amount, { color: theme.colors?.textPrimary || '#404040' }]}>
              {totals.remise.toFixed(2)} HTG
            </Text>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: theme.colors?.border || '#e0e0e0' }]} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.colors?.textPrimary || '#404040' }]}>
              TOTAL
            </Text>
            <Text style={[styles.totalAmount, { color: theme.colors?.primary || '#404040' }]}>
              {totals.total.toFixed(2)} HTG
            </Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: theme.colors?.primary || '#404040' }]}
            onPress={handleCheckout}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutBtnText}>
              💰 Passer au paiement
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 2,
    backgroundColor: '#FFF'
  },
  backBtn: {
    paddingVertical: 5
  },
  backText: {
    fontSize: 18,
    fontWeight: '700'
  },
  clearBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  clearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f44336'
  },
  badgeContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  badgeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700'
  },
  listContent: {
    padding: 15,
    flexGrow: 1
  },
  summaryContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  unitsRow: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  unitsText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    fontSize: 15
  },
  amount: {
    fontSize: 15,
    fontWeight: '600'
  },
  divider: {
    height: 2,
    marginVertical: 12
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700'
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800'
  },
  checkoutBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkoutBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default CartDepotScreen;