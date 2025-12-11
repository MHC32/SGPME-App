/**
 * SGPME - LoginScreen
 * 
 * Écran de connexion pour vendeur/caissier
 * 
 * Features:
 * - Formulaire login (email/password)
 * - Validation
 * - Loading state
 * - Toast erreur/succès
 * - Navigation auto vers Products
 * - Adapté au module actif
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../theme/ThemeProvider';
import {
  ThemedCard,
  ThemedLoading,
  ThemedToast,
} from '../../components/themed';
import { UI_COLORS, FONT_SIZES } from '../../constants';
import { login } from '../../redux/slices/authSlice';
import {ThemedButton} from '../../theme/ThemedButton'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const handleLogin = async () => {
    console.log('🔵 [LoginScreen] handleLogin START');
    console.log('   username:', username);
    console.log('   password:', password ? '***' : '(empty)');
    
    // Validation
    if (!username || !password) {
      console.log('⚠️ [LoginScreen] Validation failed: empty fields');
      setToast({
        visible: true,
        message: 'Veuillez remplir tous les champs',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    console.log('⏳ [LoginScreen] Loading started...');

    try {
      console.log('🔐 [LoginScreen] Dispatching login()...');
      
      // Dispatch l'action login du authSlice
      const result = await dispatch(login({ username, password })).unwrap();
      
      console.log('✅ [LoginScreen] Login SUCCESS!');
      console.log('   user:', result.user);
      console.log('   token:', result.token ? 'present' : 'missing');

      // Toast succès
      setToast({
        visible: true,
        message: 'Connexion réussie !',
        type: 'success',
      });
      
      console.log('🎉 [LoginScreen] Toast success shown');

      // Le AppNavigator va automatiquement switcher vers MainNavigator
      // grâce à Redux isAuthenticated
      console.log('🧭 [LoginScreen] Waiting for AppNavigator to switch...');
      
    } catch (error) {
      console.log('❌ [LoginScreen] Login FAILED');
      console.log('   error:', error);
      
      // Convertir l'erreur en string
      const errorMessage = typeof error === 'string' 
        ? error 
        : error?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      
      console.log('   errorMessage:', errorMessage);
      
      setToast({
        visible: true,
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setLoading(false);
      console.log('🏁 [LoginScreen] handleLogin END');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo / Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>
              Système de Gestion Petite et Moyenne Entreprise
            </Text>
          </View>

          {/* Form Card */}
          <ThemedCard variant="elevated" padding="lg">
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom d'utilisateur</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: username ? theme.colors.primary : UI_COLORS.border },
                ]}
                placeholder="marie.louis"
                placeholderTextColor={UI_COLORS.textLight}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: password ? theme.colors.primary : UI_COLORS.border },
                ]}
                placeholder="••••••••"
                placeholderTextColor={UI_COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* Login Button */}
            <ThemedButton
              title="Se connecter"
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButton}
            />

            {/* Forgot password */}
            <Text style={styles.forgotText}>
              Mot de passe oublié ? Contactez l'administrateur
            </Text>
          </ThemedCard>

          {/* Info */}
          <Text style={styles.infoText}>
            Cette application est réservée aux vendeurs et caissiers.
            Vos identifiants vous sont fournis par votre responsable.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Overlay */}
      {loading && (
        <ThemedLoading overlay message="Connexion en cours..." />
      )}

      {/* Toast */}
      <ThemedToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast({ ...toast, visible: false })}
        position="top"
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 200,
    height: 120,
    marginBottom: 24,
  },

  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    color: UI_COLORS.text,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: UI_COLORS.textSecondary,
    textAlign: 'center',
  },

  // Form
  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: FONT_SIZES.md,
    color: UI_COLORS.text,
    backgroundColor: UI_COLORS.surface,
  },

  loginButton: {
    marginTop: 8,
  },

  forgotText: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },

  // Info
  infoText: {
    fontSize: FONT_SIZES.xs,
    color: UI_COLORS.textLight,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    lineHeight: 18,
  },
});

export default LoginScreen;