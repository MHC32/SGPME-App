/**
 * DEPOT NAVIGATOR
 * 
 * Bottom Tab Navigator pour le module Depot
 * 3 tabs: Vente, Panier, Historique
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import {
  ProductsDepotScreen,
  CartDepotScreen,
  CheckoutDepotScreen,
  HistoriqueDepotScreen
} from '../screens/depot';

// Selectors
import { selectCartItemsCount } from '../redux/slices/depotSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Stack Navigator pour le flow Vente
 * Permet navigation vers Checkout depuis Cart
 */
const VenteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="ProductsDepot"
        component={ProductsDepotScreen}
      />
      <Stack.Screen
        name="CheckoutDepot"
        component={CheckoutDepotScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator pour le Panier
 * Permet navigation vers Checkout
 */
const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="CartDepot"
        component={CartDepotScreen}
      />
      <Stack.Screen
        name="CheckoutDepot"
        component={CheckoutDepotScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Main Depot Navigator avec Bottom Tabs
 */
const DepotNavigator = () => {
  const theme = useTheme();
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 2,
          borderTopColor: theme.colors.border,
          backgroundColor: '#FFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4
        },
        tabBarIconStyle: {
          marginTop: 5
        }
      }}
    >
      {/* Tab 1: Vente (Products) */}
      <Tab.Screen
        name="VenteTab"
        component={VenteStack}
        options={{
          tabBarLabel: 'Vente',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon 
              name="warehouse" 
              size={size} 
              color={color}
            />
          )
        }}
      />

      {/* Tab 2: Panier */}
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarLabel: 'Panier',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon 
              name="cart-outline" 
              size={size} 
              color={color}
            />
          ),
          // Badge pour nombre d'articles
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.primary,
            color: '#FFF',
            fontSize: 11,
            fontWeight: '700',
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            lineHeight: 20,
            textAlign: 'center'
          }
        }}
      />

      {/* Tab 3: Historique */}
      <Tab.Screen
        name="HistoriqueTab"
        component={HistoriqueDepotScreen}
        options={{
          tabBarLabel: 'Historique',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon 
              name="clipboard-list-outline" 
              size={size} 
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default DepotNavigator;