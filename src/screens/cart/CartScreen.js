/**
 * SGPME - CartScreen
 * 
 * Écran panier pour vendeur/caissier
 * 
 * Features:
 * - Liste articles avec quantités
 * - Modification quantité
 * - Suppression article
 * - Résumé total
 * - Navigation vers paiement
 * - État vide
 * - Adapté au module actif
 */

import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import {
  ThemedHeader,
  ThemedCartItem,
  ThemedCartSummary,
  ThemedEmptyState,
  ThemedToast,
} from '../../components/themed';
import { UI_COLORS } from '../../constants';
import {
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from '../../redux/slices/cartSlice';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const cartItems = useSelector(state => state.cart.items);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  // Calculs
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.prix_unitaire * item.quantite,
    0
  );
  const discount = 0; // Pour l'instant pas de remise
  const total = subtotal - discount;

  // Modifier quantité
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const item = cartItems.find(i => i.produit_id === itemId);

    if (!item) return;

    // Vérifier stock
    if (newQuantity > item.stock_actuel) {
      setToast({
        visible: true,
        message: `Stock insuffisant (${item.stock_actuel} disponibles)`,
        type: 'warning',
      });
      return;
    }

    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    dispatch(updateCartItemQuantity({ produitId: itemId, quantite: newQuantity }));
  };

  // Supprimer article
  const handleRemoveItem = (itemId) => {
    const item = cartItems.find(i => i.produit_id === itemId);

    Alert.alert(
      'Retirer du panier',
      `Voulez-vous retirer "${item?.nom}" du panier ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Retirer',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFromCart(itemId));
            setToast({
              visible: true,
              message: 'Article retiré du panier',
              type: 'info',
            });
          },
        },
      ]
    );
  };

  // Vider panier
  const handleClearCart = () => {
    Alert.alert(
      'Vider le panier',
      'Voulez-vous vraiment vider le panier ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Vider',
          style: 'destructive',
          onPress: () => {
            dispatch(clearCart());
            setToast({
              visible: true,
              message: 'Panier vidé',
              type: 'info',
            });
          },
        },
      ]
    );
  };

  // Passer au paiement
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    navigation.navigate('Checkout');
  };

  // Render item
  const renderCartItem = ({ item }) => (
    <ThemedCartItem
      item={{
        produit_id: item.produit_id,
        nom: item.nom,
        image: item.image,
        prix_unitaire: item.prix_unitaire,
        quantite: item.quantite,
        stock_actuel: item.stock_actuel,
        code: item.code,
        remise: 0,
      }}
      onUpdateQuantity={handleUpdateQuantity}
      onRemove={handleRemoveItem}
      showStock
    />
  );

  // État vide
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedHeader
          title="Panier"
          showBack
          onBack={() => navigation.goBack()}
        />

        <ThemedEmptyState
          icon="🛒"
          title="Panier vide"
          message="Ajoutez des produits pour commencer une vente"
          actionLabel="Voir les produits"
          onAction={() => navigation.navigate('Products')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ThemedHeader
        title="Panier"
        showBack
        onBack={() => navigation.goBack()}
        rightActions={
          <Text
            style={[styles.clearButton, { color: theme.colors.primary }]}
            onPress={handleClearCart}
          >
            Vider
          </Text>
        }
      />

      {/* Liste articles */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.produit_id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Résumé */}
      <ThemedCartSummary
        subtotal={subtotal}
        discount={discount}
        total={total}
        itemsCount={cartItems.length}
        actionLabel="Passer au paiement"
        onAction={handleCheckout}
        showDetails
      />

      {/* Toast */}
      <ThemedToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast({ ...toast, visible: false })}
        position="bottom"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },

  clearButton: {
    fontSize: 16,
    fontWeight: '600',
  },

  cartList: {
    paddingVertical: 8,
  },
});

export default CartScreen;