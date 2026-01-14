/**
 * PRODUCT CARD DEPOT - AVEC CONDITIONNEMENT CARDS
 * 
 * Card produit qui affiche chaque conditionnement dans sa propre card
 * avec sélecteur de quantité
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import { ConditionnementCard } from './ConditionnementCard';

// Utils
import {
  transformPrixVenteOptions,
  getStockBadge
} from '../../utils/depot/conditionnementHelpers';

/**
 * ProductCardDepot Component
 */
export const ProductCardDepot = ({
  product,
  onAddConditionnement,
  style
}) => {
  const theme = useTheme();

  // Transform prix_vente_options to conditionnements
  const conditionnements = useMemo(() => {
    if (!product.prix_vente_options || product.prix_vente_options.length === 0) {
      // ✅ Fallback à l'unité si pas de conditionnements
      if (product.prix_vente && product.stock_actuel) {
        return [{
          type: 'unite',
          qte: 1,
          prix: product.prix_vente,
          stock: product.stock_actuel,
          label: 'Unité',
          emoji: '📦'
        }];
      }
      return [];
    }
    return transformPrixVenteOptions(product.prix_vente_options);
  }, [product.prix_vente_options, product.prix_vente, product.stock_actuel]);

  // Get stock badge
  const stockBadge = useMemo(() => {
    if (conditionnements.length === 0) return null;
    
    const firstStock = conditionnements[0]?.stock || 0;
    return getStockBadge(firstStock, 10);
  }, [conditionnements]);

  // Si pas de conditionnements du tout
  if (conditionnements.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            borderRadius: theme.borderRadius.md
          },
          theme.shadows.sm,
          style
        ]}
      >
        <View style={styles.noDataContainer}>
          <Icon name="alert-circle-outline" size={40} color="#999" />
          <Text style={styles.noDataText}>
            Produit non disponible
          </Text>
          <Text style={styles.noDataSubtext}>
            Prix ou stock non défini
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.md
        },
        theme.shadows.sm,
        style
      ]}
    >
      {/* Header: Image + Info + Stock Badge */}
      <View style={styles.header}>
        {/* Image or Emoji */}
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>
              {product.emoji || '📦'}
            </Text>
          </View>
        )}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text
            style={[
              styles.productName,
              { color: theme.colors.text }
            ]}
            numberOfLines={2}
          >
            {product.nom}
          </Text>

          {product.code && (
            <Text
              style={[
                styles.productCode,
                { color: theme.colors.textSecondary }
              ]}
            >
              {product.code}
            </Text>
          )}

          {/* Stock Badge */}
          {stockBadge && (
            <View
              style={[
                styles.stockBadge,
                { backgroundColor: stockBadge.color + '20' }
              ]}
            >
              <Text style={styles.stockBadgeIcon}>{stockBadge.icon}</Text>
              <Text
                style={[
                  styles.stockBadgeText,
                  { color: stockBadge.color }
                ]}
              >
                {stockBadge.label}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Conditionnements Label */}
      <Text
        style={[
          styles.conditionnementsSectionLabel,
          { color: theme.colors.textSecondary }
        ]}
      >
        Conditionnements disponibles:
      </Text>

      {/* Conditionnements Grid */}
      <View style={styles.conditionnementsList}>
        {conditionnements.map((conditionnement, index) => (
          <ConditionnementCard
            key={`${product.id}-${conditionnement.type}-${index}`}
            product={product}
            conditionnement={conditionnement}
            onAddToCart={onAddConditionnement}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderEmoji: {
    fontSize: 32
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 4
  },
  productCode: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  stockBadgeIcon: {
    fontSize: 12,
    marginRight: 4
  },
  stockBadgeText: {
    fontSize: 11,
    fontWeight: '600'
  },
  conditionnementsSectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10
  },
  conditionnementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 30
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
    fontWeight: '600'
  },
  noDataSubtext: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 4
  }
});

export default ProductCardDepot;