/**
 * SGPME - CheckoutScreen
 * 
 * Écran paiement pour vendeur/caissier
 * 
 * Features:
 * - Résumé paiement avec calcul monnaie AUTO
 * - Clavier numérique tactile
 * - Suggestions montants rapides
 * - Validation paiement
 * - Loading lors validation
 * - Navigation vers Success
 * - Adapté au module actif
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import {
  ThemedHeader,
  ThemedPaymentSummary,
  ThemedNumericKeypad,
  ThemedButton,
  ThemedLoading,
  ThemedToast,
} from '../../components/themed';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { clearCart } from '../../store/slices/cartSlice';
import { addSale } from '../../store/slices/venteSlice';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);

  const [amountInput, setAmountInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  // Calculs
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.prix_unitaire * item.quantite,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const amountReceived = parseFloat(amountInput) || 0;
  const change = amountReceived - total;

  // Gestion clavier
  const handleKeyPress = (key) => {
    if (key === '⌫') {
      // Backspace
      setAmountInput(prev => prev.slice(0, -1));
    } else {
      // Ajout chiffre ou point
      setAmountInput(prev => prev + key);
    }
  };

  // Validation paiement
  const handleValidatePayment = async () => {
    // Vérifications
    if (cartItems.length === 0) {
      setToast({
        visible: true,
        message: 'Le panier est vide',
        type: 'error',
      });
      return;
    }

    if (amountReceived < total) {
      setToast({
        visible: true,
        message: 'Montant insuffisant',
        type: 'error',
      });
      return;
    }

    Alert.alert(
      'Confirmer le paiement',
      `Total: ${total.toFixed(2)} HTG\nReçu: ${amountReceived.toFixed(2)} HTG\nMonnaie: ${change.toFixed(2)} HTG`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Valider',
          onPress: async () => {
            setLoading(true);

            try {
              // Simuler traitement paiement
              await new Promise(resolve => setTimeout(resolve, 1500));

              // Créer vente
              const saleData = {
                id: `vente_${Date.now()}`,
                numero_vente: `V-${user?.store_id || 'STORE'}-${Date.now().toString().slice(-6)}`,
                date_vente: new Date().toISOString(),
                items: cartItems.map(item => ({
                  nom: item.nom,
                  quantite: item.quantite,
                  prix_unitaire: item.prix_unitaire,
                })),
                subtotal,
                discount,
                total,
                mode_paiement: 'especes',
                montant_recu: amountReceived,
                monnaie: change,
                vendeur_id: user?.id,
                vendeur_nom: user?.nom,
                statut: 'validee',
              };

              // Dispatch Redux
              dispatch(addSale(saleData));
              dispatch(clearCart());

              // Navigation vers Success
              navigation.replace('Success', { sale: saleData });
            } catch (error) {
              setToast({
                visible: true,
                message: 'Erreur lors du paiement',
                type: 'error',
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ThemedHeader
        title="Paiement"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Résumé paiement avec monnaie */}
        <ThemedPaymentSummary
          total={total}
          amountReceived={amountReceived}
          onAmountChange={setAmountInput}
          editable={false}
          showKeypad={false}
          paymentMode="especes"
        />

        {/* Saisie montant */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Montant reçu</Text>
          <View
            style={[
              styles.inputDisplay,
              {
                borderColor:
                  amountReceived >= total
                    ? theme.colors.primary
                    : UI_COLORS.border,
              },
            ]}
          >
            <Text style={styles.inputText}>
              {amountInput || '0'}
            </Text>
            <Text style={styles.inputCurrency}>HTG</Text>
          </View>
        </View>

        {/* Clavier numérique */}
        <View style={styles.keypadContainer}>
          <ThemedNumericKeypad
            onKeyPress={handleKeyPress}
            showDecimal
            vibrate
          />
        </View>

        {/* Bouton validation */}
        <View style={styles.actionContainer}>
          <ThemedButton
            title={
              amountReceived >= total
                ? `Valider le paiement (${change.toFixed(2)} HTG de monnaie)`
                : 'Montant insuffisant'
            }
            onPress={handleValidatePayment}
            disabled={amountReceived < total || loading}
            size="large"
          />
        </View>
      </ScrollView>

      {/* Loading overlay */}
      {loading && (
        <ThemedLoading overlay message="Traitement du paiement..." />
      )}

      {/* Toast */}
      <ThemedToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast({ ...toast, visible: false })}
        position="top"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },

  scrollContent: {
    padding: 16,
  },

  // Input montant
  inputSection: {
    marginTop: 24,
    marginBottom: 24,
  },

  inputLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: UI_COLORS.textSecondary,
    marginBottom: 8,
  },

  inputDisplay: {
    height: 64,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: UI_COLORS.surface,
  },

  inputText: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: UI_COLORS.text,
    fontFamily: 'monospace',
  },

  inputCurrency: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: UI_COLORS.textSecondary,
  },

  // Keypad
  keypadContainer: {
    marginBottom: 24,
  },

  // Action
  actionContainer: {
    marginBottom: 16,
  },
});

export default CheckoutScreen;