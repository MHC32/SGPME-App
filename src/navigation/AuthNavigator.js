/**
 * SGPME - Auth Navigator
 * 
 * Stack de navigation pour l'authentification
 * Pour l'instant : uniquement LoginScreen
 * v2 : ForgotPasswordScreen, etc.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { LoginScreen } from '../screens';

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
        component={LoginScreen}
      />
      
      {/* v2 : Autres écrans auth */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
}