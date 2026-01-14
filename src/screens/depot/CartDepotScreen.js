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
  const { theme } = useTheme();

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: theme.primary }]}>
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
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
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
        <View style={[styles.summaryContainer, { borderTopColor: theme.border }]}>
          {/* Total units info */}
          <View style={styles.unitsRow}>
            <Text style={[styles.unitsText, { color: theme.textSecondary }]}>
              {itemsCount} article{itemsCount > 1 ? 's' : ''} ({totalUnits} unités totales)
            </Text>
          </View>

          {/* Subtotal */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Sous-total
            </Text>
            <Text style={[styles.amount, { color: theme.textPrimary }]}>
              {totals.sousTotal.toFixed(2)} HTG
            </Text>
          </View>

          {/* Discount */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Remise ({totals.remisePourcent.toFixed(0)}%)
            </Text>
            <Text style={[styles.amount, { color: theme.textPrimary }]}>
              {totals.remise.toFixed(2)} HTG
            </Text>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.textPrimary }]}>
              TOTAL
            </Text>
            <Text style={[styles.totalAmount, { color: theme.primary }]}>
              {totals.total.toFixed(2)} HTG
            </Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: theme.primary }]}
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
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#FFF'
  },
  backBtn: {
    paddingVertical: 5
  },
  backText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#404040'
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
    borderRadius: 20,
    backgroundColor: '#404040'
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
    borderTopColor: '#e0e0e0',
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
    color: '#666',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  label: {
    fontSize: 15,
    color: '#666'
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#404040'
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
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
    fontWeight: '700',
    color: '#404040'
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#404040'
  },
  checkoutBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#404040'
  },
  checkoutBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default CartDepotScreen;