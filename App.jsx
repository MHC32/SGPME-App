/**
 * App.js - Point d'entrée de l'application
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, View, ActivityIndicator } from 'react-native';

// Redux
import { store, persistor } from './src/redux/store';

// Theme
import { ThemeProvider } from './src/theme';

// Navigation
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen />}
        persistor={persistor}
      >
        <ThemeProvider>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

// Loading screen pendant que Redux Persist charge
function LoadingScreen() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}