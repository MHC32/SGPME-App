/**
 * DONNÉES MOCK - CLIENTS
 * 
 * Structure backend : Client avec système de fidélité
 * 
 * ⚠️ NOUVEAU : Le backend a un système de clients
 * - Points de fidélité
 * - Total des achats
 * - Historique
 */

// ============================================================================
// 👥 CLIENTS
// ============================================================================

/**
 * Liste de tous les clients
 * Correspond au modèle backend : inventory.Client
 */
export const mockClients = [
  // ============================================================================
  // PHARMACIE SOSA (entreprise_id: 1)
  // ============================================================================
  {
    id: 1,
    entreprise: 1,
    nom: 'Dubois',
    prenom: 'Jean',
    telephone: '+509 3712-1234',
    email: 'jean.dubois@email.ht',
    adresse: '45 Rue de la Paix, Port-au-Prince',
    points_fidelite: 120,
    total_achats: 5600.00,
    notes: 'Client régulier depuis janvier 2024',
    date_creation: '2024-02-15T10:00:00Z',
    date_modification: '2025-12-03T14:30:00Z',
  },
  {
    id: 2,
    entreprise: 1,
    nom: 'Laurent',
    prenom: 'Marie',
    telephone: '+509 3823-5678',
    email: 'marie.laurent@email.ht',
    adresse: '78 Avenue Martin Luther King, Delmas',
    points_fidelite: 85,
    total_achats: 3200.00,
    notes: '',
    date_creation: '2024-03-20T11:30:00Z',
    date_modification: '2025-12-03T15:45:00Z',
  },
  {
    id: 3,
    entreprise: 1,
    nom: 'Charles',
    prenom: 'Paul',
    telephone: '+509 3934-6789',
    email: '',
    adresse: '12 Rue Lamarre, Port-au-Prince',
    points_fidelite: 45,
    total_achats: 1800.00,
    notes: 'Préfère payer en espèces',
    date_creation: '2024-05-10T09:00:00Z',
    date_modification: '2025-12-03T10:20:00Z',
  },
  
  // ============================================================================
  // PHARMACIE SANTÉ PLUS (entreprise_id: 2)
  // ============================================================================
  {
    id: 4,
    entreprise: 2,
    nom: 'Joseph',
    prenom: 'Claire',
    telephone: '+509 3045-7890',
    email: 'claire.joseph@email.ht',
    adresse: '34 Rue des Casernes, Pétion-Ville',
    points_fidelite: 150,
    total_achats: 7200.00,
    notes: 'Cliente VIP',
    date_creation: '2024-04-01T10:00:00Z',
    date_modification: '2025-12-03T16:10:00Z',
  },
  {
    id: 5,
    entreprise: 2,
    nom: 'Michel',
    prenom: 'André',
    telephone: '+509 3156-8901',
    email: 'andre.michel@email.ht',
    adresse: '89 Rue Grégoire, Turgeau',
    points_fidelite: 92,
    total_achats: 4100.00,
    notes: '',
    date_creation: '2024-05-15T11:00:00Z',
    date_modification: '2025-12-03T13:30:00Z',
  },
  
  // ============================================================================
  // PHARMACIE NOUVELLE VIE (entreprise_id: 3)
  // ============================================================================
  {
    id: 6,
    entreprise: 3,
    nom: 'Pierre',
    prenom: 'Sophie',
    telephone: '+509 3267-9012',
    email: 'sophie.pierre@email.ht',
    adresse: '56 Rue Capois, Port-au-Prince',
    points_fidelite: 78,
    total_achats: 3500.00,
    notes: '',
    date_creation: '2024-03-25T09:30:00Z',
    date_modification: '2025-12-03T14:50:00Z',
  },
  
  // ============================================================================
  // RESTAURANT TI MOUCHE (entreprise_id: 4)
  // ============================================================================
  {
    id: 7,
    entreprise: 4,
    nom: 'François',
    prenom: 'Jean-Claude',
    telephone: '+509 3378-0123',
    email: 'jcfrancois@email.ht',
    adresse: '90 Delmas 32, Port-au-Prince',
    points_fidelite: 200,
    total_achats: 12500.00,
    notes: 'Client fidèle, vient toutes les semaines',
    date_creation: '2024-01-20T10:00:00Z',
    date_modification: '2025-12-03T18:20:00Z',
  },
  {
    id: 8,
    entreprise: 4,
    nom: 'Beauvais',
    prenom: 'Nathalie',
    telephone: '+509 3489-1234',
    email: 'nathalie.beauvais@email.ht',
    adresse: '23 Rue Grégoire, Pétion-Ville',
    points_fidelite: 165,
    total_achats: 9800.00,
    notes: 'Préfère les plats végétariens',
    date_creation: '2024-02-10T11:00:00Z',
    date_modification: '2025-12-03T17:45:00Z',
  },
  {
    id: 9,
    entreprise: 4,
    nom: 'Desir',
    prenom: 'Patrick',
    telephone: '+509 3590-2345',
    email: '',
    adresse: '78 Route de Tabarre, Tabarre',
    points_fidelite: 110,
    total_achats: 6700.00,
    notes: '',
    date_creation: '2024-03-15T09:00:00Z',
    date_modification: '2025-12-03T16:30:00Z',
  },
  
  // ============================================================================
  // SAVEURS CRÉOLES (entreprise_id: 5)
  // ============================================================================
  {
    id: 10,
    entreprise: 5,
    nom: 'Etienne',
    prenom: 'Rose',
    telephone: '+509 3601-3456',
    email: 'rose.etienne@email.ht',
    adresse: '12 Rue Pavée, Cap-Haïtien',
    points_fidelite: 95,
    total_achats: 5400.00,
    notes: 'Aime les plats épicés',
    date_creation: '2024-03-01T10:00:00Z',
    date_modification: '2025-12-03T15:20:00Z',
  },
  {
    id: 11,
    entreprise: 5,
    nom: 'Moreau',
    prenom: 'Jacques',
    telephone: '+509 3712-4567',
    email: 'jacques.moreau@email.ht',
    adresse: '45 Avenue Christophe, Cap-Haïtien',
    points_fidelite: 135,
    total_achats: 7800.00,
    notes: 'Client depuis l\'ouverture',
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2025-12-03T14:00:00Z',
  },
  
  // ============================================================================
  // CHEZ MARIE RESTAURANT (entreprise_id: 6)
  // ============================================================================
  {
    id: 12,
    entreprise: 6,
    nom: 'Sylvain',
    prenom: 'Christine',
    telephone: '+509 3823-5678',
    email: 'christine.sylvain@email.ht',
    adresse: '67 Route de Tabarre, Tabarre',
    points_fidelite: 180,
    total_achats: 11200.00,
    notes: 'Cliente VIP, organise souvent des événements',
    date_creation: '2024-04-15T09:00:00Z',
    date_modification: '2025-12-03T17:10:00Z',
  },
  
  // ============================================================================
  // DÉPÔT LAMOUR (entreprise_id: 7)
  // ============================================================================
  {
    id: 13,
    entreprise: 7,
    nom: 'Restaurant Le Gourmet',
    prenom: '',
    telephone: '+509 3934-6789',
    email: 'commande@legourmet.ht',
    adresse: '34 Rue des Miracles, Delmas',
    points_fidelite: 450,
    total_achats: 87500.00,
    notes: 'Client professionnel - Restaurant',
    date_creation: '2024-02-01T08:00:00Z',
    date_modification: '2025-12-03T16:45:00Z',
  },
  {
    id: 14,
    entreprise: 7,
    nom: 'Épicerie Bon Prix',
    prenom: '',
    telephone: '+509 3045-7890',
    email: 'epicerie.bonprix@email.ht',
    adresse: '90 Rue Lamarre, Carrefour',
    points_fidelite: 520,
    total_achats: 125000.00,
    notes: 'Grosse commande mensuelle',
    date_creation: '2024-01-20T07:30:00Z',
    date_modification: '2025-12-03T15:30:00Z',
  },
  {
    id: 15,
    entreprise: 7,
    nom: 'Bar Ti Coin',
    prenom: '',
    telephone: '+509 3156-8901',
    email: '',
    adresse: '12 Croix-des-Bouquets',
    points_fidelite: 380,
    total_achats: 67800.00,
    notes: 'Commande de boissons principalement',
    date_creation: '2024-03-10T09:00:00Z',
    date_modification: '2025-12-03T14:20:00Z',
  },
  
  // ============================================================================
  // BON MARCHÉ (entreprise_id: 8)
  // ============================================================================
  {
    id: 16,
    entreprise: 8,
    nom: 'Super Marché Central',
    prenom: '',
    telephone: '+509 3267-9012',
    email: 'central@supermarche.ht',
    adresse: '78 Avenue Jean-Jacques Dessalines',
    points_fidelite: 680,
    total_achats: 156000.00,
    notes: 'Plus gros client, commande hebdomadaire',
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2025-12-03T17:00:00Z',
  },
  {
    id: 17,
    entreprise: 8,
    nom: 'Hotel Caribbean',
    prenom: '',
    telephone: '+509 3378-0123',
    email: 'achat@hotelcaribbean.ht',
    adresse: '23 Pétion-Ville',
    points_fidelite: 420,
    total_achats: 98000.00,
    notes: 'Hotel 4 étoiles',
    date_creation: '2024-04-01T10:00:00Z',
    date_modification: '2025-12-03T16:20:00Z',
  },
  
  // ============================================================================
  // BOUTIQUE MODERNE (entreprise_id: 9)
  // ============================================================================
  {
    id: 18,
    entreprise: 9,
    nom: 'Alexis',
    prenom: 'Stéphanie',
    telephone: '+509 3489-1234',
    email: 'stephanie.alexis@email.ht',
    adresse: '56 Rue Capois, Port-au-Prince',
    points_fidelite: 240,
    total_achats: 15600.00,
    notes: 'Achète régulièrement des vêtements de marque',
    date_creation: '2024-03-05T10:00:00Z',
    date_modification: '2025-12-03T13:45:00Z',
  },
  {
    id: 19,
    entreprise: 9,
    nom: 'Thomas',
    prenom: 'Kévin',
    telephone: '+509 3590-2345',
    email: 'kevin.thomas@email.ht',
    adresse: '90 Delmas 31, Port-au-Prince',
    points_fidelite: 180,
    total_achats: 12400.00,
    notes: '',
    date_creation: '2024-04-10T11:00:00Z',
    date_modification: '2025-12-03T15:30:00Z',
  },
  
  // ============================================================================
  // FASHION PLUS (entreprise_id: 10)
  // ============================================================================
  {
    id: 20,
    entreprise: 10,
    nom: 'Bernard',
    prenom: 'Vanessa',
    telephone: '+509 3601-3456',
    email: 'vanessa.bernard@email.ht',
    adresse: '12 Rue Geffrard, Pétion-Ville',
    points_fidelite: 320,
    total_achats: 23400.00,
    notes: 'Cliente VIP, préfère les marques de luxe',
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2025-12-03T17:30:00Z',
  },
  {
    id: 21,
    entreprise: 10,
    nom: 'Guillaume',
    prenom: 'Marc',
    telephone: '+509 3712-4567',
    email: 'marc.guillaume@email.ht',
    adresse: '45 Pétion-Ville',
    points_fidelite: 195,
    total_achats: 14800.00,
    notes: 'Achète souvent des parfums',
    date_creation: '2024-04-20T10:00:00Z',
    date_modification: '2025-12-03T14:50:00Z',
  },
];

