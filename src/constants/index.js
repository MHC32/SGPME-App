/**
 * SGPME - Index des constantes de design
 * 
 * Point d'entrée unique pour toutes les constantes de design
 * (couleurs, typographie, configurations business)
 * 
 * Usage:
 * import { BASE_COLORS, PHARMACY_COLORS, FONT_SIZES } from '@/constants';
 * import { PHARMACY_CONFIG } from '@/constants';
 */

// ============================================================================
// 🎨 COULEURS
// ============================================================================

export {
  // Base
  BASE_COLORS,
  
  // Par module
  PHARMACY_COLORS,
  RESTAURANT_COLORS,
  DEPOT_COLORS,
  SHOP_COLORS,
  
  // Statuts & UI
  STATUS_COLORS,
  UI_COLORS,
  CHART_COLORS,
  SOCIAL_COLORS,
  OPACITY,
  
  // Helpers
  addOpacity,
  lighten,
  darken,
} from './colors';

// ============================================================================
// 📝 TYPOGRAPHIE
// ============================================================================

export {
  // Familles & Tailles
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  
  // Styles
  HEADERS,
  BODY,
  LABELS,
  BUTTONS,
  PRICES,
  CAPTIONS,
  CODES,
  POS_STYLES,
  
  // Responsive
  SCALE_FACTORS,
  
  // Helpers
  createTextStyle,
  scaleText,
} from './typography';

// ============================================================================
// 🏢 BUSINESS
// ============================================================================

export {
  // Configurations
  PHARMACY_CONFIG,
  RESTAURANT_CONFIG,
  DEPOT_CONFIG,
  SHOP_CONFIG,
  BUSINESS_CONFIGS,
  
  // Helpers
  getBusinessConfig,
  getDefaultCategories,
  getBusinessLabels,
  getBusinessDisplay,
  supportsVariants,
  supportsBulkPrice,
} from './business';

// ============================================================================
// 📦 EXPORTS PAR DÉFAUT
// ============================================================================

import colors from './colors';
import typography from './typography';
import business from './business';

export default {
  colors,
  typography,
  business,
};