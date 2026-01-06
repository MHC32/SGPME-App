/**
 * SGPME - Configuration API
 * 
 * Configuration centralisée pour l'accès au backend Django
 */

// ⚠️ IMPORTANT : Modifier selon ton environnement
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.117:8000'  // 🔧 MODIFIE AVEC TON IP LOCALE
  : 'https://api.sgpme.com';      // URL de production

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000, // 10 secondes
  
  // ============================================================================
  // ENDPOINTS
  // ============================================================================
  
  ENDPOINTS: {
    // ----- AUTH -----
    LOGIN: '/api/auth/login/',
    REFRESH: '/api/auth/refresh/',
    REGISTER: '/api/auth/register/',
    ME: '/api/users/me/',
    CHANGE_PASSWORD: '/api/users/change_password/',
    
    // ----- PRODUITS -----
    PRODUITS_VENTE: '/api/inventory/produits/pour-vente/',
    PRODUITS: '/api/inventory/produits/',
    PRODUITS_DETAIL: (id) => `/api/inventory/produits/${id}/`,
    PRODUITS_EN_RUPTURE: '/api/inventory/produits/en_rupture/',
    PRODUITS_STOCK_FAIBLE: '/api/inventory/produits/stock_faible/',
    
    // ----- CATÉGORIES -----
    CATEGORIES: '/api/inventory/categories/',
    CATEGORIES_DETAIL: (id) => `/api/inventory/categories/${id}/`,
    
    // ----- VENTES -----
    VENTES: '/api/inventory/ventes/',
    VENTES_DETAIL: (id) => `/api/inventory/ventes/${id}/`,
    
    // ----- CLIENTS -----
    CLIENTS: '/api/inventory/clients/',
    CLIENTS_DETAIL: (id) => `/api/inventory/clients/${id}/`,
    
    // ----- MOUVEMENTS STOCK -----
    MOUVEMENTS_STOCK: '/api/inventory/mouvements-stock/',
    MOUVEMENTS_STATS: '/api/inventory/mouvements-stock/stats/',
  },
};

export default API_CONFIG;