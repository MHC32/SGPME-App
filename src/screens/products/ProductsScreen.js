/**
 * SGPME - ProductsScreen
 * 
 * Écran principal liste produits pour vendeur/caissier
 * 
 * Features:
 * - Header avec badge panier
 * - Recherche produits
 * - Filtres par catégories
 * - Liste produits avec scroll infini
 * - Ajout au panier rapide
 * - État vide
 * - Loading
 * - Adapté au module actif
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import {
  ThemedHeader,
  ThemedSearchBar,
  ThemedCategoryFilter,
  ThemedCard,
  ThemedPriceDisplay,
  ThemedStockBadge,
  ThemedBadge,
  ThemedEmptyState,
  ThemedLoading,
  ThemedToast,
} from '../../components/themed';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { addToCart } from '../../redux/slices/cartSlice';
// Import des données mock depuis le bon chemin
import { mockProduits as MOCK_PRODUCTS } from '../../data/mock/products';
import { mockCategories as MOCK_CATEGORIES } from '../../data/mock/categories';

// ============================================================================
// 🔍 LOGS DE DÉBOGAGE - VÉRIFICATION DES COMPOSANTS
// ============================================================================
console.log('🔵 [ProductsScreen] Vérification des imports...');
console.log('   ThemedHeader:', typeof ThemedHeader, ThemedHeader);
console.log('   ThemedSearchBar:', typeof ThemedSearchBar, ThemedSearchBar);
console.log('   ThemedCategoryFilter:', typeof ThemedCategoryFilter, ThemedCategoryFilter);
console.log('   ThemedCard:', typeof ThemedCard, ThemedCard);
console.log('   ThemedPriceDisplay:', typeof ThemedPriceDisplay, ThemedPriceDisplay);
console.log('   ThemedStockBadge:', typeof ThemedStockBadge, ThemedStockBadge);
console.log('   ThemedBadge:', typeof ThemedBadge, ThemedBadge);
console.log('   ThemedEmptyState:', typeof ThemedEmptyState, ThemedEmptyState);
console.log('   ThemedLoading:', typeof ThemedLoading, ThemedLoading);
console.log('   ThemedToast:', typeof ThemedToast, ThemedToast);
console.log('   MOCK_PRODUCTS:', typeof MOCK_PRODUCTS, MOCK_PRODUCTS ? MOCK_PRODUCTS.length : 'undefined');
console.log('   MOCK_CATEGORIES:', typeof MOCK_CATEGORIES, MOCK_CATEGORIES ? MOCK_CATEGORIES.length : 'undefined');
console.log('✅ [ProductsScreen] Vérification terminée\n');
// ============================================================================

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Récupérer l'ID de l'entreprise du user connecté (pas l'objet complet)
  const userEntreprise = useSelector(state => state.auth.user?.entreprise?.id);
  
  const cartItemsCount = useSelector(state => 
    state.cart.items.reduce((sum, item) => sum + item.quantite, 0)
  );

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  // 🔍 LOG au montage du composant
  console.log('🟢 [ProductsScreen] COMPONENT MOUNTED');
  console.log('   userEntreprise:', userEntreprise);
  console.log('   theme:', theme.module);

  // Charger produits (simuler API)
  useEffect(() => {
    console.log('🟢 [ProductsScreen] useEffect triggered');
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Simuler appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 🔍 LOG DEBUG
      console.log('🔵 [ProductsScreen] loadProducts() START');
      console.log('   userEntreprise (ID):', userEntreprise);
      console.log('   Type:', typeof userEntreprise);
      console.log('   MOCK_PRODUCTS total:', MOCK_PRODUCTS.length);
      
      // Filtrer produits selon l'entreprise du user connecté
      const moduleProducts = MOCK_PRODUCTS.filter(
        p => p.entreprise === userEntreprise
      );
      
      console.log('   Produits filtrés:', moduleProducts.length);
      if (moduleProducts.length > 0) {
        console.log('   ✅ Produits trouvés:', moduleProducts.map(p => p.nom));
      } else {
        console.log('   ❌ AUCUN produit trouvé !');
        console.log('   Exemple de produit dans MOCK:', MOCK_PRODUCTS[0]);
      }
      
      setProducts(moduleProducts);
    } catch (error) {
      console.error('❌ [ProductsScreen] Erreur loadProducts:', error);
      setToast({
        visible: true,
        message: 'Erreur lors du chargement des produits',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrer produits
  const filteredProducts = products.filter(product => {
    const matchSearch = product.nom
      .toLowerCase()
      .includes(search.toLowerCase());
    
    const matchCategory =
      selectedCategory === 'all' || product.categorie === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  // Ajouter au panier
  const handleAddToCart = (product) => {
    if (product.stock_actuel <= 0) {
      setToast({
        visible: true,
        message: 'Produit en rupture de stock',
        type: 'error',
      });
      return;
    }

    dispatch(addToCart({
      produit_id: product.id,
      nom: product.nom,
      prix_unitaire: product.prix_vente,
      quantite: 1,
      stock_actuel: product.stock_actuel,
      image: product.image,
      code: product.code,
    }));

    setToast({
      visible: true,
      message: `${product.nom} ajouté au panier`,
      type: 'success',
    });
  };

  // Render produit card
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productWrapper}
      onPress={() => handleAddToCart(item)}
      activeOpacity={0.7}
    >
      <ThemedCard variant="outlined" padding="md">
        {/* Image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.imagePlaceholder,
                { backgroundColor: theme.colors.primary + '20' },
              ]}
            >
              <Text style={{ fontSize: 32 }}>
                {theme.icons.products}
              </Text>
            </View>
          )}

          {/* Badges top */}
          <View style={styles.topBadges}>
            {/* Pas de badge nouveau/promo dans les données mock pour l'instant */}
          </View>
        </View>

        {/* Info */}
        <View style={styles.productInfo}>
          {/* Nom */}
          <Text style={styles.productName} numberOfLines={2}>
            {item.nom}
          </Text>

          {/* Code */}
          {item.code && (
            <Text style={styles.productCode}>{item.code}</Text>
          )}

          {/* Prix */}
          <ThemedPriceDisplay
            price={item.prix_vente}
            size="large"
          />

          {/* Stock */}
          <ThemedStockBadge
            stock={item.stock_actuel}
            lowThreshold={10}
            size="small"
            style={styles.stockBadge}
          />

          {/* Bouton ajout */}
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor:
                  item.stock_actuel > 0
                    ? theme.colors.primary
                    : UI_COLORS.backgroundTertiary,
              },
            ]}
            onPress={() => handleAddToCart(item)}
            disabled={item.stock_actuel <= 0}
          >
            <Text
              style={[
                styles.addButtonText,
                {
                  color:
                    item.stock_actuel > 0 ? UI_COLORS.white : UI_COLORS.textLight,
                },
              ]}
            >
              {item.stock_actuel > 0 ? '+ Ajouter' : 'Rupture'}
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedCard>
    </TouchableOpacity>
  );

  // Loading
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedHeader title={theme.labels.products} />
        <ThemedLoading message="Chargement des produits..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ThemedHeader
        title={theme.labels.products}
        showCart
        onCart={() => navigation.navigate('CartTab')}
      />

      {/* Recherche */}
      <View style={styles.searchContainer}>
        <ThemedSearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />
      </View>

      {/* Filtres catégories */}
      <ThemedCategoryFilter
        categories={MOCK_CATEGORIES.filter(c => c.entreprise === userEntreprise)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        showAll
      />

      {/* Liste produits */}
      {filteredProducts.length === 0 ? (
        <ThemedEmptyState
          icon="🔍"
          title={search ? 'Aucun résultat' : `Aucun ${theme.labels.products.toLowerCase()}`}
          message={
            search
              ? 'Essayez d\'autres mots-clés'
              : 'Les produits apparaîtront ici'
          }
          actionLabel={search ? 'Effacer la recherche' : undefined}
          onAction={search ? () => setSearch('') : undefined}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Toast */}
      <ThemedToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast({ ...toast, visible: false })}
        position="bottom"
        duration={2000}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  productsList: {
    padding: 12,
  },

  productWrapper: {
    flex: 1,
    maxWidth: '50%',
    padding: 4,
  },

  // Product card
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBadges: {
    position: 'absolute',
    top: 8,
    right: 8,
    gap: 4,
  },

  productInfo: {
    gap: 8,
  },

  productName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: UI_COLORS.text,
    minHeight: 40,
  },

  productCode: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
    fontFamily: 'monospace',
  },

  stockBadge: {
    alignSelf: 'flex-start',
  },

  addButton: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  addButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
});

export default ProductsScreen;