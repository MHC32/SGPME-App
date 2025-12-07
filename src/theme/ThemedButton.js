/**
 * SGPME - Themed Button
 * 
 * Bouton qui s'adapte automatiquement au thème courant
 * Optimisé pour interface VENDEUR (boutons gros et rapides)
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * ThemedButton Component
 * 
 * @param {object} props
 * @param {function} props.onPress - Callback au tap
 * @param {string} props.title - Texte du bouton
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {boolean} props.disabled - Bouton désactivé
 * @param {boolean} props.loading - État de chargement
 * @param {boolean} props.fullWidth - Prend toute la largeur
 * @param {object} props.style - Styles personnalisés
 * @param {object} props.textStyle - Styles texte personnalisés
 * @param {ReactNode} props.icon - Icône à gauche du texte (optionnel)
 */
export const ThemedButton = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  ...rest
}) => {
  const theme = useTheme();

  // Styles selon variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          borderWidth: 2,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
          borderWidth: 2,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.border,
          borderWidth: 2,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
        };
    }
  };

  // Couleur du texte selon variant
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.textInverse;
      case 'secondary':
        return theme.colors.primary;
      case 'outline':
        return theme.colors.text;
      case 'ghost':
        return theme.colors.primary;
      default:
        return theme.colors.textInverse;
    }
  };

  // Taille selon size
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          minHeight: 36,
        };
      case 'medium':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 48,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
          minHeight: 56,
        };
      default:
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 48,
        };
    }
  };

  // Taille du texte
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const textColor = getTextColor();
  const textSize = getTextSize();

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        variantStyles,
        sizeStyles,
        {
          borderRadius: theme.borderRadius.md,
          opacity: isDisabled ? 0.5 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize: textSize,
                fontWeight: '600',
                marginLeft: icon ? theme.spacing.sm : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default ThemedButton;