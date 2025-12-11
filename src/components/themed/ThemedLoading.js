/**
 * SGPME - ThemedLoading
 * 
 * Indicateur de chargement pour VENDEUR POS
 * Feedback visuel pendant opérations
 * 
 * Features:
 * - Type : spinner, dots, bars
 * - Tailles : small, medium, large
 * - Overlay fullscreen optionnel
 * - Message optionnel
 * - Couleur adaptée au module
 * - Style adapté au module
 */

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedLoading Component
 * 
 * @param {Object} props
 * @param {string} props.type - 'spinner' | 'dots' | 'bars'
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {string} props.message - Message sous le loader
 * @param {boolean} props.overlay - Fullscreen overlay
 * @param {string} props.color - Couleur custom
 * @param {Object} props.style - Style custom
 */
const ThemedLoading = ({
  type = 'spinner',
  size = 'medium',
  message,
  overlay = false,
  color,
  style,
}) => {
  const theme = useTheme();

  // Couleur
  const loaderColor = color || theme.colors.primary;

  // Tailles ActivityIndicator
  const activitySizes = {
    small: 'small',
    medium: 'large',
    large: 'large',
  };

  const activitySize = activitySizes[size] || 'large';

  // Tailles custom pour dots/bars
  const customSizes = {
    small: {
      container: 32,
      dot: 8,
      bar: { width: 3, height: 16 },
    },
    medium: {
      container: 48,
      dot: 12,
      bar: { width: 4, height: 24 },
    },
    large: {
      container: 64,
      dot: 16,
      bar: { width: 5, height: 32 },
    },
  };

  const currentSize = customSizes[size] || customSizes.medium;

  // Rendu selon type
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <ActivityIndicator
            size={activitySize}
            color={loaderColor}
          />
        );

      case 'dots':
        return (
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: loaderColor,
                    width: currentSize.dot,
                    height: currentSize.dot,
                    borderRadius: currentSize.dot / 2,
                  },
                ]}
              />
            ))}
          </View>
        );

      case 'bars':
        return (
          <View style={styles.barsContainer}>
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                style={[
                  styles.bar,
                  {
                    backgroundColor: loaderColor,
                    width: currentSize.bar.width,
                    height: currentSize.bar.height,
                  },
                ]}
              />
            ))}
          </View>
        );

      default:
        return <ActivityIndicator size={activitySize} color={loaderColor} />;
    }
  };

  const content = (
    <View style={[styles.content, !overlay && style]}>
      {renderLoader()}

      {message && (
        <Text style={[styles.message, { color: overlay ? UI_COLORS.white : UI_COLORS.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );

  if (overlay) {
    return (
      <View style={[styles.overlay, style]}>
        {content}
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    marginTop: 16,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Dots loader
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 4,
  },

  // Bars loader
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
  },
  bar: {
    marginHorizontal: 2,
  },
});

export default ThemedLoading;