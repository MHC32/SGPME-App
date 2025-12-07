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

  // Vérifie si l'utilisateur est déjà connecté au démarrage
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Affiche un loading pendant la vérification initiale
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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