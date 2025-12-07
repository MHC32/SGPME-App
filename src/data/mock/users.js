/**
 * DONNÉES MOCK - UTILISATEURS
 * 
 * Structure backend : User lié à Entreprise (pas de Store)
 * 
 * ⚠️ IMPORTANT :
 * - Rôles backend : 'super_admin', 'proprietaire', 'vendeur'
 * - User lié directement à entreprise (pas de storeId)
 * - Seuls les vendeurs peuvent se connecter à l'app mobile
 */

import { mockEntreprises } from './entreprises';

// ============================================================================
// 👥 UTILISATEURS
// ============================================================================

/**
 * Liste de tous les utilisateurs
 * Correspond au modèle backend : core.User
 */
export const mockUsers = [
  // ============================================================================
  // PHARMACIE SOSA (entreprise_id: 1)
  // ============================================================================
  {
    id: 1,
    username: 'marie.louis',
    password: 'test123', // À changer en production !
    email: 'marie.louis@pharmasosa.ht',
    first_name: 'Marie',
    last_name: 'Louis',
    role: 'vendeur', // Pas "Caissier" !
    
    // Lié à l'entreprise (pas de store)
    entreprise: 1,
    
    telephone: '+509 3456-7890',
    avatar: require('../assets/images/avatars/avatar-f1.png'),
    
    is_active: true,
    date_creation: '2024-01-15T10:30:00Z',
    date_modification: '2025-12-03T14:20:00Z',
  },
  {
    id: 2,
    username: 'jean.pierre',
    password: 'test123',
    email: 'jean.pierre@pharmasosa.ht',
    first_name: 'Jean',
    last_name: 'Pierre',
    role: 'vendeur',
    
    entreprise: 1,
    
    telephone: '+509 3712-4567',
    avatar: require('../assets/images/avatars/avatar-m1.png'),
    
    is_active: true,
    date_creation: '2024-03-10T09:00:00Z',
    date_modification: '2025-12-03T16:45:00Z',
  },
  {
    id: 3,
    username: 'philippe.sosa',
    password: 'test123',
    email: 'philippe@pharmasosa.ht',
    first_name: 'Philippe',
    last_name: 'SoSa',
    role: 'proprietaire', // Propriétaire de l'entreprise
    
    entreprise: 1,
    
    telephone: '+509 3823-5555',
    avatar: require('../assets/images/avatars/avatar-m2.png'),
    
    is_active: true,
    date_creation: '2024-01-15T08:00:00Z',
    date_modification: '2025-12-03T10:00:00Z',
  },
  
  // ============================================================================
  // PHARMACIE SANTÉ PLUS (entreprise_id: 2)
  // ============================================================================
  {
    id: 4,
    username: 'rose.dameus',
    password: 'test123',
    email: 'rose.dameus@santeplus.ht',
    first_name: 'Rose',
    last_name: 'Dameus',
    role: 'vendeur',
    
    entreprise: 2,
    
    telephone: '+509 3823-5678',
    avatar: require('../assets/images/avatars/avatar-f2.png'),
    
    is_active: true,
    date_creation: '2024-03-20T10:00:00Z',
    date_modification: '2025-12-03T15:30:00Z',
  },
  {
    id: 5,
    username: 'paul.michel',
    password: 'test123',
    email: 'paul.michel@santeplus.ht',
    first_name: 'Paul',
    last_name: 'Michel',
    role: 'vendeur',
    
    entreprise: 2,
    
    telephone: '+509 3934-6789',
    avatar: require('../assets/images/avatars/avatar-m3.png'),
    
    is_active: true,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2025-12-03T12:15:00Z',
  },
  
  // ============================================================================
  // PHARMACIE NOUVELLE VIE (entreprise_id: 3)
  // ============================================================================
  {
    id: 6,
    username: 'josette.pierre',
    password: 'test123',
    email: 'josette@nouvellevie.ht',
    first_name: 'Josette',
    last_name: 'Pierre',
    role: 'vendeur',
    
    entreprise: 3,
    
    telephone: '+509 3845-7890',
    avatar: require('../assets/images/avatars/avatar-f3.png'),
    
    is_active: true,
    date_creation: '2024-02-10T09:30:00Z',
    date_modification: '2025-12-03T13:45:00Z',
  },
  
  // ============================================================================
  // RESTAURANT TI MOUCHE (entreprise_id: 4)
  // ============================================================================
  {
    id: 7,
    username: 'frantz.bernard',
    password: 'test123',
    email: 'frantz@timouche.ht',
    first_name: 'Frantz',
    last_name: 'Bernard',
    role: 'vendeur',
    
    entreprise: 4,
    
    telephone: '+509 3956-8901',
    avatar: require('../assets/images/avatars/avatar-m4.png'),
    
    is_active: true,
    date_creation: '2024-01-05T08:30:00Z',
    date_modification: '2025-12-03T18:20:00Z',
  },
  {
    id: 8,
    username: 'sophia.joseph',
    password: 'test123',
    email: 'sophia@timouche.ht',
    first_name: 'Sophia',
    last_name: 'Joseph',
    role: 'vendeur',
    
    entreprise: 4,
    
    telephone: '+509 3067-9012',
    avatar: require('../assets/images/avatars/avatar-f4.png'),
    
    is_active: true,
    date_creation: '2024-02-20T10:00:00Z',
    date_modification: '2025-12-03T17:30:00Z',
  },
  
  // ============================================================================
  // SAVEURS CRÉOLES (entreprise_id: 5)
  // ============================================================================
  {
    id: 9,
    username: 'williams.jean',
    password: 'test123',
    email: 'williams@saveurscreoles.ht',
    first_name: 'Williams',
    last_name: 'Jean',
    role: 'vendeur',
    
    entreprise: 5,
    
    telephone: '+509 3178-0123',
    avatar: require('../assets/images/avatars/avatar-m5.png'),
    
    is_active: true,
    date_creation: '2024-02-25T11:00:00Z',
    date_modification: '2025-12-03T16:00:00Z',
  },
  {
    id: 10,
    username: 'carla.francois',
    password: 'test123',
    email: 'carla@saveurscreoles.ht',
    first_name: 'Carla',
    last_name: 'François',
    role: 'vendeur',
    
    entreprise: 5,
    
    telephone: '+509 3289-1234',
    avatar: require('../assets/images/avatars/avatar-f5.png'),
    
    is_active: true,
    date_creation: '2024-03-10T09:30:00Z',
    date_modification: '2025-12-03T14:45:00Z',
  },
  
  // ============================================================================
  // CHEZ MARIE RESTAURANT (entreprise_id: 6)
  // ============================================================================
  {
    id: 11,
    username: 'marie.charles',
    password: 'test123',
    email: 'marie@chezmarie.ht',
    first_name: 'Marie',
    last_name: 'Charles',
    role: 'proprietaire', // Propriétaire
    
    entreprise: 6,
    
    telephone: '+509 3390-2345',
    avatar: require('../assets/images/avatars/avatar-f6.png'),
    
    is_active: true,
    date_creation: '2024-04-12T08:00:00Z',
    date_modification: '2025-12-03T11:00:00Z',
  },
  {
    id: 12,
    username: 'richard.louis',
    password: 'test123',
    email: 'richard@chezmarie.ht',
    first_name: 'Richard',
    last_name: 'Louis',
    role: 'vendeur',
    
    entreprise: 6,
    
    telephone: '+509 3401-3456',
    avatar: require('../assets/images/avatars/avatar-m6.png'),
    
    is_active: true,
    date_creation: '2024-04-15T10:00:00Z',
    date_modification: '2025-12-03T15:20:00Z',
  },
  
  // ============================================================================
  // DÉPÔT LAMOUR (entreprise_id: 7)
  // ============================================================================
  {
    id: 13,
    username: 'claude.lamour',
    password: 'test123',
    email: 'claude@lamour.ht',
    first_name: 'Claude',
    last_name: 'Lamour',
    role: 'proprietaire', // Propriétaire
    
    entreprise: 7,
    
    telephone: '+509 3512-4567',
    avatar: require('../assets/images/avatars/avatar-m7.png'),
    
    is_active: true,
    date_creation: '2024-01-20T07:30:00Z',
    date_modification: '2025-12-03T09:00:00Z',
  },
  {
    id: 14,
    username: 'nadege.pierre',
    password: 'test123',
    email: 'nadege@lamour.ht',
    first_name: 'Nadège',
    last_name: 'Pierre',
    role: 'vendeur',
    
    entreprise: 7,
    
    telephone: '+509 3623-5678',
    avatar: require('../assets/images/avatars/avatar-f7.png'),
    
    is_active: true,
    date_creation: '2024-02-01T08:00:00Z',
    date_modification: '2025-12-03T16:30:00Z',
  },
  {
    id: 15,
    username: 'patrick.jean',
    password: 'test123',
    email: 'patrick@lamour.ht',
    first_name: 'Patrick',
    last_name: 'Jean',
    role: 'vendeur',
    
    entreprise: 7,
    
    telephone: '+509 3734-6789',
    avatar: require('../assets/images/avatars/avatar-m8.png'),
    
    is_active: true,
    date_creation: '2024-02-15T09:00:00Z',
    date_modification: '2025-12-03T17:15:00Z',
  },
  
  // ============================================================================
  // BON MARCHÉ (entreprise_id: 8)
  // ============================================================================
  {
    id: 16,
    username: 'junior.st.vil',
    password: 'test123',
    email: 'junior@bonmarche.ht',
    first_name: 'Junior',
    last_name: 'St. Vil',
    role: 'vendeur',
    
    entreprise: 8,
    
    telephone: '+509 3845-7890',
    avatar: require('../assets/images/avatars/avatar-m9.png'),
    
    is_active: true,
    date_creation: '2024-03-15T10:00:00Z',
    date_modification: '2025-12-03T14:00:00Z',
  },
  {
    id: 17,
    username: 'louise.dubois',
    password: 'test123',
    email: 'louise@bonmarche.ht',
    first_name: 'Louise',
    last_name: 'Dubois',
    role: 'vendeur',
    
    entreprise: 8,
    
    telephone: '+509 3956-8901',
    avatar: require('../assets/images/avatars/avatar-f8.png'),
    
    is_active: true,
    date_creation: '2024-03-20T11:00:00Z',
    date_modification: '2025-12-03T15:45:00Z',
  },
  
  // ============================================================================
  // BOUTIQUE MODERNE (entreprise_id: 9)
  // ============================================================================
  {
    id: 18,
    username: 'samuel.paul',
    password: 'test123',
    email: 'samuel@boutiquemoderne.ht',
    first_name: 'Samuel',
    last_name: 'Paul',
    role: 'vendeur',
    
    entreprise: 9,
    
    telephone: '+509 3067-9012',
    avatar: require('../assets/images/avatars/avatar-m10.png'),
    
    is_active: true,
    date_creation: '2024-02-28T10:30:00Z',
    date_modification: '2025-12-03T13:20:00Z',
  },
  {
    id: 19,
    username: 'jessica.michel',
    password: 'test123',
    email: 'jessica@boutiquemoderne.ht',
    first_name: 'Jessica',
    last_name: 'Michel',
    role: 'vendeur',
    
    entreprise: 9,
    
    telephone: '+509 3178-0123',
    avatar: require('../assets/images/avatars/avatar-f9.png'),
    
    is_active: true,
    date_creation: '2024-03-05T09:00:00Z',
    date_modification: '2025-12-03T16:10:00Z',
  },
  
  // ============================================================================
  // FASHION PLUS (entreprise_id: 10)
  // ============================================================================
  {
    id: 20,
    username: 'daniel.pierre',
    password: 'test123',
    email: 'daniel@fashionplus.ht',
    first_name: 'Daniel',
    last_name: 'Pierre',
    role: 'vendeur',
    
    entreprise: 10,
    
    telephone: '+509 3289-1234',
    avatar: require('../assets/images/avatars/avatar-m11.png'),
    
    is_active: true,
    date_creation: '2024-04-05T11:30:00Z',
    date_modification: '2025-12-03T17:50:00Z',
  },
  {
    id: 21,
    username: 'sandy.joseph',
    password: 'test123',
    email: 'sandy@fashionplus.ht',
    first_name: 'Sandy',
    last_name: 'Joseph',
    role: 'vendeur',
    
    entreprise: 10,
    
    telephone: '+509 3390-2345',
    avatar: require('../assets/images/avatars/avatar-f10.png'),
    
    is_active: true,
    date_creation: '2024-04-10T10:00:00Z',
    date_modification: '2025-12-03T14:30:00Z',
  },
];

