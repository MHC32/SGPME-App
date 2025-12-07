/**
 * SGPME - Main Navigator
 * 
 * Bottom tabs navigation pour l'application vendeur
 * Les icônes s'adaptent automatiquement selon le thème (module business)
 * 
 * Tabs :
 * - Products : Liste des produits
 * - Cart : Panier
 * - History : Historique des ventes
 * - Profile : Profil vendeur
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';

// Hooks (optionnels pour l'instant)
// import { useTheme } from '../theme';
import { useSelector } from 'react-redux';

// Sélecteur Redux (avec fallback)
const selectCartItemsCount = (state) => {
  if (state?.cart?.items) {
    return state.cart.items.reduce((total, item) => total + item.quantite, 0);
  }
  return 0;
};

// Screens (à créer)
// import ProductListScreen from '../screens/Products/ProductListScreen';
// import CartScreen from '../screens/Cart/CartScreen';
// import HistoryScreen from '../screens/History/HistoryScreen';
// import ProfileScreen from '../screens/Profile/ProfileScreen';

// Placeholders temporaires
const ProductsScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>ProductListScreen</Text>
    <Text style={styles.placeholderSubtext}>src/screens/Products/ProductListScreen.js</Text>
  </View>
);

const CartScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>CartScreen</Text>
    <Text style={styles.placeholderSubtext}>src/screens/Cart/CartScreen.js</Text>
  </View>
);

const HistoryScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>HistoryScreen</Text>
    <Text style={styles.placeholderSubtext}>src/screens/History/HistoryScreen.js</Text>
  </View>
);

const ProfileScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>ProfileScreen</Text>
    <Text style={styles.placeholderSubtext}>src/screens/Profile/ProfileScreen.js</Text>
  </View>
);

const Tab = createBottomTabNavigator();

// ============================================================================
// 🎨 THÈME PAR DÉFAUT (utilisé si ThemeProvider n'existe pas encore)
// ============================================================================

const DEFAULT_THEME = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    border: '#E5E5E5',
    textInverse: '#FFFFFF',
    textSecondary: '#737373',
  },
  labels: {
    products: 'Produits',
  },
  icons: {
    products: 'store',
    cart: 'cart',
  },
};

// ============================================================================
// 📱 MAIN NAVIGATOR
// ============================================================================

export default function MainNavigator() {
  // Récupère le thème (avec fallback si pas encore implémenté)
  // const theme = useTheme ? useTheme() : DEFAULT_THEME;
  const theme = DEFAULT_THEME; // Temporaire
  
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {/* ================================================================== */}
      {/* PRODUCTS TAB */}
      {/* ================================================================== */}
      <Tab.Screen
        name="Products"
        component={ProductsScreenPlaceholder}
        // Après création : component={ProductListScreen}
        options={{
          title: theme.labels.products, // "Médicaments" | "Menu" | "Articles" | "Produits"
          tabBarLabel: theme.labels.products,
          tabBarIcon: ({ color, size }) => (
            <Icon name={theme.icons.products} size={size} color={color} />
          ),
        }}
      />

      {/* ================================================================== */}
      {/* CART TAB */}
      {/* ================================================================== */}
      <Tab.Screen
        name="Cart"
        component={CartScreenPlaceholder}
        // Après création : component={CartScreen}
        options={{
          title: 'Panier',
          tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => (
            <Icon name={theme.icons.cart} size={size} color={color} />
          ),
          // Badge avec nombre d'articles
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.textInverse,
            fontSize: 10,
            fontWeight: 'bold',
          },
        }}
      />

      {/* ================================================================== */}
      {/* HISTORY TAB */}
      {/* ================================================================== */}
      <Tab.Screen
        name="History"
        component={HistoryScreenPlaceholder}
        // Après création : component={HistoryScreen}
        options={{
          title: 'Historique',
          tabBarLabel: 'Historique',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />

      {/* ================================================================== */}
      {/* PROFILE TAB */}
      {/* ================================================================== */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreenPlaceholder}
        // Après création : component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ============================================================================
// 🎨 STYLES (Placeholders)
// ============================================================================

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});