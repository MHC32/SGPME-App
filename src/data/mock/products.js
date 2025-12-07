/**
 * DONNÉES MOCK - PRODUITS
 * 
 * Structure backend : Produit avec prix_achat, prix_vente, unite, code, stock_minimum
 * 
 * ⚠️ IMPORTANT :
 * - prix_achat ET prix_vente (pas juste "price")
 * - unite (kg, l, unite, paquet, boite, etc)
 * - code (code-barre/SKU)
 * - stock_minimum (seuil d'alerte)
 * - Produits liés à ENTREPRISE (pas businessType)
 */

// ============================================================================
// 📦 PRODUITS
// ============================================================================

/**
 * Liste de tous les produits
 * Correspond au modèle backend : inventory.Produit
 */
export const mockProduits = [
  // ============================================================================
  // PHARMACIE SOSA (entreprise_id: 1)
  // ============================================================================
  {
    id: 1,
    entreprise: 1,
    categorie: 1, // Analgésiques
    code: 'ASPIR500',
    nom: 'Aspirine 500mg',
    description: 'Analgésique et antipyrétique - Boîte de 20 comprimés',
    image: null,
    prix_achat: 35.00,
    prix_vente: 45.00,
    unite: 'unite',
    stock_actuel: 150,
    stock_minimum: 20,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T14:20:00Z',
  },
  {
    id: 2,
    entreprise: 1,
    categorie: 1, // Analgésiques
    code: 'PARAC1000',
    nom: 'Paracétamol 1000mg',
    description: 'Analgésique et antipyrétique - Boîte de 16 comprimés',
    image: null,
    prix_achat: 40.00,
    prix_vente: 55.00,
    unite: 'unite',
    stock_actuel: 200,
    stock_minimum: 30,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T15:30:00Z',
  },
  {
    id: 3,
    entreprise: 1,
    categorie: 2, // Antibiotiques
    code: 'AMOXI500',
    nom: 'Amoxicilline 500mg',
    description: 'Antibiotique - Boîte de 12 gélules',
    image: null,
    prix_achat: 85.00,
    prix_vente: 120.00,
    unite: 'unite',
    stock_actuel: 80,
    stock_minimum: 15,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T16:10:00Z',
  },
  {
    id: 4,
    entreprise: 1,
    categorie: 3, // Vitamines
    code: 'VITC1000',
    nom: 'Vitamine C 1000mg',
    description: 'Supplément vitaminé - Boîte de 30 comprimés effervescents',
    image: null,
    prix_achat: 120.00,
    prix_vente: 165.00,
    unite: 'unite',
    stock_actuel: 60,
    stock_minimum: 10,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T11:45:00Z',
  },
  {
    id: 5,
    entreprise: 1,
    categorie: 4, // Matériel médical
    code: 'THERMO-01',
    nom: 'Thermomètre digital',
    description: 'Thermomètre électronique à usage médical',
    image: null,
    prix_achat: 180.00,
    prix_vente: 250.00,
    unite: 'unite',
    stock_actuel: 25,
    stock_minimum: 5,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T13:20:00Z',
  },
  {
    id: 6,
    entreprise: 1,
    categorie: 4, // Matériel médical
    code: 'TENSIO-01',
    nom: 'Tensiomètre automatique',
    description: 'Appareil de mesure de tension artérielle automatique',
    image: null,
    prix_achat: 900.00,
    prix_vente: 1200.00,
    unite: 'unite',
    stock_actuel: 8,
    stock_minimum: 2,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T10:30:00Z',
  },
  {
    id: 7,
    entreprise: 1,
    categorie: 5, // Premiers soins
    code: 'BAND-001',
    nom: 'Pansements adhésifs',
    description: 'Boîte de 100 pansements assortis',
    image: null,
    prix_achat: 45.00,
    prix_vente: 65.00,
    unite: 'boite',
    stock_actuel: 50,
    stock_minimum: 10,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T14:50:00Z',
  },
  {
    id: 8,
    entreprise: 1,
    categorie: 6, // Hygiène
    code: 'MASKA-001',
    nom: 'Masques chirurgicaux',
    description: 'Boîte de 50 masques chirurgicaux jetables',
    image: null,
    prix_achat: 150.00,
    prix_vente: 200.00,
    unite: 'boite',
    stock_actuel: 100,
    stock_minimum: 20,
    est_actif: true,
    date_creation: '2024-01-15T10:00:00Z',
    date_modification: '2025-12-03T15:40:00Z',
  },
  
  // ============================================================================
  // PHARMACIE SANTÉ PLUS (entreprise_id: 2)
  // ============================================================================
  {
    id: 9,
    entreprise: 2,
    categorie: 7, // Analgésiques
    code: 'IBUPRO400',
    nom: 'Ibuprofène 400mg',
    description: 'Anti-inflammatoire non stéroïdien - Boîte de 20 comprimés',
    image: null,
    prix_achat: 50.00,
    prix_vente: 70.00,
    unite: 'unite',
    stock_actuel: 120,
    stock_minimum: 20,
    est_actif: true,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2025-12-03T16:20:00Z',
  },
  {
    id: 10,
    entreprise: 2,
    categorie: 8, // Antibiotiques
    code: 'AZITH500',
    nom: 'Azithromycine 500mg',
    description: 'Antibiotique - Boîte de 3 comprimés',
    image: null,
    prix_achat: 75.00,
    prix_vente: 105.00,
    unite: 'unite',
    stock_actuel: 45,
    stock_minimum: 10,
    est_actif: true,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2025-12-03T13:40:00Z',
  },
  {
    id: 11,
    entreprise: 2,
    categorie: 9, // Vitamines
    code: 'MULTIVIT',
    nom: 'Multivitamines',
    description: 'Complexe multivitaminé - Boîte de 60 comprimés',
    image: null,
    prix_achat: 180.00,
    prix_vente: 245.00,
    unite: 'unite',
    stock_actuel: 35,
    stock_minimum: 8,
    est_actif: true,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2025-12-03T11:15:00Z',
  },
  {
    id: 12,
    entreprise: 2,
    categorie: 10, // Phytothérapie
    code: 'GINSENG',
    nom: 'Ginseng 500mg',
    description: 'Supplément naturel - Flacon de 90 gélules',
    image: null,
    prix_achat: 220.00,
    prix_vente: 300.00,
    unite: 'unite',
    stock_actuel: 20,
    stock_minimum: 5,
    est_actif: true,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2025-12-03T10:05:00Z',
  },
  {
    id: 13,
    entreprise: 2,
    categorie: 10, // Phytothérapie
    code: 'CURCUMA',
    nom: 'Curcuma Bio',
    description: 'Anti-inflammatoire naturel - Flacon de 60 gélules',
    image: null,
    prix_achat: 190.00,
    prix_vente: 260.00,
    unite: 'unite',
    stock_actuel: 28,
    stock_minimum: 6,
    est_actif: true,
    date_creation: '2024-03-20T09:00:00Z',
    date_modification: '2025-12-03T14:25:00Z',
  },
  
  // ============================================================================
  // PHARMACIE NOUVELLE VIE (entreprise_id: 3)
  // ============================================================================
  {
    id: 14,
    entreprise: 3,
    categorie: 11, // Analgésiques
    code: 'DOLIPRA',
    nom: 'Doliprane 500mg',
    description: 'Paracétamol - Boîte de 16 comprimés',
    image: null,
    prix_achat: 38.00,
    prix_vente: 52.00,
    unite: 'unite',
    stock_actuel: 95,
    stock_minimum: 15,
    est_actif: true,
    date_creation: '2024-02-10T11:30:00Z',
    date_modification: '2025-12-03T15:50:00Z',
  },
  {
    id: 15,
    entreprise: 3,
    categorie: 12, // Antibiotiques
    code: 'CEFIXIME',
    nom: 'Cefixime 200mg',
    description: 'Antibiotique - Boîte de 10 comprimés',
    image: null,
    prix_achat: 95.00,
    prix_vente: 135.00,
    unite: 'unite',
    stock_actuel: 40,
    stock_minimum: 8,
    est_actif: true,
    date_creation: '2024-02-10T11:30:00Z',
    date_modification: '2025-12-03T12:30:00Z',
  },
  {
    id: 16,
    entreprise: 3,
    categorie: 13, // Vitamines
    code: 'VITD3',
    nom: 'Vitamine D3 1000 UI',
    description: 'Supplément vitaminé - Flacon de 60 gélules',
    image: null,
    prix_achat: 145.00,
    prix_vente: 195.00,
    unite: 'unite',
    stock_actuel: 32,
    stock_minimum: 7,
    est_actif: true,
    date_creation: '2024-02-10T11:30:00Z',
    date_modification: '2025-12-03T13:15:00Z',
  },
  
  // ============================================================================
  // RESTAURANT TI MOUCHE (entreprise_id: 4)
  // ============================================================================
  {
    id: 17,
    entreprise: 4,
    categorie: 14, // Entrées
    code: 'REST-001',
    nom: 'Salade César',
    description: 'Salade fraîche avec poulet grillé et sauce César',
    image: null,
    prix_achat: 80.00,
    prix_vente: 150.00,
    unite: 'unite',
    stock_actuel: 0, // Pas de gestion stock restaurant
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T17:20:00Z',
  },
  {
    id: 18,
    entreprise: 4,
    categorie: 14, // Entrées
    code: 'REST-002',
    nom: 'Accra',
    description: 'Beignets de malanga traditionnels - Portion de 6 pièces',
    image: null,
    prix_achat: 30.00,
    prix_vente: 75.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T18:10:00Z',
  },
  {
    id: 19,
    entreprise: 4,
    categorie: 15, // Plats principaux
    code: 'REST-003',
    nom: 'Griyo ak Bannann',
    description: 'Porc frit avec bananes pesées et pikliz',
    image: null,
    prix_achat: 120.00,
    prix_vente: 250.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T17:45:00Z',
  },
  {
    id: 20,
    entreprise: 4,
    categorie: 15, // Plats principaux
    code: 'REST-004',
    nom: 'Tassot Kabrit',
    description: 'Viande de chèvre frite avec riz et légumes',
    image: null,
    prix_achat: 140.00,
    prix_vente: 280.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T16:50:00Z',
  },
  {
    id: 21,
    entreprise: 4,
    categorie: 15, // Plats principaux
    code: 'REST-005',
    nom: 'Lambi',
    description: 'Lambi créole avec riz djon-djon',
    image: null,
    prix_achat: 180.00,
    prix_vente: 350.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T15:30:00Z',
  },
  {
    id: 22,
    entreprise: 4,
    categorie: 16, // Desserts
    code: 'REST-006',
    nom: 'Douce Macoss',
    description: 'Dessert traditionnel haïtien au lait de coco',
    image: null,
    prix_achat: 40.00,
    prix_vente: 95.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T14:40:00Z',
  },
  {
    id: 23,
    entreprise: 4,
    categorie: 17, // Boissons
    code: 'REST-007',
    nom: 'Jus de Passion',
    description: 'Jus de fruit frais naturel - Grand verre',
    image: null,
    prix_achat: 20.00,
    prix_vente: 60.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T16:25:00Z',
  },
  {
    id: 24,
    entreprise: 4,
    categorie: 17, // Boissons
    code: 'REST-008',
    nom: 'Prestige',
    description: 'Bière locale - Bouteille 33cl',
    image: null,
    prix_achat: 35.00,
    prix_vente: 100.00,
    unite: 'unite',
    stock_actuel: 0,
    stock_minimum: 0,
    est_actif: true,
    date_creation: '2024-01-05T08:00:00Z',
    date_modification: '2025-12-03T18:05:00Z',
  },

  // Continuer avec les autres entreprises...
  // Je vais créer la suite dans la deuxième partie car c'est trop long

];

