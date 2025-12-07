/**
 * SGPME - Themed Product Card
 * 
 * Card produit qui s'adapte automatiquement au module business
 * Layout et affichage différent pour pharmacie/restaurant/depot/shop
 * Optimisé VENDEUR (bouton + rapide, stock visible, prix gros)
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from './ThemeProvider';
import { formatCurrency, getStockStatus } from '../utils/helpers';

/**
 * ThemedProductCard Component
 * 
 * @param {object} props
 * @param {object} props.product - Produit à afficher
 * @param {function} props.onPress - Callback au tap sur la card
 * @param {function} props.onAddToCart - Callback bouton "+"
 * @param {boolean} props.showQuickAdd - Afficher bouton + rapide
 */
export const ThemedProductCard = ({
  product,
  onPress,
  onAddToCart,
  showQuickAdd = true,
}) => {
  const theme = useTheme();
  const layout = theme.layout;
  
  // Status du stock
  const stockStatus = getStockStatus(product);
  
  // Render selon le style de card
  const renderCardContent = () => {
    switch (layout.productCardStyle) {
      case 'medical':
        return renderMedicalCard();
      case 'appetizing':
        return renderAppetizingCard();
      case 'wholesale':
        return renderWholesaleCard();
      case 'modern':
        return renderModernCard();
      default:
        return renderMedicalCard();
    }
  };

  // ========================================================================
  // 💊 PHARMACIE - Style médical
  // ========================================================================
  const renderMedicalCard = () => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.sm,
        },
        theme.shadows.sm,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image */}
      {layout.showImage && product.image && (
        <Image
          source={{ uri: product.image }}
          style={[
            styles.image,
            {
              width: layout.productImageSize,
              height: layout.productImageSize,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
          resizeMode="contain"
        />
      )}

      {/* Info */}
      <View style={styles.info}>
        {/* Nom + Dosage */}
        <Text
          style={[
            styles.name,
            { color: theme.colors.text, fontSize: 14 },
          ]}
          numberOfLines={2}
        >
          {product.nom}
        </Text>

        {/* Code */}
        {layout.showCode && product.code && (
          <Text
            style={[
              styles.code,
              { color: theme.colors.textLight, fontSize: 11 },
            ]}
          >
            {product.code}
          </Text>
        )}

        {/* Stock badge */}
        {layout.showStockBadge && (
          <View
            style={[
              styles.stockBadge,
              { backgroundColor: stockStatus.color + '20' },
            ]}
          >
            <View
              style={[
                styles.stockDot,
                { backgroundColor: stockStatus.color },
              ]}
            />
            <Text
              style={[
                styles.stockText,
                { color: stockStatus.color, fontSize: 11 },
              ]}
            >
              Stock: {product.stock_actuel}
            </Text>
          </View>
        )}

        {/* Prix */}
        <Text
          style={[
            styles.price,
            {
              color: theme.colors.primary,
              fontSize: 16,
              fontWeight: 'bold',
            },
          ]}
        >
          {formatCurrency(product.prix_vente)}
        </Text>
      </View>

      {/* Bouton + rapide */}
      {showQuickAdd && layout.showQuickAdd && (
        <TouchableOpacity
          style={[
            styles.quickAddButton,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
        >
          <Text style={{ color: theme.colors.textInverse, fontSize: 20 }}>
            +
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  // ========================================================================
  // 🍽️ RESTAURANT - Style appétissant (1 colonne, image grande)
  // ========================================================================
  const renderAppetizingCard = () => (
    <TouchableOpacity
      style={[
        styles.cardLarge,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
        },
        theme.shadows.sm,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image GRANDE */}
      {layout.showImage && product.image && (
        <Image
          source={{ uri: product.image }}
          style={[
            styles.imageLarge,
            {
              width: '100%',
              height: layout.productImageSize,
              borderRadius: theme.borderRadius.md,
            },
          ]}
          resizeMode="cover"
        />
      )}

      <View style={styles.infoRow}>
        <View style={{ flex: 1 }}>
          {/* Nom plat */}
          <Text
            style={[
              styles.nameLarge,
              { color: theme.colors.text, fontSize: 16, fontWeight: '600' },
            ]}
            numberOfLines={1}
          >
            {product.nom}
          </Text>

          {/* Disponibilité */}
          {layout.showStockBadge && (
            <View style={styles.availabilityRow}>
              <View
                style={[
                  styles.availabilityDot,
                  { backgroundColor: stockStatus.color },
                ]}
              />
              <Text
                style={[
                  styles.availabilityText,
                  { color: stockStatus.color, fontSize: 12 },
                ]}
              >
                {stockStatus.label}
              </Text>
            </View>
          )}
        </View>

        {/* Prix + Bouton */}
        <View style={styles.priceColumn}>
          <Text
            style={[
              styles.priceLarge,
              {
                color: theme.colors.primary,
                fontSize: 20,
                fontWeight: 'bold',
              },
            ]}
          >
            {formatCurrency(product.prix_vente)}
          </Text>

          {showQuickAdd && layout.showQuickAdd && (
            <TouchableOpacity
              style={[
                styles.quickAddButtonLarge,
                {
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.borderRadius.sm,
                  marginTop: theme.spacing.xs,
                },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                onAddToCart && onAddToCart(product);
              }}
            >
              <Text style={{ color: theme.colors.textInverse, fontSize: 18 }}>
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // ========================================================================
  // 📦 DÉPÔT - Style wholesale (focus quantités/prix gros)
  // ========================================================================
  const renderWholesaleCard = () => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.sm,
        },
        theme.shadows.sm,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image */}
      {layout.showImage && product.image && (
        <Image
          source={{ uri: product.image }}
          style={[
            styles.image,
            {
              width: layout.productImageSize,
              height: layout.productImageSize,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
          resizeMode="contain"
        />
      )}

      <View style={styles.info}>
        {/* Nom */}
        <Text
          style={[
            styles.name,
            { color: theme.colors.text, fontSize: 14 },
          ]}
          numberOfLines={2}
        >
          {product.nom}
        </Text>

        {/* Stock (TRÈS visible pour depot) */}
        {layout.showStock && (
          <Text
            style={[
              styles.stockLarge,
              {
                color: stockStatus.color,
                fontSize: 13,
                fontWeight: '600',
              },
            ]}
          >
            📦 {product.stock_actuel} en stock
          </Text>
        )}

        {/* Prix */}
        <Text
          style={[
            styles.price,
            {
              color: theme.colors.primary,
              fontSize: 16,
              fontWeight: 'bold',
            },
          ]}
        >
          {formatCurrency(product.prix_vente)}
        </Text>
      </View>

      {/* Bouton + */}
      {showQuickAdd && layout.showQuickAdd && (
        <TouchableOpacity
          style={[
            styles.quickAddButton,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
        >
          <Text style={{ color: theme.colors.textInverse, fontSize: 20 }}>
            +
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  // ========================================================================
  // 👕 SHOP - Style moderne e-commerce
  // ========================================================================
  const renderModernCard = () => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.sm,
        },
        theme.shadows.sm,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image */}
      {layout.showImage && product.image && (
        <Image
          source={{ uri: product.image }}
          style={[
            styles.image,
            {
              width: layout.productImageSize,
              height: layout.productImageSize,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
          resizeMode="cover"
        />
      )}

      <View style={styles.info}>
        {/* Nom */}
        <Text
          style={[
            styles.name,
            { color: theme.colors.text, fontSize: 14 },
          ]}
          numberOfLines={2}
        >
          {product.nom}
        </Text>

        {/* Stock badge */}
        {layout.showStockBadge && (
          <View
            style={[
              styles.stockBadgeSmall,
              { backgroundColor: stockStatus.color + '20' },
            ]}
          >
            <Text
              style={[
                styles.stockTextSmall,
                { color: stockStatus.color, fontSize: 10 },
              ]}
            >
              {stockStatus.label}
            </Text>
          </View>
        )}

        {/* Prix */}
        <Text
          style={[
            styles.price,
            {
              color: theme.colors.primary,
              fontSize: 16,
              fontWeight: 'bold',
            },
          ]}
        >
          {formatCurrency(product.prix_vente)}
        </Text>
      </View>

      {/* Bouton + */}
      {showQuickAdd && layout.showQuickAdd && (
        <TouchableOpacity
          style={[
            styles.quickAddButton,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.sm,
            },
          ]}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
        >
          <Text style={{ color: theme.colors.textInverse, fontSize: 20 }}>
            +
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return renderCardContent();
};

const styles = StyleSheet.create({
  // Grille 2 colonnes
  card: {
    position: 'relative',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
  code: {
    marginBottom: 4,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  stockText: {
    fontWeight: '500',
  },
  stockBadgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  stockTextSmall: {
    fontWeight: '600',
  },
  stockLarge: {
    marginVertical: 4,
  },
  price: {
    marginTop: 4,
  },
  quickAddButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 1 colonne (restaurant)
  cardLarge: {
    marginBottom: 12,
  },
  imageLarge: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameLarge: {
    marginBottom: 4,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  availabilityText: {
    fontWeight: '500',
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  priceLarge: {
    marginBottom: 4,
  },
  quickAddButtonLarge: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemedProductCard;