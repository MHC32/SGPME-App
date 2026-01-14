/**
 * HISTORIQUE DEPOT SCREEN
 * 
 * Écran historique des ventes du module Depot
 * Affiche la liste des ventes avec détails
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import Toast from 'react-native-toast-message';

// Redux
import { fetchVentes } from '../../redux/slices/depotSlice';

// Components
import SaleCard from '../../components/themed/ThemedSaleCard';
import EmptyState from '../../components/themed/ThemedEmptyState';
import Loading from '../../components/themed/ThemedLoading';

const HistoriqueDepotScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Redux state
  const { ventes, ventesLoading, ventesError } = useSelector(state => state.depot);

  // Local state
  const [refreshing, setRefreshing] = useState(false);

  // Load ventes on mount
  useEffect(() => {
    loadVentes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVentes = async () => {
    try {
      await dispatch(fetchVentes()).unwrap();
    } catch (error) {
      console.error('Error loading ventes:', error);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Impossible de charger l\'historique'
      });
    }
  };

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadVentes();
    setRefreshing(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // View vente details
  const handleViewVente = (vente) => {
    navigation.navigate('VenteDetail', { vente });
  };

  // Render vente item
  const renderVente = ({ item }) => (
    <SaleCard
      vente={item}
      onPress={() => handleViewVente(item)}
    />
  );

  // Render empty state
  const renderEmpty = () => {
    if (ventesLoading) {
      return null;
    }

    if (ventesError) {
      return (
        <EmptyState
          icon="⚠️"
          title="Erreur"
          message={ventesError}
          action={{
            label: 'Réessayer',
            onPress: loadVentes
          }}
        />
      );
    }

    return (
      <EmptyState
        icon="📋"
        title="Aucune vente"
        message="L'historique des ventes est vide"
        action={{
          label: 'Faire une vente',
          onPress: () => navigation.navigate('ProductsDepot')
        }}
      />
    );
  };

  // Loading state
  if (ventesLoading && ventes.length === 0) {
    return <Loading message="Chargement de l'historique..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          📋 Historique
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {ventes.length} vente{ventes.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Ventes List */}
      <FlatList
        data={ventes}
        renderItem={renderVente}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Toast */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#404040',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600'
  },
  listContent: {
    padding: 15,
    flexGrow: 1
  }
});

export default HistoriqueDepotScreen;