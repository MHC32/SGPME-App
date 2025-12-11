/**
 * DONNÉES MOCK - ENTREPRISES
 * 
 * Structure backend : Entreprise (pas de Store !)
 * 
 * ⚠️ IMPORTANT :
 * - Une entreprise = UN SEUL module_actif
 * - Pas de stores multiples avec modules différents
 * - Les users sont liés directement à l'entreprise
 */

// ============================================================================
// 🏢 ENTREPRISES
// ============================================================================

/**
 * Liste de toutes les entreprises
 * Correspond au modèle backend : core.Entreprise
 */
export const mockEntreprises = [
  // PHARMACIES (3 entreprises différentes)
  {
    id: 1,
    nom: 'Pharmacie SoSa',
    module_actif: 'pharmacie',
    adresse: '123 Rue Delmas 33, Port-au-Prince, Haiti',
    telephone: '+509 2812-3456',
    email: 'contact@pharmasosa.ht',
    statut: 'actif',
    date_creation: '2024-01-15T10:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/pharma-sosa.jpg'),
  },
  {
    id: 2,
    nom: 'Pharmacie Santé Plus',
    module_actif: 'pharmacie',
    adresse: '78 Avenue Jean-Paul II, Turgeau, Haiti',
    telephone: '+509 2823-7890',
    email: 'info@santeplus.ht',
    statut: 'actif',
    date_creation: '2024-03-20T09:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/pharma-sante.png'),
  },
  {
    id: 3,
    nom: 'Pharmacie Nouvelle Vie',
    module_actif: 'pharmacie',
    adresse: '56 Rue Capois, Port-au-Prince, Haiti',
    telephone: '+509 2845-1122',
    email: 'contact@nouvellevie.ht',
    statut: 'actif',
    date_creation: '2024-02-10T11:30:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/pharma-nouvellevie.png'),
  },
  
  // RESTAURANTS (3 entreprises différentes)
  {
    id: 4,
    nom: 'Restaurant Ti Mouche',
    module_actif: 'restaurant',
    adresse: '56 Rue Delmas 31, Port-au-Prince, Haiti',
    telephone: '+509 2834-5678',
    email: 'info@timouche.ht',
    statut: 'actif',
    date_creation: '2024-01-05T08:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/resto-timouche.png'),
  },
  {
    id: 5,
    nom: 'Saveurs Créoles',
    module_actif: 'restaurant',
    adresse: '89 Rue Pavée, Cap-Haïtien, Haiti',
    telephone: '+509 2867-9012',
    email: 'contact@saveurscreoles.ht',
    statut: 'actif',
    date_creation: '2024-02-25T10:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/resto-saveurs.png'),
  },
  {
    id: 6,
    nom: 'Chez Marie Restaurant',
    module_actif: 'restaurant',
    adresse: '34 Route de Tabarre, Tabarre, Haiti',
    telephone: '+509 2878-3344',
    email: 'info@chezmarie.ht',
    statut: 'actif',
    date_creation: '2024-04-12T09:30:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/resto-chezmarie.png'),
  },
  
  // DÉPÔTS (2 entreprises)
  {
    id: 7,
    nom: 'Dépôt Lamour',
    module_actif: 'depot',
    adresse: '234 Route de Croix-des-Bouquets, Haiti',
    telephone: '+509 2889-5566',
    email: 'depot@lamour.ht',
    statut: 'actif',
    date_creation: '2024-01-20T07:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/depot-lamour.png'),
  },
  {
    id: 8,
    nom: 'Bon Marché',
    module_actif: 'depot',
    adresse: '45 Rue des Miracles, Carrefour, Haiti',
    telephone: '+509 2890-7788',
    email: 'contact@bonmarche.ht',
    statut: 'actif',
    date_creation: '2024-03-15T08:30:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/depot-bonmarche.png'),
  },
  
  // SHOPS (2 entreprises)
  {
    id: 9,
    nom: 'Boutique Moderne',
    module_actif: 'shop',
    adresse: '67 Rue Capois, Port-au-Prince, Haiti',
    telephone: '+509 2901-9900',
    email: 'info@boutiquemoderne.ht',
    statut: 'actif',
    date_creation: '2024-02-28T10:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/shop-moderne.png'),
  },
  {
    id: 10,
    nom: 'Fashion Plus',
    module_actif: 'shop',
    adresse: '23 Rue Geffrard, Pétion-Ville, Haiti',
    telephone: '+509 2912-1122',
    email: 'contact@fashionplus.ht',
    statut: 'actif',
    date_creation: '2024-04-05T11:00:00Z',
    date_expiration: '2025-12-31',
    logo: require('../../assets/images/logos/shop-fashion.png'),
  },
];

// ============================================================================
// 📊 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère une entreprise par son ID
 * @param {number} id - ID de l'entreprise
 * @returns {object|undefined} Entreprise trouvée
 */
export const getEntrepriseById = (id) => {
  return mockEntreprises.find(e => e.id === id);
};

/**
 * Récupère les entreprises par module
 * @param {string} module - Module ('pharmacie', 'restaurant', 'depot', 'shop')
 * @returns {Array} Liste des entreprises
 */
export const getEntreprisesByModule = (module) => {
  return mockEntreprises.filter(e => e.module_actif === module);
};

/**
 * Récupère les entreprises actives
 * @returns {Array} Liste des entreprises actives
 */
export const getEntreprisesActives = () => {
  return mockEntreprises.filter(e => e.statut === 'actif');
};

/**
 * Vérifie si une entreprise est active
 * @param {number} id - ID de l'entreprise
 * @returns {boolean}
 */
export const isEntrepriseActive = (id) => {
  const entreprise = getEntrepriseById(id);
  return entreprise ? entreprise.statut === 'actif' : false;
};

// ============================================================================
// 📊 STATISTIQUES
// ============================================================================

console.log('✅ Données mock entreprises chargées :');
console.log(`   💊 Pharmacies : ${getEntreprisesByModule('pharmacie').length} entreprises`);
console.log(`   🍽️ Restaurants : ${getEntreprisesByModule('restaurant').length} entreprises`);
console.log(`   📦 Dépôts : ${getEntreprisesByModule('depot').length} entreprises`);
console.log(`   👕 Shops : ${getEntreprisesByModule('shop').length} entreprises`);
console.log(`   📊 TOTAL : ${mockEntreprises.length} entreprises`);