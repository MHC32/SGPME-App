/**
 * PRODUCT CARD DEPOT
 * 
 * Card pour afficher un produit avec tous ses conditionnements
 * en grid 2 colonnes
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import ConditionnementCard from './ConditionnementCard';
import {
  getConditionnementLabel,
  getConditionnementEmoji,
  transformPrixVenteOptions,
  getStockBadge
} from '../../utils/depot/conditionnementHelpers';

const ProductCardDepot = ({
  product,
  onAddConditionnement,
  style
}) => {
  const { theme } = useTheme();

  // Parser les conditionnements depuis prix_vente_options
  const conditionnements = useMemo(() => {
    if (!product.prix_vente_options || product.prix_vente_options.length === 0) {
      return [];
    }

    return transformPrixVenteOptions(product.prix_vente_options);
  }, [product.prix_vente_options]);

  // Stock badge
  const stockBadge = useMemo(() => {
    return getStockBadge(
      parseFloat(product.stock_actuel || 0),
      parseFloat(product.stock_minimum || 10)
    );
  }, [product.stock_actuel, product.stock_minimum]);

  // Handle add conditionnement
  const handleAddConditionnement = (conditionnement) => {
    if (onAddConditionnement) {
      onAddConditionnement(product, conditionnement);
    }
  };

  return (
    <View style={[styles.card, { borderColor: theme.border }, style]}>
      {/* Product Header */}
      <View style={styles.header}>
        {/* Image or Emoji */}
        <View style={[styles.imageContainer, { backgroundColor: theme.cardBg }]}>
          {product.image ? (
            <Image 
              source={{ uri: product.image }} 
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.emoji}>
              {product.emoji || '📦'}
            </Text>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          <Text 
            style={[styles.name, { color: theme.textPrimary }]}
            numberOfLines={2}
          >
            {product.nom}
          </Text>

          {product.code && (
            <Text style={[styles.code, { color: theme.textSecondary }]}>
              {product.code}
            </Text>
          )}

          {/* Stock Badge */}
          <View style={[styles.stockBadge, { backgroundColor: `${stockBadge.color}20` }]}>
            <Text style={styles.stockIcon}>{stockBadge.icon}</Text>
            <Text style={[styles.stockText, { color: stockBadge.color }]}>
              Stock: {parseFloat(product.stock_actuel || 0).toFixed(0)}{' '}
              {conditionnements[0]?.unitLabel || 'unités'}
            </Text>
          </View>
        </View>
      </View>

      {/* Conditionnements Section */}
      {conditionnements.length > 0 && (
        <>
          <Text style={[styles.conditionnementsLabel, { color: theme.textSecondary }]}>
            Conditionnements disponibles:
          </Text>

          <View style={styles.conditionnements}>
            {conditionnements.map((cond, index) => (
              <ConditionnementCard
                key={`${product.id}-${cond.type}-${index}`}
                icon={cond.emoji}
                label={cond.label}
                price={cond.prix}
                stock={cond.stock}
                onPress={() => handleAddConditionnement(cond)}
                style={styles.conditionnementCard}
              />
            ))}
          </View>
        </>
      )}

      {/* No conditionnements fallback */}
      {conditionnements.length === 0 && (
        <View style={styles.noConditionnements}>
          <Text style={[styles.noConditionnementsText, { color: theme.textSecondary }]}>
            Aucun conditionnement disponible
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  emoji: {
    fontSize: 35
  },
  info: {
    flex: 1,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#404040'
  },
  code: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    marginBottom: 6
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4
  },
  stockIcon: {
    fontSize: 10
  },
  stockText: {
    fontSize: 11,
    fontWeight: '600'
  },
  conditionnementsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8
  },
  conditionnements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  conditionnementCard: {
    width: '48%', // 2 colonnes avec gap
    flex: 0 // Empêche l'étirement
  },
  noConditionnements: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  noConditionnementsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic'
  }
});

export default ProductCardDepot;