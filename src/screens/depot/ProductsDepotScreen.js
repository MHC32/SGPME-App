/**
 * PRODUCTS DEPOT SCREEN - AVEC SUPPORT QUANTITÉ INITIALE
 * 
 * Écran principal de vente en gros
 * Support fallback unité avec quantité sélectable
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux
import {
  fetchProducts,
  fetchCategories,
  addToCart,
  setSelectedCategory,
  setSearchQuery,
  selectFilteredProducts,
  selectProducts,
  selectCategories
} from '../../redux/slices/depotSlice';

// Components
import { ProductCardDepot } from '../../components/depot';
import ThemedHeader from '../../components/themed/ThemedHeader';
import SearchBar from '../../components/themed/ThemedSearchBar';
import CategoryFilter from '../../components/themed/ThemedCategoryFilter';
import EmptyState from '../../components/themed/ThemedEmptyState';
import Loading from '../../components/themed/ThemedLoading';

const ProductsDepotScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Redux state
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const {
    productsLoading,
    productsError,
    selectedCategory,
    searchQuery
  } = useSelector(state => state.depot);

  // Local state
  const [refreshing, setRefreshing] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        dispatch(fetchProducts()).unwrap(),
        dispatch(fetchCategories()).unwrap()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Impossible de charger les produits'
      });
    }
  };

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search handler
  const handleSearch = (text) => {
    dispatch(setSearchQuery(text));
  };

  // Category filter handler
  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(
      category?.id === selectedCategory ? null : category?.id
    ));
  };

  // Add to cart handler
  const handleAddConditionnement = (product, conditionnement) => {
    try {
      // Prepare cart item
      const cartItem = {
        productId: product.id,
        productName: product.nom,
        productCode: product.code,
        productImage: product.image,
        emoji: product.emoji || '📦',
        
        // Conditionnement
        conditionnementType: conditionnement.type,
        conditionnementQte: conditionnement.qte,
        conditionnementLabel: conditionnement.label,
        
        // Prix et stock
        prixUnitaire: conditionnement.prix,
        stockDisponible: conditionnement.stock,
        
        // ✅ Quantité initiale (pour vente à l'unité avec sélecteur)
        quantiteInitiale: conditionnement.quantiteInitiale || 1
      };

      // Dispatch to Redux
      dispatch(addToCart(cartItem));

      // Show success toast
      const quantiteText = conditionnement.quantiteInitiale > 1 
        ? `${conditionnement.quantiteInitiale} × `
        : '';
      
      Toast.show({
        type: 'success',
        text1: 'Ajouté au panier',
        text2: `${quantiteText}${conditionnement.label} de ${product.nom}`,
        position: 'bottom',
        visibilityTime: 2000
      });

      // Haptic feedback (if available)
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        try {
          const { trigger } = require('react-native-haptic-feedback');
          trigger('impactLight');
        } catch (e) {
          // Haptic not available
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Impossible d\'ajouter au panier'
      });
    }
  };

  // Render product item
  const renderProduct = ({ item }) => (
    <ProductCardDepot
      product={item}
      onAddConditionnement={handleAddConditionnement}
    />
  );

  // Render empty state
  const renderEmpty = () => {
    if (productsLoading) {
      return null;
    }

    if (productsError) {
      return (
        <EmptyState
          icon="alert-circle-outline"
          title="Erreur"
          message={productsError}
          action={{
            label: 'Réessayer',
            onPress: loadData
          }}
        />
      );
    }

    if (searchQuery || selectedCategory) {
      return (
        <EmptyState
          icon="magnify"
          title="Aucun résultat"
          message="Aucun produit ne correspond à votre recherche"
          action={{
            label: 'Effacer les filtres',
            onPress: () => {
              dispatch(setSearchQuery(''));
              dispatch(setSelectedCategory(null));
            }
          }}
        />
      );
    }

    return (
      <EmptyState
        icon="package-variant"
        title="Aucun produit"
        message="Aucun produit n'est disponible pour le moment"
      />
    );
  };

  // Loading state
  if (productsLoading && products.length === 0) {
    return <Loading message="Chargement des produits..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { 
        backgroundColor: '#FFF',
        borderBottomColor: theme.colors.border 
      }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Vente en Gros
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Depot Alimentaire
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.scanButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              Toast.show({
                type: 'info',
                text1: 'Scanner',
                text2: 'Fonctionnalité à venir'
              });
            }}
          >
            <Icon name="barcode-scan" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Chercher un produit..."
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </View>

      {/* Results count */}
      {filteredProducts.length > 0 && (
        <View style={styles.resultsContainer}>
          <Icon 
            name="package-variant" 
            size={16} 
            color={theme.colors.textSecondary} 
            style={styles.resultsIcon}
          />
          <Text style={[styles.resultsText, { color: theme.colors.textSecondary }]}>
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            {searchQuery && ` pour "${searchQuery}"`}
          </Text>
        </View>
      )}

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

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
    backgroundColor: '#FFF',
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: 16
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666'
  },
  scanButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  resultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  resultsIcon: {
    marginRight: 6
  },
  resultsText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600'
  },
  listContent: {
    padding: 15,
    paddingTop: 5,
    flexGrow: 1
  }
});

export default ProductsDepotScreen;