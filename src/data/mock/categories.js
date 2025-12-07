/**
 * DONNÉES MOCK - CATÉGORIES
 * 
 * Structure backend : Catégorie liée à Entreprise
 * 
 * ⚠️ IMPORTANT :
 * - Catégories liées aux ENTREPRISES (pas aux stores)
 * - Chaque entreprise a ses propres catégories
 * - unique_together: ['entreprise', 'nom']
 */

// ============================================================================
// 📦 CATÉGORIES
// ============================================================================

/**
 * Liste de toutes les catégories
 * Correspond au modèle backend : inventory.Categorie
 */
export const mockCategories = [
  // ============================================================================
  // PHARMACIE SOSA (entreprise_id: 1)
  // ============================================================================
  {
    id: 1,
    entreprise: 1,
    nom: 'Analgésiques',
    description: 'Médicaments contre la douleur',
    image: null,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    entreprise: 1,
    nom: 'Antibiotiques',
    description: 'Médicaments contre les infections',
    image: null,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2024-01-15T10:00:00Z',
  },
  {
    id: 3,
    entreprise: 1,
    nom: 'Vitamines',
    description: 'Suppléments vitaminés',
    image: null,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2024-01-15T10:00:00Z',
  },
  {
    id: 4,
    entreprise: 1,
    nom: 'Matériel médical',
    description: 'Équipements médicaux',
    image: null,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2024-01-15T10:00:00Z',
  },
  {
    id: 5,
    entreprise: 1,
    nom: 'Premiers soins',
    description: 'Produits de premiers soins',
    image: null,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2024-01-15T10:00:00Z',
  },
  {
    id: 6,
    entreprise: 1,
    nom: 'Hygiène',
    description: 'Produits d\'hygiène',
    image: null,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2024-01-15T10:00:00Z',
  },
  
  // ============================================================================
  // PHARMACIE SANTÉ PLUS (entreprise_id: 2)
  // ============================================================================
  {
    id: 7,
    entreprise: 2,
    nom: 'Analgésiques',
    description: 'Médicaments contre la douleur',
    image: null,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2024-03-20T09:00:00Z',
  },
  {
    id: 8,
    entreprise: 2,
    nom: 'Antibiotiques',
    description: 'Médicaments contre les infections',
    image: null,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2024-03-20T09:00:00Z',
  },
  {
    id: 9,
    entreprise: 2,
    nom: 'Vitamines',
    description: 'Suppléments vitaminés',
    image: null,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2024-03-20T09:00:00Z',
  },
  {
    id: 10,
    entreprise: 2,
    nom: 'Phytothérapie',
    description: 'Produits naturels et à base de plantes',
    image: null,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2024-03-20T09:00:00Z',
  },
  
  // ============================================================================
  // PHARMACIE NOUVELLE VIE (entreprise_id: 3)
  // ============================================================================
  {
    id: 11,
    entreprise: 3,
    nom: 'Analgésiques',
    description: 'Médicaments contre la douleur',
    image: null,
    date_creation: '2024-02-10T11:30:00Z',
    date_modification: '2024-02-10T11:30:00Z',
  },
  {
    id: 12,
    entreprise: 3,
    nom: 'Antibiotiques',
    description: 'Médicaments contre les infections',
    image: null,
    date_creation: '2024-02-10T11:30:00Z',
    date_modification: '2024-02-10T11:30:00Z',
  },
  {
    id: 13,
    entreprise: 3,
    nom: 'Vitamines',
    description: 'Suppléments vitaminés',
    image: null,
    date_creation: '2024-02-10T11:30:00Z',
    date_modification: '2024-02-10T11:30:00Z',
  },
  
  // ============================================================================
  // RESTAURANT TI MOUCHE (entreprise_id: 4)
  // ============================================================================
  {
    id: 14,
    entreprise: 4,
    nom: 'Entrées',
    description: 'Entrées et amuse-bouches',
    image: null,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2024-01-05T08:00:00Z',
  },
  {
    id: 15,
    entreprise: 4,
    nom: 'Plats principaux',
    description: 'Plats principaux',
    image: null,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2024-01-05T08:00:00Z',
  },
  {
    id: 16,
    entreprise: 4,
    nom: 'Desserts',
    description: 'Desserts et sucreries',
    image: null,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2024-01-05T08:00:00Z',
  },
  {
    id: 17,
    entreprise: 4,
    nom: 'Boissons',
    description: 'Boissons',
    image: null,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2024-01-05T08:00:00Z',
  },
  {
    id: 18,
    entreprise: 4,
    nom: 'Petit-déjeuner',
    description: 'Menu petit-déjeuner',
    image: null,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2024-01-05T08:00:00Z',
  },
  
  // ============================================================================
  // SAVEURS CRÉOLES (entreprise_id: 5)
  // ============================================================================
  {
    id: 19,
    entreprise: 5,
    nom: 'Entrées',
    description: 'Entrées créoles',
    image: null,
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2024-02-25T10:00:00Z',
  },
  {
    id: 20,
    entreprise: 5,
    nom: 'Soupes',
    description: 'Soupes et bouillons',
    image: null,
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2024-02-25T10:00:00Z',
  },
  {
    id: 21,
    entreprise: 5,
    nom: 'Plats traditionnels',
    description: 'Plats traditionnels haïtiens',
    image: null,
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2024-02-25T10:00:00Z',
  },
  {
    id: 22,
    entreprise: 5,
    nom: 'Grillades',
    description: 'Viandes et poissons grillés',
    image: null,
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2024-02-25T10:00:00Z',
  },
  {
    id: 23,
    entreprise: 5,
    nom: 'Desserts',
    description: 'Desserts créoles',
    image: null,
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2024-02-25T10:00:00Z',
  },
  {
    id: 24,
    entreprise: 5,
    nom: 'Boissons',
    description: 'Boissons traditionnelles et modernes',
    image: null,
    date_creation: '2024-02-25T10:00:00Z',
    date_modification: '2024-02-25T10:00:00Z',
  },
  
  // ============================================================================
  // CHEZ MARIE RESTAURANT (entreprise_id: 6)
  // ============================================================================
  {
    id: 25,
    entreprise: 6,
    nom: 'Entrées',
    description: 'Entrées',
    image: null,
    date_creation: '2024-04-12T09:30:00Z',
    date_modification: '2024-04-12T09:30:00Z',
  },
  {
    id: 26,
    entreprise: 6,
    nom: 'Plats principaux',
    description: 'Plats principaux',
    image: null,
    date_creation: '2024-04-12T09:30:00Z',
    date_modification: '2024-04-12T09:30:00Z',
  },
  {
    id: 27,
    entreprise: 6,
    nom: 'Desserts',
    description: 'Desserts',
    image: null,
    date_creation: '2024-04-12T09:30:00Z',
    date_modification: '2024-04-12T09:30:00Z',
  },
  {
    id: 28,
    entreprise: 6,
    nom: 'Boissons',
    description: 'Boissons',
    image: null,
    date_creation: '2024-04-12T09:30:00Z',
    date_modification: '2024-04-12T09:30:00Z',
  },
  
  // ============================================================================
  // DÉPÔT LAMOUR (entreprise_id: 7)
  // ============================================================================
  {
    id: 29,
    entreprise: 7,
    nom: 'Boissons',
    description: 'Boissons en gros',
    image: null,
    date_creation: '2024-01-20T07:00:00Z',
    date_modification: '2024-01-20T07:00:00Z',
  },
  {
    id: 30,
    entreprise: 7,
    nom: 'Alimentaire',
    description: 'Produits alimentaires',
    image: null,
    date_creation: '2024-01-20T07:00:00Z',
    date_modification: '2024-01-20T07:00:00Z',
  },
  {
    id: 31,
    entreprise: 7,
    nom: 'Confiserie',
    description: 'Bonbons et confiseries',
    image: null,
    date_creation: '2024-01-20T07:00:00Z',
    date_modification: '2024-01-20T07:00:00Z',
  },
  {
    id: 32,
    entreprise: 7,
    nom: 'Hygiène',
    description: 'Produits d\'hygiène',
    image: null,
    date_creation: '2024-01-20T07:00:00Z',
    date_modification: '2024-01-20T07:00:00Z',
  },
  {
    id: 33,
    entreprise: 7,
    nom: 'Entretien',
    description: 'Produits d\'entretien',
    image: null,
    date_creation: '2024-01-20T07:00:00Z',
    date_modification: '2024-01-20T07:00:00Z',
  },
  
  // ============================================================================
  // BON MARCHÉ (entreprise_id: 8)
  // ============================================================================
  {
    id: 34,
    entreprise: 8,
    nom: 'Boissons gazeuses',
    description: 'Sodas et boissons gazeuses',
    image: null,
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2024-03-15T08:30:00Z',
  },
  {
    id: 35,
    entreprise: 8,
    nom: 'Bières',
    description: 'Bières en gros',
    image: null,
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2024-03-15T08:30:00Z',
  },
  {
    id: 36,
    entreprise: 8,
    nom: 'Alimentaire',
    description: 'Produits alimentaires',
    image: null,
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2024-03-15T08:30:00Z',
  },
  {
    id: 37,
    entreprise: 8,
    nom: 'Confiserie',
    description: 'Bonbons et chocolats',
    image: null,
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2024-03-15T08:30:00Z',
  },
  {
    id: 38,
    entreprise: 8,
    nom: 'Produits laitiers',
    description: 'Lait et produits laitiers',
    image: null,
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2024-03-15T08:30:00Z',
  },
  {
    id: 39,
    entreprise: 8,
    nom: 'Hygiène',
    description: 'Produits d\'hygiène personnelle',
    image: null,
    date_creation: '2024-03-15T08:30:00Z',
    date_modification: '2024-03-15T08:30:00Z',
  },
  
  // ============================================================================
  // BOUTIQUE MODERNE (entreprise_id: 9)
  // ============================================================================
  {
    id: 40,
    entreprise: 9,
    nom: 'Vêtements',
    description: 'Vêtements pour homme et femme',
    image: null,
    date_creation: '2024-02-28T10:00:00Z',
    date_modification: '2024-02-28T10:00:00Z',
  },
  {
    id: 41,
    entreprise: 9,
    nom: 'Chaussures',
    description: 'Chaussures et sandales',
    image: null,
    date_creation: '2024-02-28T10:00:00Z',
    date_modification: '2024-02-28T10:00:00Z',
  },
  {
    id: 42,
    entreprise: 9,
    nom: 'Accessoires',
    description: 'Accessoires de mode',
    image: null,
    date_creation: '2024-02-28T10:00:00Z',
    date_modification: '2024-02-28T10:00:00Z',
  },
  {
    id: 43,
    entreprise: 9,
    nom: 'Électronique',
    description: 'Appareils électroniques',
    image: null,
    date_creation: '2024-02-28T10:00:00Z',
    date_modification: '2024-02-28T10:00:00Z',
  },
  {
    id: 44,
    entreprise: 9,
    nom: 'Beauté',
    description: 'Produits de beauté',
    image: null,
    date_creation: '2024-02-28T10:00:00Z',
    date_modification: '2024-02-28T10:00:00Z',
  },
  
  // ============================================================================
  // FASHION PLUS (entreprise_id: 10)
  // ============================================================================
  {
    id: 45,
    entreprise: 10,
    nom: 'Vêtements Homme',
    description: 'Vêtements pour homme',
    image: null,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2024-04-05T11:00:00Z',
  },
  {
    id: 46,
    entreprise: 10,
    nom: 'Vêtements Femme',
    description: 'Vêtements pour femme',
    image: null,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2024-04-05T11:00:00Z',
  },
  {
    id: 47,
    entreprise: 10,
    nom: 'Chaussures',
    description: 'Chaussures de marque',
    image: null,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2024-04-05T11:00:00Z',
  },
  {
    id: 48,
    entreprise: 10,
    nom: 'Sacs',
    description: 'Sacs et maroquinerie',
    image: null,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2024-04-05T11:00:00Z',
  },
  {
    id: 49,
    entreprise: 10,
    nom: 'Accessoires',
    description: 'Accessoires de mode',
    image: null,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2024-04-05T11:00:00Z',
  },
  {
    id: 50,
    entreprise: 10,
    nom: 'Parfums',
    description: 'Parfums de luxe',
    image: null,
    date_creation: '2024-04-05T11:00:00Z',
    date_modification: '2024-04-05T11:00:00Z',
  },
];

// ============================================================================
// 📊 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère une catégorie par son ID
 * @param {number} id - ID de la catégorie
 */
export const getCategorieById = (id) => {
  return mockCategories.find(c => c.id === id);
};

/**
 * Récupère les catégories d'une entreprise
 * Correspond à : GET /api/inventory/categories/?entreprise=1
 * 
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getCategoriesByEntreprise = (entrepriseId) => {
  return mockCategories.filter(c => c.entreprise === entrepriseId);
};

/**
 * Recherche de catégories par nom
 * @param {number} entrepriseId - ID de l'entreprise
 * @param {string} searchTerm - Terme de recherche
 */
export const searchCategories = (entrepriseId, searchTerm) => {
  const categories = getCategoriesByEntreprise(entrepriseId);
  const term = searchTerm.toLowerCase();
  return categories.filter(c => c.nom.toLowerCase().includes(term));
};

// ============================================================================
// 📊 STATISTIQUES
// ============================================================================

console.log('✅ Données mock catégories chargées :');
console.log(`   📦 TOTAL : ${mockCategories.length} catégories`);