/**
 * SGPME - ThemedSaleCard
 * 
 * Carte de vente dans la liste historique pour VENDEUR POS
 * Affichage compact : numéro, date, total, nombre d'articles
 * 
 * Features:
 * - Numéro de vente
 * - Date/heure formatée
 * - Total HTG (GROS)
 * - Nombre d'articles
 * - Statut (validée/annulée)
 * - Icône mode de paiement
 * - Tap pour détails
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES, VENTE_STATUT_COLORS } from '../../constants';
import { formatCurrency, formatDate, formatRelativeDate } from '../../utils/helpers';

/**
 * ThemedSaleCard Component
 * 
 * @param {Object} props
 * @param {Object} props.sale - Vente {id, numero_vente, date_vente, total, nb_articles, statut, mode_paiement}
 * @param {Function} props.onPress - Callback tap (saleId)
 * @param {boolean} props.showRelativeDate - Afficher date relative ("Il y a 2h")
 * @param {Object} props.style - Style custom
 */
const ThemedSaleCard = ({
  sale,
  onPress,
  showRelativeDate = true,
  style,
}) => {
  const theme = useTheme();

  if (!sale) return null;

  const handlePress = () => {
    onPress?.(sale.id);
  };

  // Formatage date
  const displayDate = showRelativeDate 
    ? formatRelativeDate(sale.date_vente)
    : formatDate(sale.date_vente, 'DD/MM/YYYY HH:mm');

  // Couleur statut
  const statusColor = VENTE_STATUT_COLORS[sale.statut] || UI_COLORS.textSecondary;

  // Icône mode de paiement
  const paymentIcons = {
    especes: '💵',
    carte: '💳',
    mobile: '📱',
    credit: '📝',
    cheque: '🏦',
  };
  const paymentIcon = paymentIcons[sale.mode_paiement] || '💰';

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Header : Numéro + Date */}
      <View style={styles.header}>
        <Text style={styles.numero} numberOfLines={1}>
          {sale.numero_vente}
        </Text>
        <Text style={styles.date}>{displayDate}</Text>
      </View>

      {/* Body : Total + Articles */}
      <View style={styles.body}>
        <View style={styles.leftSection}>
          <Text style={[styles.total, { color: theme.colors.primary }]}>
            {formatCurrency(sale.total)}
          </Text>
          <Text style={styles.articles}>
            {sale.nb_articles || 0} article{(sale.nb_articles || 0) > 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {/* Icône paiement */}
          <View style={styles.paymentBadge}>
            <Text style={styles.paymentIcon}>{paymentIcon}</Text>
          </View>

          {/* Statut */}
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {sale.statut === 'validee' ? 'Validée' : sale.statut === 'annulee' ? 'Annulée' : 'En cours'}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer : Client (optionnel) */}
      {sale.client_nom && (
        <View style={styles.footer}>
          <Text style={styles.clientLabel}>Client: </Text>
          <Text style={styles.clientName} numberOfLines={1}>
            {sale.client_nom}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI_COLORS.surface,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: UI_COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  numero: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: UI_COLORS.text,
    fontFamily: 'monospace',
    flex: 1,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    marginLeft: 8,
  },

  // Body
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {
    flex: 1,
  },
  total: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  articles: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

  // Payment badge
  paymentBadge: {
    marginBottom: 6,
  },
  paymentIcon: {
    fontSize: 24,
  },

  // Status badge
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: UI_COLORS.borderLight,
  },
  clientLabel: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
  },
  clientName: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: UI_COLORS.text,
    flex: 1,
  },
});

export default ThemedSaleCard;