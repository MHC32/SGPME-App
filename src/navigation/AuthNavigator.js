/**
 * SGPME - Auth Navigator
 * 
 * Stack de navigation pour l'authentification
 * Pour l'instant : uniquement LoginScreen
 * v2 : ForgotPasswordScreen, etc.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens (à créer)
// import LoginScreen from '../screens/Auth/LoginScreen';

// Pour l'instant, un placeholder
import { View, Text, StyleSheet } from 'react-native';

const LoginScreenPlaceholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>LoginScreen</Text>
    <Text style={styles.placeholderSubtext}>À créer dans src/screens/Auth/LoginScreen.js</Text>
  </View>
);

const Stack = createNativeStackNavigator();

// ============================================================================
// 🔐 AUTH NAVIGATOR
// ============================================================================

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Pas de header par défaut
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreenPlaceholder}
        // Après avoir créé LoginScreen :
        // component={LoginScreen}
      />
      
      {/* v2 : Autres écrans auth */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
}

// ============================================================================
// 🎨 STYLES (Placeholder)
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
  },
});