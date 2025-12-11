/**
 * SGPME - Main Navigator
 * 
 * Navigation principale avec Bottom Tabs + Stack pour Checkout
 * 
 * Structure:
 * - MainTabs (Products, Cart, History, Profile)
 * - Stack (Checkout, Success) en modal
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

// Screens
import {
  ProductsScreen,
  CartScreen,
  CheckoutScreen,
  SuccessScreen,
} from '../screens';

// Placeholders pour History et Profile (Phase 2)
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>HistoryScreen</Text>
    <Text style={styles.placeholderSubtext}>À créer en Phase 2</Text>
  </View>
);

const ProfileScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>ProfileScreen</Text>
    <Text style={styles.placeholderSubtext}>À créer en Phase 2</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ============================================================================
// 📱 BOTTOM TABS
// ============================================================================

function MainTabs() {
  const theme = useTheme();
  const cartItemsCount = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantite, 0)
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Headers gérés dans les screens
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5E5',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#737373',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {/* Products Tab */}
      <Tab.Screen
        name="ProductsTab"
        component={ProductsScreen}
        options={{
          title: theme.labels.products,
          tabBarLabel: theme.labels.products,
          tabBarIcon: ({ color, size }) => (
            <Icon name="store" size={size} color={color} />
          ),
        }}
      />

      {/* Cart Tab */}
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Panier',
          tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart" size={size} color={color} />
          ),
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.primary,
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: 'bold',
          },
        }}
      />

      {/* History Tab */}
      <Tab.Screen
        name="HistoryTab"
        component={HistoryScreenPlaceholder}
        options={{
          title: 'Historique',
          tabBarLabel: 'Historique',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreenPlaceholder}
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
// 🧭 MAIN STACK NAVIGATOR (Tabs + Checkout modals)
// ============================================================================

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Main Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
      />

      {/* Checkout Modal */}
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />

      {/* Success Modal */}
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_bottom',
          gestureEnabled: false, // Empêcher le swipe back
        }}
      />
    </Stack.Navigator>
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