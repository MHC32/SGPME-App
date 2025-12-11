/**
 * SGPME - ThemedReceiptPreview
 * 
 * Aperçu ticket de caisse avant impression pour VENDEUR POS
 * Format ticket standard 80mm
 * 
 * Features:
 * - Logo entreprise (ou nom)
 * - Informations entreprise
 * - Numéro de vente
 * - Date/heure
 * - Liste articles (nom, qté, prix, total)
 * - Sous-total, remise, total
 * - Mode de paiement
 * - Monnaie rendue (si applicable)
 * - Message de remerciement
 * - Style monospace (ticket thermique)
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { formatCurrency, formatDate } from '../../utils/helpers';

/**
 * ThemedReceiptPreview Component
 * 
 * Aperçu ticket de caisse adapté au module actif
 * Le nom de l'entreprise utilise la couleur du module
 * 
 * @param {Object} props
 * @param {Object} props.entreprise - {nom, adresse, telephone, nif}
 * @param {Object} props.vente - {numero_vente, date_vente, items, subtotal, discount, total, mode_paiement}
 * @param {number} props.amountReceived - Montant reçu (optionnel)
 * @param {number} props.change - Monnaie rendue (optionnel)
 * @param {string} props.vendeur - Nom du vendeur
 * @param {string} props.message - Message de remerciement custom
 * @param {boolean} props.useAccentColor - Utiliser couleur module pour le nom (défaut: true)
 * @param {Object} props.style - Style custom
 */
