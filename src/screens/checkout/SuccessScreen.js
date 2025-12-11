/**
 * SGPME - SuccessScreen
 * 
 * Écran confirmation vente pour vendeur/caissier
 * 
 * Features:
 * - Message succès
 * - Aperçu ticket de caisse
 * - Bouton imprimer ticket
 * - Bouton nouvelle vente
 * - Navigation auto après 30 sec
 * - Adapté au module actif
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import {
  ThemedHeader,
  ThemedReceiptPreview,
  ThemedButton,
  ThemedCard,
  ThemedToast,
  ThemedLoading,
} from '../../components/themed';
import { UI_COLORS, FONT_SIZES } from '../../constants';

const SuccessScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { sale } = route.params || {};

  const user = useSelector(state => state.auth.user);
  const entreprise = useSelector(state => state.auth.entreprise);

  const [printing, setPrinting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const [countdown, setCountdown] = useState(30);

  // Countdown auto-navigation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          handleNewSale();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Nouvelle vente
  const handleNewSale = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Products' }],
    });
  };

  // Imprimer ticket
  const handlePrintReceipt = async () => {
    setPrinting(true);

    try {
      // Simuler impression Bluetooth
      await new Promise(resolve => setTimeout(resolve, 2000));

      setToast({
        visible: true,
        message: 'Ticket imprimé avec succès !',
        type: 'success',
      });
    } catch (error) {
      Alert.alert(
        'Erreur d\'impression',
        'Impossible d\'imprimer le ticket. Vérifiez que l\'imprimante est connectée.',
        [
          { text: 'OK' },
          {
            text: 'Réessayer',
            onPress: handlePrintReceipt,
          },
        ]
      );
    } finally {
      setPrinting(false);
    }
  };

  // Voir détails vente
  const handleViewDetails = () => {
    // Navigation vers historique avec cette vente
    navigation.navigate('History', { highlightSale: sale?.id });
  };

  if (!sale) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedCard variant="elevated" padding="lg">
          <Text style={styles.errorText}>
            Erreur : Aucune vente trouvée
          </Text>
          <ThemedButton
            title="Retour"
            onPress={() => navigation.navigate('Products')}
          />
        </ThemedCard>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ThemedHeader
        title="Vente confirmée"
        showBack={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Message succès */}
        <ThemedCard variant="elevated" padding="lg" style={styles.successCard}>
          <View style={styles.successIcon}>
            <Text style={{ fontSize: 64 }}>✓</Text>
          </View>
          <Text style={[styles.successTitle, { color: theme.colors.primary }]}>
            Vente enregistrée !
          </Text>
          <Text style={styles.successSubtitle}>
            {sale.numero_vente}
          </Text>
          <View style={styles.successInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total :</Text>
              <Text style={[styles.infoValue, { color: theme.colors.primary }]}>
                {sale.total.toFixed(2)} HTG
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Reçu :</Text>
              <Text style={styles.infoValue}>
                {sale.montant_recu.toFixed(2)} HTG
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Monnaie :</Text>
              <Text style={styles.infoValue}>
                {sale.monnaie.toFixed(2)} HTG
              </Text>
            </View>
          </View>
        </ThemedCard>

        {/* Aperçu ticket */}
        <Text style={styles.sectionTitle}>Aperçu du ticket</Text>
        <ThemedReceiptPreview
          entreprise={entreprise || {
            nom: 'Nom Entreprise',
            adresse: 'Adresse',
            telephone: 'Téléphone',
          }}
          vente={sale}
          amountReceived={sale.montant_recu}
          change={sale.monnaie}
          vendeur={user?.nom || 'Vendeur'}
          message={getReceiptMessage()}
          useAccentColor
        />

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <ThemedButton
            title={printing ? 'Impression...' : '🖨️ Imprimer le ticket'}
            onPress={handlePrintReceipt}
            disabled={printing}
            size="large"
          />

          <ThemedButton
            title={`Nouvelle vente (${countdown}s)`}
            onPress={handleNewSale}
            variant="outlined"
            style={styles.actionButton}
          />

          <Text
            style={[styles.linkButton, { color: theme.colors.primary }]}
            onPress={handleViewDetails}
          >
            Voir dans l'historique
          </Text>
        </View>
      </ScrollView>

      {/* Loading impression */}
      {printing && (
        <ThemedLoading overlay message="Impression du ticket..." />
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

  // Message ticket selon module
  function getReceiptMessage() {
    const messages = {
      pharmacie: 'Prenez soin de vous ! À bientôt.',
      restaurant: 'Bon appétit ! À la prochaine.',
      depot: 'Merci pour votre commande.',
      shop: 'Merci pour votre achat !',
    };
    return messages[theme.module] || 'Merci pour votre visite !';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },

  scrollContent: {
    padding: 16,
  },

  // Success card
  successCard: {
    alignItems: 'center',
    marginBottom: 24,
  },

  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  successTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: 8,
  },

  successSubtitle: {
    fontSize: FONT_SIZES.md,
    color: UI_COLORS.textSecondary,
    fontFamily: 'monospace',
    marginBottom: 24,
  },

  successInfo: {
    width: '100%',
    gap: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: UI_COLORS.borderLight,
  },

  infoLabel: {
    fontSize: FONT_SIZES.md,
    color: UI_COLORS.textSecondary,
  },

  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: UI_COLORS.text,
  },

  // Section
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: UI_COLORS.text,
    marginBottom: 16,
  },

  // Actions
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },

  actionButton: {
    marginTop: 4,
  },

  linkButton: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },

  errorText: {
    fontSize: FONT_SIZES.lg,
    color: UI_COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default SuccessScreen;