/**
 * CHECKOUT DEPOT SCREEN
 * 
 * Écran de paiement du module Depot
 * Avec clavier numérique, modes de paiement et validation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import Toast from 'react-native-toast-message';

// Redux
import {
  createVente,
  selectCartItems,
  selectCartTotals,
  resetCheckout
} from '../../redux/slices/depotSlice';

// Components
import NumericKeypad from '../../components/themed/ThemedNumericKeypad';
import PaymentSummary from '../../components/themed/ThemedPaymentSummary';

// Service
import { depotService } from '../../services/depot.service';

const CheckoutDepotScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Redux state
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const { checkoutLoading, checkoutError } = useSelector(state => state.depot);

  // Local state
  const [montantRecu, setMontantRecu] = useState('');
  const [modePaiement, setModePaiement] = useState('especes'); // especes, carte, mobile
  const [processing, setProcessing] = useState(false);

  // Reset on mount
  useEffect(() => {
    dispatch(resetCheckout());
    setMontantRecu('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate change
  const montantRecuNumber = parseFloat(montantRecu) || 0;
  const monnaie = montantRecuNumber - totals.total;

  // Handle numeric input
  const handleNumberPress = (value) => {
    if (value === 'backspace') {
      setMontantRecu(prev => prev.slice(0, -1));
    } else if (value === '.') {
      if (!montantRecu.includes('.')) {
        setMontantRecu(prev => prev + '.');
      }
    } else {
      setMontantRecu(prev => prev + value);
    }
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setModePaiement(method);
    
    // Auto-fill exact amount for card/mobile
    if (method === 'carte' || method === 'mobile') {
      setMontantRecu(totals.total.toFixed(2));
    }
  };

  // Quick amount buttons
  const quickAmounts = [
    totals.total,
    Math.ceil(totals.total / 100) * 100, // Round up to nearest 100
    Math.ceil(totals.total / 500) * 500, // Round up to nearest 500
    Math.ceil(totals.total / 1000) * 1000 // Round up to nearest 1000
  ];

  const handleQuickAmount = (amount) => {
    setMontantRecu(amount.toFixed(2));
  };

  // Validate payment
  const handleValidatePayment = async () => {
    // Validations
    if (!montantRecu) {
      Alert.alert('Erreur', 'Veuillez entrer le montant reçu');
      return;
    }

    if (montantRecuNumber < totals.total) {
      Alert.alert(
        'Montant insuffisant',
        `Le montant reçu (${montantRecuNumber.toFixed(2)} HTG) est inférieur au total (${totals.total.toFixed(2)} HTG)`
      );
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Erreur', 'Le panier est vide');
      return;
    }

    try {
      setProcessing(true);

      // Prepare vente data
      const lignes = depotService.prepareVenteLignes(cartItems);

      const venteData = {
        lignes,
        mode_paiement: modePaiement,
        montant_recu: montantRecuNumber,
        notes: `Vente Depot - ${cartItems.length} articles`
      };

      // Create vente
      const result = await dispatch(createVente(venteData)).unwrap();

      // Success!
      Toast.show({
        type: 'success',
        text1: 'Vente enregistrée !',
        text2: `Ticket N° ${result.numero || result.id}`,
        position: 'top'
      });

      // Navigate to success screen
      navigation.replace('SuccessDepot', {
        vente: result,
        monnaie: monnaie
      });

    } catch (error) {
      console.error('Error creating vente:', error);
      
      Alert.alert(
        'Erreur',
        error.message || 'Impossible d\'enregistrer la vente',
        [
          { text: 'OK' }
        ]
      );
    } finally {
      setProcessing(false);
    }
  };

  // Go back
  const handleGoBack = () => {
    Alert.alert(
      'Annuler le paiement',
      'Êtes-vous sûr de vouloir annuler le paiement ?',
      [
        { text: 'Non', style: 'cancel' },
        { 
          text: 'Oui', 
          onPress: () => navigation.goBack(),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={handleGoBack}
          disabled={processing}
        >
          <Text style={[styles.backText, { color: theme.primary }]}>
            ← Paiement
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Summary */}
        <PaymentSummary
          total={totals.total}
          montantRecu={montantRecuNumber}
          monnaie={monnaie}
        />

        {/* Quick amounts */}
        <View style={styles.quickAmountsContainer}>
          <Text style={[styles.quickAmountsLabel, { color: theme.textSecondary }]}>
            Montants rapides:
          </Text>
          <View style={styles.quickAmounts}>
            {quickAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickAmountBtn,
                  { 
                    borderColor: theme.border,
                    backgroundColor: montantRecuNumber === amount ? theme.primary : '#FFF'
                  }
                ]}
                onPress={() => handleQuickAmount(amount)}
                disabled={processing}
              >
                <Text 
                  style={[
                    styles.quickAmountText,
                    { color: montantRecuNumber === amount ? '#FFF' : theme.textPrimary }
                  ]}
                >
                  {amount.toFixed(0)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Numeric Keypad */}
        <NumericKeypad
          value={montantRecu}
          onPress={handleNumberPress}
          disabled={processing}
        />

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          <Text style={[styles.paymentMethodsLabel, { color: theme.textSecondary }]}>
            Mode de paiement:
          </Text>
          <View style={styles.paymentMethods}>
            {/* Cash */}
            <TouchableOpacity
              style={[
                styles.paymentMethodBtn,
                { borderColor: theme.border },
                modePaiement === 'especes' && { 
                  backgroundColor: theme.primary,
                  borderColor: theme.primary
                }
              ]}
              onPress={() => handlePaymentMethodSelect('especes')}
              disabled={processing}
            >
              <Text style={styles.paymentMethodIcon}>💵</Text>
              <Text 
                style={[
                  styles.paymentMethodText,
                  { color: modePaiement === 'especes' ? '#FFF' : theme.textPrimary }
                ]}
              >
                Espèces
              </Text>
            </TouchableOpacity>

            {/* Card */}
            <TouchableOpacity
              style={[
                styles.paymentMethodBtn,
                { borderColor: theme.border },
                modePaiement === 'carte' && { 
                  backgroundColor: theme.primary,
                  borderColor: theme.primary
                }
              ]}
              onPress={() => handlePaymentMethodSelect('carte')}
              disabled={processing}
            >
              <Text style={styles.paymentMethodIcon}>💳</Text>
              <Text 
                style={[
                  styles.paymentMethodText,
                  { color: modePaiement === 'carte' ? '#FFF' : theme.textPrimary }
                ]}
              >
                Carte
              </Text>
            </TouchableOpacity>

            {/* Mobile */}
            <TouchableOpacity
              style={[
                styles.paymentMethodBtn,
                { borderColor: theme.border },
                modePaiement === 'mobile' && { 
                  backgroundColor: theme.primary,
                  borderColor: theme.primary
                }
              ]}
              onPress={() => handlePaymentMethodSelect('mobile')}
              disabled={processing}
            >
              <Text style={styles.paymentMethodIcon}>📱</Text>
              <Text 
                style={[
                  styles.paymentMethodText,
                  { color: modePaiement === 'mobile' ? '#FFF' : theme.textPrimary }
                ]}
              >
                Mobile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Validate Button */}
        <TouchableOpacity
          style={[
            styles.validateBtn,
            { backgroundColor: theme.primary },
            (processing || montantRecuNumber < totals.total) && styles.validateBtnDisabled
          ]}
          onPress={handleValidatePayment}
          disabled={processing || montantRecuNumber < totals.total}
          activeOpacity={0.8}
        >
          {processing ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.validateBtnText}>
              ✅ Valider le paiement
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

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
  scrollContent: {
    padding: 15,
    paddingBottom: 30
  },
  quickAmountsContainer: {
    marginBottom: 20
  },
  quickAmountsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  quickAmountBtn: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  quickAmountText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#404040'
  },
  paymentMethodsContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  paymentMethodsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 10
  },
  paymentMethodBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  paymentMethodIcon: {
    fontSize: 28,
    marginBottom: 5
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#404040'
  },
  validateBtn: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#404040',
    marginTop: 10
  },
  validateBtnDisabled: {
    opacity: 0.5
  },
  validateBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default CheckoutDepotScreen;