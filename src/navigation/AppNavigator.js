/**
 * SGPME - App Navigator
 * 
 * Navigation principale de l'application
 * Switch entre AuthNavigator (login) et MainNavigator (app)
 * selon l'état d'authentification
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Redux
import { checkAuth, selectIsAuthenticated, selectAuthLoading } from '../redux/slices';

// ============================================================================
// 🧭 APP NAVIGATOR
// ============================================================================

export default function AppNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  console.log('🔵 [AppNavigator] RENDER');
  console.log('   isAuthenticated:', isAuthenticated);
  console.log('   loading:', loading);

  // Vérifie si l'utilisateur est déjà connecté au démarrage
  // IMPORTANT : Ne vérifie qu'UNE SEULE FOIS et seulement si pas déjà authentifié
  useEffect(() => {
    console.log('🟢 [AppNavigator] useEffect TRIGGER');
    console.log('   isAuthenticated:', isAuthenticated);
    console.log('   loading:', loading);
    
    // Ne check que si on n'est pas déjà authentifié
    if (!isAuthenticated && !loading) {
      console.log('✅ [AppNavigator] Calling checkAuth()...');
      dispatch(checkAuth());
    } else {
      console.log('⏭️ [AppNavigator] Skipping checkAuth (already auth or loading)');
    }
  }, []); // Dépendances vides = exécute qu'une seule fois au mount

  // Affiche un loading pendant la vérification initiale
  if (loading) {
    console.log('⏳ [AppNavigator] Showing loading screen...');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  console.log('🧭 [AppNavigator] Navigating to:', isAuthenticated ? 'MainNavigator' : 'AuthNavigator');

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}


// ============================================================================
// 🎨 STYLES
// ============================================================================

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});