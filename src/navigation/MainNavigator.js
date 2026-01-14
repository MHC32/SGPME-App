/**
 * MAIN NAVIGATOR (EXEMPLE)
 * 
 * Navigator principal qui switch entre les modules
 * selon le module_actif de l'entreprise
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

// Module Navigators
// import ShopNavigator from './ShopNavigator';
// import RestaurantNavigator from './RestaurantNavigator';
// import PharmacieNavigator from './PharmacieNavigator';
import DepotNavigator from './DepotNavigator';

const MainNavigator = () => {
  const { theme } = useTheme();
  const { user } = useSelector(state => state.auth);

  // Récupérer le module actif
  const moduleActif = user?.entreprise?.module_actif;

  // Si pas de module actif, afficher erreur
  if (!moduleActif) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>Aucun module actif</Text>
        <Text style={styles.errorSubtext}>
          Veuillez contacter l'administrateur
        </Text>
      </View>
    );
  }

  // Switch selon le module
  switch (moduleActif) {
    // case 'shop':
    //   return <ShopNavigator />;

    // case 'restaurant':
    //   return <RestaurantNavigator />;

    // case 'pharmacie':
    //   return <PharmacieNavigator />;

    case 'depot':
      return <DepotNavigator />;

    default:
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={styles.errorText}>Module inconnu</Text>
          <Text style={styles.errorSubtext}>
            Module "{moduleActif}" non supporté
          </Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20
  },
  errorText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 8
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  }
});

export default MainNavigator;