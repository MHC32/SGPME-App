/**
 * SGPME - ThemedToast
 * 
 * Notification toast pour VENDEUR POS
 * Feedback visuel rapide
 * 
 * Features:
 * - Type : success, error, warning, info
 * - Auto-dismiss configurable
 * - Icônes adaptées
 * - Position : top, bottom
 * - Animation slide in/out
 * - Style adapté au module
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedToast Component
 * 
 * Toast notification adapté au module actif
 * Type "info" utilise la couleur du module
 * 
 * @param {Object} props
 * @param {string} props.message - Message à afficher
 * @param {string} props.type - 'success' | 'error' | 'warning' | 'info'
 * @param {number} props.duration - Durée affichage ms (0 = pas d'auto-dismiss)
 * @param {Function} props.onDismiss - Callback dismiss
 * @param {string} props.position - 'top' | 'bottom'
 * @param {boolean} props.visible - Contrôle visibilité
 * @param {Object} props.style - Style custom
 */
const ThemedToast = ({
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
  position = 'top',
  visible = true,
  style,
}) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Types (info utilise theme.colors.primary)
  const typeConfig = {
    success: {
      icon: '✓',
      bg: '#10B981',
      text: UI_COLORS.white,
    },
    error: {
      icon: '✕',
      bg: '#EF4444',
      text: UI_COLORS.white,
    },
    warning: {
      icon: '⚠',
      bg: '#F59E0B',
      text: UI_COLORS.white,
    },
    info: {
      icon: 'ℹ',
      bg: theme.colors.primary, // 🎨 Adapté au module
      text: UI_COLORS.white,
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  // Animation slide in
  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();

      // Auto-dismiss
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, duration]);

  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
    });
  };

  if (!visible) return null;

  // Position animation
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: position === 'top' ? [-100, 0] : [100, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.positionTop : styles.positionBottom,
        {
          transform: [{ translateY }],
          opacity: slideAnim,
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={[styles.toast, { backgroundColor: config.bg }]}
        onPress={handleDismiss}
        activeOpacity={0.9}
      >
        {/* Icône */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{config.icon}</Text>
        </View>

        {/* Message */}
        <Text
          style={[styles.message, { color: config.text }]}
          numberOfLines={3}
        >
          {message}
        </Text>

        {/* Bouton fermer */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleDismiss}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeIcon, { color: config.text }]}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },

  positionTop: {
    top: 16,
  },

  positionBottom: {
    bottom: 16,
  },

  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  icon: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },

  message: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    lineHeight: 20,
  },

  closeButton: {
    marginLeft: 12,
    padding: 4,
  },

  closeIcon: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
});

export default ThemedToast;