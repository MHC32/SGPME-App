/**
 * SGPME - Configuration API
 * 
 * Configuration centralisée pour l'accès au backend Django
 */

// ⚠️ IMPORTANT : Modifier selon ton environnement
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.174:8000'  // 🔧 MODIFIE AVEC TON IP LOCALE
  : 'https://api.sgpme.com';      // URL de production

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000, // 10 secondes
  
  // ============================================================================
  // ENDPOINTS
  // ============================================================================
  // Note: Le préfixe /api/ est ajouté dans services/api.js (baseURL)
  // Donc les endpoints ci-dessous ne contiennent pas /api/
  
  ENDPOINTS: {
    // ----- AUTH -----
    LOGIN: '/auth/login/',
    REFRESH: '/auth/refresh/',
    REGISTER: '/auth/register/',
    ME: '/users/me/',
    CHANGE_PASSWORD: '/users/change_password/',
    
    // ----- PRODUITS -----
    PRODUITS_VENTE: '/inventory/produits/pour-vente/',
    PRODUITS: '/inventory/produits/',
    PRODUITS_DETAIL: (id) => `/inventory/produits/${id}/`,
    PRODUITS_EN_RUPTURE: '/inventory/produits/en_rupture/',
    PRODUITS_STOCK_FAIBLE: '/inventory/produits/stock_faible/',
    
    // ----- CATÉGORIES -----
    CATEGORIES: '/inventory/categories/',
    CATEGORIES_DETAIL: (id) => `/inventory/categories/${id}/`,
    
    // ----- VENTES -----
    VENTES: '/inventory/ventes/',
    VENTES_DETAIL: (id) => `/inventory/ventes/${id}/`,
    
    // ----- CLIENTS -----
    CLIENTS: '/inventory/clients/',
    CLIENTS_DETAIL: (id) => `/inventory/clients/${id}/`,
    
    // ----- MOUVEMENTS STOCK -----
    MOUVEMENTS_STOCK: '/inventory/mouvements-stock/',
    MOUVEMENTS_STATS: '/inventory/mouvements-stock/stats/',
  },
};

export default API_CONFIG;