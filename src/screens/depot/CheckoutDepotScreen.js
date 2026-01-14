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
  Alert,
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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

  // Redux state
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const { checkoutLoading, checkoutError } = useSelector(state => state.depot);

  // Local state
  const [montantRecu, setMontantRecu] = useState('');
  const [modePaiement, setModePaiement] = useState('especes'); // especes, carte, mobile
  const [processing, setProcessing] = useState(false);

  // Diagnostic function for cart items
  const diagnoseCartItems = () => {
    console.log('=== DIAGNOSTIC CART ITEMS ===');
    
    if (!cartItems || !Array.isArray(cartItems)) {
      console.log('Cart items is not an array:', cartItems);
      return;
    }

    if (cartItems.length === 0) {
      console.log('Cart is empty');
      return;
    }

    console.log('Cart items count:', cartItems.length);
    
    cartItems.forEach((item, index) => {
      console.log(`\nDiagnostic Item ${index + 1}:`);
      console.log('  - ID:', item?.id);
      console.log('  - productId:', item?.productId);
      console.log('  - productName:', item?.productName);
      console.log('  - prixUnitaire:', item?.prixUnitaire);
      console.log('  - prixUnitaire type:', typeof item?.prixUnitaire);
      console.log('  - quantite:', item?.quantite);
      console.log('  - unitLabel:', item?.unitLabel);
      console.log('  - conditionnementType:', item?.conditionnementType);
      console.log('  - conditionnementQte:', item?.conditionnementQte);
      console.log('  - total:', item?.total);
      console.log('  - Has prixUnitaire?', 'prixUnitaire' in item);
      console.log('  - Has prixUnitaire undefined?', item?.prixUnitaire === undefined);
      console.log('  - Has prixUnitaire null?', item?.prixUnitaire === null);
      console.log('  - Object keys:', item ? Object.keys(item) : 'item is null/undefined');
    });
    
    console.log('\nCart totals:', totals);
    console.log('Total type:', typeof totals.total);
    console.log('=============================');
  };

  // Log cart items structure
  useEffect(() => {
    console.log('=== CART ITEMS DEBUG ===');
    
    if (!cartItems || !Array.isArray(cartItems)) {
      console.log('ERROR: cartItems is not an array:', cartItems);
      return;
    }

    console.log('Cart items count:', cartItems.length);
    
    if (cartItems.length === 0) {
      console.log('Cart is empty');
    } else {
      console.log('Cart items structure:');
      cartItems.forEach((item, index) => {
        if (!item) {
          console.log(`Item ${index + 1}: NULL or UNDEFINED`);
          return;
        }
        
        console.log(`Item ${index + 1}:`, {
          id: item.id,
          productId: item.productId,
          productIdType: typeof item.productId,
          productName: item.productName,
          quantite: item.quantite,
          conditionnementType: item.conditionnementType,
          conditionnementQte: item.conditionnementQte,
          prixUnitaire: item.prixUnitaire,
          prixUnitaireType: typeof item.prixUnitaire,
          prixUnitaireValid: !isNaN(Number(item.prixUnitaire)),
          total: item.total,
          totalType: typeof item.total,
          stockDisponible: item.stockDisponible,
          unitLabel: item.unitLabel
        });
      });
    }
    
    console.log('Cart totals:', totals);
    console.log('========================');
  }, [cartItems, totals]);

  // Reset on mount
  useEffect(() => {
    dispatch(resetCheckout());
    const totalValue = totals?.total || 0;
    setMontantRecu(Number(totalValue).toFixed(2)); // Auto-fill with total
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate change safely
  const montantRecuNumber = parseFloat(montantRecu) || 0;
  const totalValue = totals?.total || 0;
  const monnaie = Math.max(0, montantRecuNumber - totalValue);

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
      setMontantRecu(Number(totalValue).toFixed(2));
    }
  };

  // Quick amount buttons
  const quickAmounts = [
    totalValue,
    Math.ceil(totalValue / 100) * 100, // Round up to nearest 100
    Math.ceil(totalValue / 500) * 500, // Round up to nearest 500
    Math.ceil(totalValue / 1000) * 1000 // Round up to nearest 1000
  ].filter((amount, index, array) => 
    // Remove duplicates
    array.indexOf(amount) === index
  ).filter(amount => amount > 0); // Filter out 0 amounts

  const handleQuickAmount = (amount) => {
    setMontantRecu(Number(amount).toFixed(2));
  };

  // Prepare vente lines for API
  const prepareVenteLignes = () => {
    console.log('=== PREPARING VENTE LIGNES ===');
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.log('No cart items to prepare');
      return [];
    }
    
    const lignes = cartItems.map((item, index) => {
      // ✅ SÉCURISATION DES DONNÉES
      const produit = item?.productId ? Number(item.productId) : 0;
      const quantite = item?.quantite ? Number(item.quantite) : 0;
      const conditionnement = item?.conditionnementType || 'unite';
      const quantiteParConditionnement = item?.conditionnementQte ? Number(item.conditionnementQte) : 1;
      const prixUnitaire = item?.prixUnitaire ? Number(item.prixUnitaire) : 0;

      const ligne = {
        produit, // ⬅️ Must be number
        quantite, // Number of conditionnements
        conditionnement,
        quantite_par_conditionnement: quantiteParConditionnement,
        prix_unitaire: prixUnitaire // Price per conditionnement
      };

      console.log(`Ligne ${index + 1} prepared:`, ligne);
      return ligne;
    });

    console.log('Total lines prepared:', lignes.length);
    console.log('Sample line:', lignes.length > 0 ? lignes[0] : 'No lines');
    console.log('=============================');

    return lignes;
  };

  // Prepare vente data for API
  const prepareVenteData = () => {
    const lignes = prepareVenteLignes();
    
    if (lignes.length === 0) {
      console.log('ERROR: No lines to send');
      return null;
    }
    
    const venteData = {
      lignes,
      methode_paiement: modePaiement, // ⬅️ Django expects 'methode_paiement'
      montant_recu: Number(montantRecuNumber),
      remise: totals?.remise ? Number(totals.remise) : 0, // ⬅️ Important: send even if 0
      client: null, // Optional
      notes: `Vente Depot - ${cartItems.length} articles`
    };

    console.log('=== VENTE DATA FOR API ===');
    console.log('Vente data structure:', JSON.stringify(venteData, null, 2));
    
    if (venteData.lignes.length > 0) {
      const firstLine = venteData.lignes[0];
      console.log('First ligne check:', {
        produit: firstLine.produit,
        produitType: typeof firstLine.produit,
        quantite: firstLine.quantite,
        conditionnement: firstLine.conditionnement,
        quantite_par_conditionnement: firstLine.quantite_par_conditionnement,
        prix_unitaire: firstLine.prix_unitaire,
        prix_unitaireType: typeof firstLine.prix_unitaire,
        prix_unitaireValid: !isNaN(firstLine.prix_unitaire)
      });
    } else {
      console.log('No lines in vente data');
    }
    
    console.log('==========================');

    return venteData;
  };

  // Validate payment
  const handleValidatePayment = async () => {
    console.log('=== VALIDATE PAYMENT START ===');
    
    // Validations
    if (!montantRecu || montantRecu.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer le montant reçu');
      return;
    }

    if (montantRecuNumber < totalValue) {
      Alert.alert(
        'Montant insuffisant',
        `Le montant reçu (${montantRecuNumber.toFixed(2)} HTG) est inférieur au total (${totalValue.toFixed(2)} HTG)`
      );
      return;
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      Alert.alert('Erreur', 'Le panier est vide');
      return;
    }

    // Check if all items have required fields
    const invalidItems = cartItems.filter(item => {
      return !item?.prixUnitaire || isNaN(Number(item.prixUnitaire));
    });

    if (invalidItems.length > 0) {
      console.log('Invalid items found:', invalidItems);
      Alert.alert(
        'Erreur',
        `Certains produits n'ont pas de prix défini. Veuillez réessayer.`
      );
      diagnoseCartItems();
      return;
    }

    try {
      console.log('Starting payment validation...');
      setProcessing(true);

      // Prepare vente data
      const venteData = prepareVenteData();
      
      if (!venteData) {
        Alert.alert('Erreur', 'Impossible de préparer les données de vente');
        return;
      }
      
      console.log('Dispatching createVente with data:', venteData);

      // Create vente using Redux thunk
      const result = await dispatch(createVente(venteData)).unwrap();

      console.log('✅ Vente created successfully:', result);

      // Success!
      Toast.show({
        type: 'success',
        text1: 'Vente enregistrée !',
        text2: `Ticket N° ${result.reference || result.id}`,
        position: 'top'
      });

      // Navigate to success screen
      navigation.replace('SuccessDepot', {
        vente: result,
        monnaie: monnaie
      });

    } catch (error) {
      console.error('❌ Error creating vente:', {
        error,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Impossible d\'enregistrer la vente';
      
      if (error.response?.data) {
        console.log('Error response data:', error.response.data);
        
        // Try to extract specific error messages
        if (error.response.data.lignes) {
          // Django validation errors
          const ligneErrors = error.response.data.lignes;
          if (Array.isArray(ligneErrors) && ligneErrors.length > 0 && ligneErrors[0].produit) {
            errorMessage = `Erreur produit ID ${ligneErrors[0].produit}: ${Object.values(ligneErrors[0]).join(', ')}`;
          } else {
            errorMessage = 'Erreur dans les lignes de vente: ' + JSON.stringify(ligneErrors);
          }
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          errorMessage = Object.values(error.response.data).flat().join(', ');
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      }
      
      Alert.alert(
        'Erreur',
        errorMessage,
        [
          { 
            text: 'Debug', 
            onPress: () => diagnoseCartItems(),
            style: 'default'
          },
          { 
            text: 'OK',
            style: 'cancel'
          }
        ]
      );
    } finally {
      console.log('=== VALIDATE PAYMENT END ===');
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
          onPress: () => {
            console.log('Payment cancelled by user');
            navigation.goBack();
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Helper function to safely format price
  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return '0.00';
    }
    return Number(price).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={handleGoBack}
          disabled={processing}
        >
          <Text style={styles.backText}>
            ← Paiement
          </Text>
        </TouchableOpacity>
        
        {__DEV__ && (
          <TouchableOpacity
            style={styles.debugBtn}
            onPress={diagnoseCartItems}
            disabled={processing}
          >
            <Text style={styles.debugBtnText}>🔍 Debug</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Debug Info (dev only) */}
        {__DEV__ && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugTitle}>Debug Info:</Text>
            <Text style={styles.debugText}>Cart items: {cartItems?.length || 0}</Text>
            <Text style={styles.debugText}>Total: {formatPrice(totals?.total)} HTG</Text>
            <Text style={styles.debugText}>Remise: {formatPrice(totals?.remise)} HTG</Text>
            <Text style={styles.debugText}>Payment method: {modePaiement}</Text>
            <Text style={styles.debugText}>Montant reçu: {formatPrice(montantRecuNumber)} HTG</Text>
            <Text style={styles.debugText}>Monnaie: {formatPrice(monnaie)} HTG</Text>
          </View>
        )}

        {/* Payment Summary */}
        <PaymentSummary
          total={totalValue}
          montantRecu={montantRecuNumber}
          monnaie={monnaie}
        />

        {/* Quick amounts */}
        {quickAmounts.length > 0 && (
          <View style={styles.quickAmountsContainer}>
            <Text style={styles.quickAmountsLabel}>
              Montants rapides:
            </Text>
            <View style={styles.quickAmounts}>
              {quickAmounts.slice(0, 4).map((amount, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.quickAmountBtn,
                    { 
                      backgroundColor: montantRecuNumber === amount ? '#404040' : '#FFF'
                    }
                  ]}
                  onPress={() => handleQuickAmount(amount)}
                  disabled={processing}
                >
                  <Text 
                    style={[
                      styles.quickAmountText,
                      { color: montantRecuNumber === amount ? '#FFF' : '#404040' }
                    ]}
                  >
                    {formatPrice(amount)} HTG
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Numeric Keypad */}
        <NumericKeypad
          value={montantRecu}
          onPress={handleNumberPress}
          disabled={processing}
        />

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          <Text style={styles.paymentMethodsLabel}>
            Mode de paiement:
          </Text>
          <View style={styles.paymentMethods}>
            {/* Cash */}
            <TouchableOpacity
              style={[
                styles.paymentMethodBtn,
                modePaiement === 'especes' && styles.paymentMethodBtnActive
              ]}
              onPress={() => handlePaymentMethodSelect('especes')}
              disabled={processing}
            >
              <Text style={styles.paymentMethodIcon}>💵</Text>
              <Text 
                style={[
                  styles.paymentMethodText,
                  modePaiement === 'especes' && styles.paymentMethodTextActive
                ]}
              >
                Espèces
              </Text>
            </TouchableOpacity>

            {/* Card */}
            <TouchableOpacity
              style={[
                styles.paymentMethodBtn,
                modePaiement === 'carte' && styles.paymentMethodBtnActive
              ]}
              onPress={() => handlePaymentMethodSelect('carte')}
              disabled={processing}
            >
              <Text style={styles.paymentMethodIcon}>💳</Text>
              <Text 
                style={[
                  styles.paymentMethodText,
                  modePaiement === 'carte' && styles.paymentMethodTextActive
                ]}
              >
                Carte
              </Text>
            </TouchableOpacity>

            {/* Mobile */}
            <TouchableOpacity
              style={[
                styles.paymentMethodBtn,
                modePaiement === 'mobile' && styles.paymentMethodBtnActive
              ]}
              onPress={() => handlePaymentMethodSelect('mobile')}
              disabled={processing}
            >
              <Text style={styles.paymentMethodIcon}>📱</Text>
              <Text 
                style={[
                  styles.paymentMethodText,
                  modePaiement === 'mobile' && styles.paymentMethodTextActive
                ]}
              >
                Mobile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cart Summary */}
        <View style={styles.cartSummary}>
          <Text style={styles.cartSummaryTitle}>
            Résumé panier ({cartItems?.length || 0} article{cartItems?.length !== 1 ? 's' : ''}):
          </Text>
          
          {!cartItems || !Array.isArray(cartItems) || cartItems.length === 0 ? (
            <Text style={styles.emptyCartText}>Panier vide</Text>
          ) : (
            <>
              {cartItems.map((item, index) => {
                // ✅ VALEURS PAR DÉFAUT POUR ÉVITER LES ERREURS
                const prixUnitaire = item?.prixUnitaire !== undefined ? item.prixUnitaire : 0;
                const quantite = item?.quantite !== undefined ? item.quantite : 0;
                const unitLabel = item?.unitLabel || 'unités';
                const productName = item?.productName || 'Produit inconnu';
                const totalLigne = Number(prixUnitaire) * Number(quantite);
                const isValidPrix = !isNaN(Number(prixUnitaire));

                return (
                  <View key={item?.id || `item-${index}`} style={styles.cartItemRow}>
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemIndex}>{index + 1}.</Text>
                      <Text style={styles.cartItemName} numberOfLines={1}>
                        {productName}
                      </Text>
                    </View>
                    <View style={styles.cartItemDetails}>
                      <Text style={[
                        styles.cartItemDetailText,
                        !isValidPrix && styles.cartItemError
                      ]}>
                        {quantite} {unitLabel} × {formatPrice(prixUnitaire)} HTG
                      </Text>
                      {!isValidPrix && (
                        <Text style={styles.cartItemWarning}>⚠️ Prix invalide</Text>
                      )}
                    </View>
                  </View>
                );
              })}
              
              <View style={styles.cartTotalRow}>
                <Text style={styles.cartTotalLabel}>Total panier:</Text>
                <Text style={styles.cartTotalAmount}>
                  {formatPrice(totals?.total)} HTG
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Validate Button */}
        <TouchableOpacity
          style={[
            styles.validateBtn,
            (processing || montantRecuNumber < totalValue || !cartItems?.length) && styles.validateBtnDisabled
          ]}
          onPress={handleValidatePayment}
          disabled={processing || montantRecuNumber < totalValue || !cartItems?.length}
          activeOpacity={0.8}
        >
          {processing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFF" size="small" />
              <Text style={styles.loadingText}>Traitement...</Text>
            </View>
          ) : (
            <Text style={styles.validateBtnText}>
              ✅ Valider le paiement
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Toast */}
      <Toast />
    </SafeAreaView>
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
    justifyContent: 'space-between',
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
  debugBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#2196F3',
    borderRadius: 6
  },
  debugBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF'
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30
  },
  // Debug styles
  debugContainer: {
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFD54F',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF8F00',
    marginBottom: 5
  },
  debugText: {
    fontSize: 12,
    color: '#FF6F00',
    marginBottom: 2
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
    fontSize: 14,
    fontWeight: '700'
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
  paymentMethodBtnActive: {
    backgroundColor: '#404040',
    borderColor: '#404040'
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
  paymentMethodTextActive: {
    color: '#FFF'
  },
  // Cart summary
  cartSummary: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 20
  },
  cartSummaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 10
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  cartItemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  cartItemIndex: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 5
  },
  cartItemName: {
    flex: 1,
    fontSize: 14,
    color: '#666'
  },
  cartItemDetails: {
    alignItems: 'flex-end'
  },
  cartItemDetailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#404040'
  },
  cartItemError: {
    color: '#f44336'
  },
  cartItemWarning: {
    fontSize: 10,
    color: '#FF9800',
    marginTop: 2
  },
  emptyCartText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10
  },
  cartTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 5
  },
  cartTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040'
  },
  cartTotalAmount: {
    fontSize: 18,
    fontWeight: '800',
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  loadingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  validateBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default CheckoutDepotScreen;