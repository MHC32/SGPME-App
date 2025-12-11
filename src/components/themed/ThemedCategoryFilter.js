/**
 * SGPME - ThemedCategoryFilter
 * 
 * Filtres catégories rapides pour VENDEUR POS
 * Tabs horizontales scrollables avec sélection
 * 
 * Features:
 * - Tabs horizontales scrollables
 * - Catégorie "Tous" par défaut
 * - Sélection active avec style adapté
 * - Style selon module business
 * 
 * VERSION SIMPLIFIÉE - Sans auto-scroll pour éviter les problèmes de refs
 */

import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Platform 
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UI_COLORS, FONT_SIZES } from '../../constants';

/**
 * ThemedCategoryFilter Component
 * 
 * @param {Object} props
 * @param {Array<Object>} props.categories - Liste catégories [{id, nom}, ...]
 * @param {string} props.selectedCategory - ID catégorie sélectionnée
 * @param {Function} props.onSelectCategory - Callback sélection
 * @param {boolean} props.showAll - Afficher option "Tous"
 * @param {Object} props.style - Style custom container
 */
const ThemedCategoryFilter = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  showAll = true,
  style,
}) => {
  const theme = useTheme();

  // Catégorie "Tous"
  const allCategory = { id: 'all', nom: 'Tous' };

  // Liste complète avec "Tous" si activé
  const fullCategories = showAll ? [allCategory, ...categories] : categories;

  const handleSelectCategory = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  const isSelected = (categoryId) => {
    if (!selectedCategory) {
      return categoryId === 'all';
    }
    return categoryId === selectedCategory;
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {fullCategories.map((category, index) => {
          const selected = isSelected(category.id);

          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.tab,
                selected && {
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.primary,
                },
                index === 0 && styles.firstTab,
                index === fullCategories.length - 1 && styles.lastTab,
              ]}
              onPress={() => handleSelectCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  selected && styles.tabTextSelected,
                ]}
                numberOfLines={1}
              >
                {category.nom}
              </Text>

              {/* Badge count (optionnel - v2) */}
              {category.count !== undefined && category.count > 0 && (
                <View style={[
                  styles.countBadge,
                  selected && styles.countBadgeSelected,
                ]}>
                  <Text style={[
                    styles.countText,
                    selected && styles.countTextSelected,
                  ]}>
                    {category.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI_COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: UI_COLORS.borderLight,
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },

  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: UI_COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: UI_COLORS.border,
    minHeight: 36,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  firstTab: {
    marginLeft: 4,
  },

  lastTab: {
    marginRight: 4,
  },

  tabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: UI_COLORS.text,
  },

  tabTextSelected: {
    color: '#FFFFFF',
  },

  // Badge count
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: UI_COLORS.border,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: UI_COLORS.textSecondary,
  },

  countTextSelected: {
    color: '#FFFFFF',
  },
});

export default ThemedCategoryFilter;