// ============================================================================
// 📊 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Authentification (mock)
 * Correspond à : POST /api/auth/login/
 * 
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {object|null} User avec infos entreprise si auth réussie, null sinon
 */
export const authenticateUser = (username, password) => {
  const user = mockUsers.find(u => u.username === username);
  
  if (!user) {
    return null;
  }
  
  if (user.password !== password) {
    return null;
  }
  
  if (!user.is_active) {
    return null;
  }
  
  // Récupérer les infos de l'entreprise
  const entreprise = mockEntreprises.find(e => e.id === user.entreprise);
  
  if (!entreprise) {
    return null;
  }
  
  // Vérifier que l'entreprise est active
  if (entreprise.statut !== 'actif') {
    return null;
  }
  
  // Ne pas retourner le password
  const { password: _, ...userWithoutPassword } = user;
  
  // Format de réponse backend JWT
  return {
    user: {
      ...userWithoutPassword,
      entreprise_detail: entreprise,
    },
    // Simuler les tokens JWT (en prod, ces tokens viennent du backend)
    access: 'mock_access_token_' + user.id,
    refresh: 'mock_refresh_token_' + user.id,
  };
};

/**
 * Récupère un utilisateur par son ID
 * @param {number} id - ID de l'utilisateur
 */
export const getUserById = (id) => {
  return mockUsers.find(u => u.id === id);
};

/**
 * Récupère les utilisateurs d'une entreprise
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getUsersByEntreprise = (entrepriseId) => {
  return mockUsers.filter(u => u.entreprise === entrepriseId);
};

/**
 * Récupère les vendeurs (seuls ceux qui peuvent se connecter à l'app mobile)
 */
export const getVendeurs = () => {
  return mockUsers.filter(u => u.role === 'vendeur');
};

/**
 * Récupère les propriétaires
 */
export const getProprietaires = () => {
  return mockUsers.filter(u => u.role === 'proprietaire');
};

// ============================================================================
// 📊 STATISTIQUES
// ============================================================================

console.log('✅ Données mock utilisateurs chargées :');
console.log(`   👤 Vendeurs : ${getVendeurs().length} utilisateurs`);
console.log(`   👔 Propriétaires : ${getProprietaires().length} utilisateurs`);
console.log(`   📊 TOTAL : ${mockUsers.length} utilisateurs`);