// ============================================================================
// 📊 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère un produit par son ID
 * @param {number} id - ID du produit
 */
export const getProduitById = (id) => {
  return mockProduits.find(p => p.id === id);
};

/**
 * Récupère les produits d'une entreprise
 * Correspond à : GET /api/inventory/produits/?entreprise=1
 * 
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getProduitsByEntreprise = (entrepriseId) => {
  return mockProduits.filter(p => p.entreprise === entrepriseId);
};

/**
 * Récupère les produits d'une catégorie
 * @param {number} categorieId - ID de la catégorie
 */
export const getProduitsByCategorie = (categorieId) => {
  return mockProduits.filter(p => p.categorie === categorieId);
};

/**
 * Recherche de produits par nom ou code
 * @param {number} entrepriseId - ID de l'entreprise
 * @param {string} searchTerm - Terme de recherche
 */
export const searchProduits = (entrepriseId, searchTerm) => {
  const produits = getProduitsByEntreprise(entrepriseId);
  const term = searchTerm.toLowerCase();
  return produits.filter(p => 
    p.nom.toLowerCase().includes(term) ||
    p.code.toLowerCase().includes(term)
  );
};

/**
 * Récupère les produits en rupture de stock
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getProduitsEnRupture = (entrepriseId) => {
  return getProduitsByEntreprise(entrepriseId).filter(p => p.stock_actuel <= 0);
};

/**
 * Récupère les produits avec stock faible (sous le minimum)
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getProduitsStockFaible = (entrepriseId) => {
  return getProduitsByEntreprise(entrepriseId).filter(
    p => p.stock_actuel > 0 && p.stock_actuel <= p.stock_minimum
  );
};

// ============================================================================
// 📊 STATISTIQUES
// ============================================================================

console.log('✅ Données mock produits chargées :');
console.log(`   📦 TOTAL : ${mockProduits.length} produits`);
console.log(`   ⚠️  Stock faible : ${mockProduits.filter(p => p.stock_actuel > 0 && p.stock_actuel <= p.stock_minimum).length}`);
console.log(`   ❌ Rupture stock : ${mockProduits.filter(p => p.stock_actuel <= 0).length}`);