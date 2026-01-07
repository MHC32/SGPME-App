/**
 * SGPME - ProductsScreen (VERSION CORRIGÉE - SANS ERREUR HOOKS)
 * 
 * Règles strictes :
 * 1. TOUS les hooks en haut du composant
 * 2. AUCUN hook dans une condition
 * 3. AUCUN return avant tous les hooks
 * 4. useEffect APRÈS tous les autres hooks
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';

// Services API
import productsService from '../../services/products';
import categoriesService from '../../services/categories';

// Redux
import { addToCart, selectIsInCart } from '../../redux/slices/cartSlice';
import { selectUser } from '../../redux/slices/authSlice';
import { showSuccess, showError } from '../../redux/slices/uiSlice';

// Components
import { 
  ThemedCard, 
  ThemedButton, 
  ThemedLoading,
  ThemedToast,
} from '../../components/themed';
import { UI_COLORS, FONT_SIZES } from '../../constants';

const ProductsScreen = ({ navigation }) => {
  console.log('🔵 [ProductsScreen] RENDER START');
  
  // ========================================================================
  // 🎣 TOUS LES HOOKS ICI - ORDRE FIXE - PAS DE CONDITION
  // ========================================================================
  
  // Redux hooks
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  // Theme hook
  const theme = useTheme();
  
  // State hooks (ordre fixe, toujours appelés)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  
  console.log('   Hooks initialized');
  console.log('   user:', user?.username);
  console.log('   products count:', products.length);
  console.log('   loading:', loading);
  
  // ========================================================================
  // 🔄 FONCTIONS (PAS DE HOOKS ICI)
  // ========================================================================
  
  const fetchProducts = async (showLoader = true) => {
    console.log('🔵 [ProductsScreen] fetchProducts() START');
    
    if (showLoader) {
      setLoading(true);
    }
    
    setError(null);
    
    try {
      const filters = {};
      
      if (selectedCategory) {
        filters.categorie = selectedCategory;
      }
      
      console.log('📡 [ProductsScreen] Calling productsService...');
      const data = await productsService.getProduitsPourVente(filters);
      
      console.log('✅ [ProductsScreen] Products fetched:', data.length);
      setProducts(data);
      
    } catch (err) {
      console.log('❌ [ProductsScreen] fetchProducts() ERROR:', err);
      setError(err.message || 'Erreur de chargement');
      setToast({
        visible: true,
        message: 'Impossible de charger les produits',
        type: 'error',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  const fetchCategories = async () => {
    console.log('🔵 [ProductsScreen] fetchCategories() START');
    
    try {
      const data = await categoriesService.getCategories();
      console.log('✅ [ProductsScreen] Categories fetched:', data.length);
      setCategories(data);
    } catch (err) {
      console.log('❌ [ProductsScreen] fetchCategories() ERROR:', err);
      // Les catégories ne sont pas critiques
    }
  };
  
  const handleRefresh = () => {
    console.log('🔄 [ProductsScreen] Refreshing...');
    setRefreshing(true);
    fetchProducts(false);
  };
  
  const handleAddToCart = (product) => {
    console.log('🛒 [ProductsScreen] Adding to cart:', product.nom);
    
    if (product.stock_actuel <= 0) {
      setToast({
        visible: true,
        message: 'Produit en rupture de stock',
        type: 'error',
      });
      return;
    }
    
    dispatch(addToCart(product));
    setToast({
      visible: true,
      message: `${product.nom} ajouté au panier`,
      type: 'success',
    });
  };
  
  const handleCategorySelect = (categoryId) => {
    console.log('📂 [ProductsScreen] Category selected:', categoryId);
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  
  // ========================================================================
  // 🎯 EFFECTS (APRÈS TOUS LES AUTRES HOOKS)
  // ========================================================================
  
  useEffect(() => {
    console.log('🟢 [ProductsScreen] MOUNT - Fetching data...');
    fetchCategories();
    fetchProducts();
    
    return () => {
      console.log('🔴 [ProductsScreen] UNMOUNT');
    };
  }, []);
  
  useEffect(() => {
    if (!loading) {
      console.log('🔄 [ProductsScreen] Filter changed, reloading...');
      fetchProducts();
    }
  }, [selectedCategory]);
  
  // ========================================================================
  // 🎨 PRODUCT ITEM COMPONENT (Séparé pour utiliser hooks)
  // ========================================================================
  
  const ProductItem = ({ product, onPress, onAddToCart }) => {
    // ✅ Hooks peuvent être appelés ici (dans un composant)
    const isInCart = useSelector(selectIsInCart(product.id));
    
    return (
      <ThemedCard
        variant="default"
        padding="md"
        style={styles.productCard}
        onPress={() => onPress(product)}
      >
        {/* Image */}
        {product.image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
        )}
        
        {/* Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.nom}
          </Text>
          
          <Text style={styles.productCode}>
            {product.code}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={[styles.productPrice, { color: theme.colors.primary }]}>
              {product.prix_vente} HTG
            </Text>
            
            <Text
              style={[
                styles.stockBadge,
                product.stock_actuel > 0 
                  ? styles.stockAvailable 
                  : styles.stockUnavailable,
              ]}
            >
              {product.stock_actuel > 0 
                ? `Stock: ${product.stock_actuel}` 
                : 'Rupture'}
            </Text>
          </View>
        </View>
        
        {/* Button */}
        <ThemedButton
          title={isInCart ? 'Dans le panier' : 'Ajouter'}
          onPress={() => onAddToCart(product)}
          variant={isInCart ? 'outline' : 'primary'}
          size="sm"
          disabled={product.stock_actuel <= 0}
        />
      </ThemedCard>
    );
  };
  
  // ========================================================================
  // 🎨 RENDER HELPERS
  // ========================================================================
  
  const renderCategory = ({ item: category }) => {
    const isSelected = selectedCategory === category.id;
    
    return (
      <ThemedButton
        title={category.nom}
        onPress={() => handleCategorySelect(category.id)}
        variant={isSelected ? 'primary' : 'outline'}
        size="sm"
        style={styles.categoryButton}
      />
    );
  };
  
  const renderProduct = ({ item: product }) => {
    // ✅ Utilise le composant ProductItem
    return (
      <ProductItem
        product={product}
        // onPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
    );
  };
  
  // ========================================================================
  // 🎯 CONDITIONAL RENDERS (APRÈS TOUS LES HOOKS)
  // ========================================================================
  
  // Loading initial
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedLoading message="Chargement des produits..." />
      </SafeAreaView>
    );
  }
  
  // Erreur critique
  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <ThemedButton
            title="Réessayer"
            onPress={() => fetchProducts()}
            style={styles.retryButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  // ========================================================================
  // 🎯 RENDER NORMAL
  // ========================================================================
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Catégories */}
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
      )}
      
      {/* Produits */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {selectedCategory
                ? 'Aucun produit dans cette catégorie'
                : 'Aucun produit disponible'}
            </Text>
          </View>
        }
      />
      
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

// ============================================================================
// 🎨 STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },
  
  // Categories
  categoriesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: UI_COLORS.border,
    backgroundColor: UI_COLORS.surface,
  },
  
  categoriesList: {
    paddingHorizontal: 16,
  },
  
  categoryButton: {
    marginRight: 8,
  },
  
  // Products
  productsList: {
    padding: 16,
  },
  
  productCard: {
    flex: 1,
    margin: 8,
    maxWidth: '47%',
  },
  
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: UI_COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  
  productImage: {
    width: '100%',
    height: '100%',
  },
  
  productInfo: {
    marginBottom: 12,
  },
  
  productName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 4,
  },
  
  productCode: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
    marginBottom: 8,
  },
  
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  productPrice: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  
  stockBadge: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  stockAvailable: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  
  stockUnavailable: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  
  // Empty
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: UI_COLORS.textLight,
    textAlign: 'center',
  },
  
  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  
  errorText: {
    fontSize: FONT_SIZES.md,
    color: UI_COLORS.error,
    textAlign: 'center',
    marginBottom: 24,
  },
  
  retryButton: {
    minWidth: 150,
  },
});

export default ProductsScreen;