// ============================================================================
// 📊 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère un client par son ID
 * @param {number} id - ID du client
 */
export const getClientById = (id) => {
  return mockClients.find(c => c.id === id);
};

/**
 * Récupère les clients d'une entreprise
 * Correspond à : GET /api/inventory/clients/?entreprise=1
 * 
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getClientsByEntreprise = (entrepriseId) => {
  return mockClients.filter(c => c.entreprise === entrepriseId);
};

/**
 * Recherche de clients par nom ou téléphone
 * @param {number} entrepriseId - ID de l'entreprise
 * @param {string} searchTerm - Terme de recherche
 */
export const searchClients = (entrepriseId, searchTerm) => {
  const clients = getClientsByEntreprise(entrepriseId);
  const term = searchTerm.toLowerCase();
  return clients.filter(c => 
    c.nom.toLowerCase().includes(term) ||
    c.prenom.toLowerCase().includes(term) ||
    c.telephone.includes(term)
  );
};

/**
 * Récupère les clients VIP (plus de 10000 HTG d'achats)
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getVIPClients = (entrepriseId) => {
  return getClientsByEntreprise(entrepriseId).filter(c => c.total_achats >= 10000);
};

// ============================================================================
// 📊 STATISTIQUES
// ============================================================================

console.log('✅ Données mock clients chargées :');
console.log(`   👥 TOTAL : ${mockClients.length} clients`);
console.log(`   💎 Clients VIP (>10K HTG) : ${mockClients.filter(c => c.total_achats >= 10000).length}`);