const ThemedReceiptPreview = ({
  entreprise,
  vente,
  amountReceived,
  change,
  vendeur,
  message = 'Merci pour votre visite !',
  useAccentColor = true,
  style,
}) => {
  const theme = useTheme();

  if (!vente) return null;

  // Largeur standard ticket 80mm ≈ 300px
  const TICKET_WIDTH = 300;

  // Couleur accent pour le nom de l'entreprise
  const entrepriseNameColor = useAccentColor 
    ? theme.colors.primary 
    : UI_COLORS.text;

  return (
    <ScrollView
      style={[styles.scrollContainer, style]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.ticket, { width: TICKET_WIDTH }]}>
        {/* Header : Entreprise */}
        <View style={styles.header}>
          <Text 
            style={[
              styles.entrepriseName,
              { color: entrepriseNameColor } // 🎨 Adapté au module
            ]}
          >
            {entreprise?.nom || 'Nom Entreprise'}
          </Text>
          {entreprise?.adresse && (
            <Text style={styles.entrepriseInfo}>{entreprise.adresse}</Text>
          )}
          {entreprise?.telephone && (
            <Text style={styles.entrepriseInfo}>
              Tél: {entreprise.telephone}
            </Text>
          )}
          {entreprise?.nif && (
            <Text style={styles.entrepriseInfo}>NIF: {entreprise.nif}</Text>
          )}
        </View>

        {/* Divider */}
        <Text style={styles.divider}>{'='.repeat(32)}</Text>

        {/* Infos vente */}
        <View style={styles.saleInfo}>
          <Text style={styles.infoRow}>
            N°: {vente.numero_vente}
          </Text>
          <Text style={styles.infoRow}>
            Date: {formatDate(vente.date_vente, 'DD/MM/YYYY HH:mm')}
          </Text>
          {vendeur && (
            <Text style={styles.infoRow}>Vendeur: {vendeur}</Text>
          )}
        </View>

        {/* Divider */}
        <Text style={styles.divider}>{'='.repeat(32)}</Text>

        {/* Articles */}
        <View style={styles.items}>
          {/* Header colonnes */}
          <View style={styles.itemHeader}>
            <Text style={[styles.itemColumn, styles.itemNameHeader]}>
              Article
            </Text>
            <Text style={[styles.itemColumn, styles.itemQtyHeader]}>Qté</Text>
            <Text style={[styles.itemColumn, styles.itemPriceHeader]}>
              P.U.
            </Text>
            <Text style={[styles.itemColumn, styles.itemTotalHeader]}>
              Total
            </Text>
          </View>

          {/* Ligne séparation */}
          <Text style={styles.thinDivider}>{'-'.repeat(32)}</Text>

          {/* Liste articles */}
          {vente.items?.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text
                style={[styles.itemColumn, styles.itemName]}
                numberOfLines={2}
              >
                {item.nom}
              </Text>
              <Text style={[styles.itemColumn, styles.itemQty]}>
                {item.quantite}
              </Text>
              <Text style={[styles.itemColumn, styles.itemPrice]}>
                {formatCurrency(item.prix_unitaire, false)}
              </Text>
              <Text style={[styles.itemColumn, styles.itemTotal]}>
                {formatCurrency(item.quantite * item.prix_unitaire, false)}
              </Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <Text style={styles.divider}>{'='.repeat(32)}</Text>

        {/* Totaux */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(vente.subtotal || vente.total)}
            </Text>
          </View>

          {vente.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Remise:</Text>
              <Text style={[styles.totalValue, styles.discountValue]}>
                - {formatCurrency(vente.discount)}
              </Text>
            </View>
          )}

          <View style={[styles.totalRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>TOTAL:</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(vente.total)}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <Text style={styles.divider}>{'='.repeat(32)}</Text>

        {/* Paiement */}
        <View style={styles.payment}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Mode:</Text>
            <Text style={styles.paymentValue}>
              {vente.mode_paiement === 'especes'
                ? 'Espèces'
                : vente.mode_paiement === 'carte'
                ? 'Carte bancaire'
                : vente.mode_paiement === 'mobile'
                ? 'Mobile Money'
                : vente.mode_paiement}
            </Text>
          </View>

          {amountReceived !== undefined && vente.mode_paiement === 'especes' && (
            <>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Reçu:</Text>
                <Text style={styles.paymentValue}>
                  {formatCurrency(amountReceived)}
                </Text>
              </View>
              {change !== undefined && change > 0 && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Monnaie:</Text>
                  <Text style={styles.paymentValue}>
                    {formatCurrency(change)}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        {/* Divider */}
        <Text style={styles.divider}>{'='.repeat(32)}</Text>

        {/* Footer : Message */}
        <View style={styles.footer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.footerInfo}>
            Conservez ce ticket
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: UI_COLORS.backgroundSecondary,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  ticket: {
    backgroundColor: UI_COLORS.white,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  entrepriseName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  entrepriseInfo: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    textAlign: 'center',
    fontFamily: 'monospace',
  },

  // Dividers
  divider: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'monospace',
  },
  thinDivider: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'monospace',
  },

  // Sale info
  saleInfo: {
    marginBottom: 4,
  },
  infoRow: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    fontFamily: 'monospace',
    marginBottom: 2,
  },

  // Items
  items: {
    marginBottom: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  itemColumn: {
    fontSize: FONT_SIZES.xs,
    fontFamily: 'monospace',
  },
  itemNameHeader: {
    flex: 3,
    fontWeight: '700',
    color: UI_COLORS.textSecondary,
  },
  itemQtyHeader: {
    flex: 1,
    fontWeight: '700',
    color: UI_COLORS.textSecondary,
    textAlign: 'center',
  },
  itemPriceHeader: {
    flex: 1.5,
    fontWeight: '700',
    color: UI_COLORS.textSecondary,
    textAlign: 'right',
  },
  itemTotalHeader: {
    flex: 1.5,
    fontWeight: '700',
    color: UI_COLORS.textSecondary,
    textAlign: 'right',
  },
  itemName: {
    flex: 3,
    color: UI_COLORS.text,
  },
  itemQty: {
    flex: 1,
    color: UI_COLORS.text,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1.5,
    color: UI_COLORS.text,
    textAlign: 'right',
  },
  itemTotal: {
    flex: 1.5,
    color: UI_COLORS.text,
    textAlign: 'right',
    fontWeight: '600',
  },

  // Totaux
  totals: {
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  totalValue: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.text,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  discountValue: {
    color: '#10B981',
  },
  grandTotalRow: {
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: UI_COLORS.borderLight,
  },
  grandTotalLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: UI_COLORS.text,
    fontFamily: 'monospace',
  },
  grandTotalValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: UI_COLORS.text,
    fontFamily: 'monospace',
  },

  // Paiement
  payment: {
    marginBottom: 4,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  paymentLabel: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  paymentValue: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.text,
    fontWeight: '600',
    fontFamily: 'monospace',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 8,
  },
  message: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: UI_COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  footerInfo: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

export default ThemedReceiptPreview;