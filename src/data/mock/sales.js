/**
 * DONNÉES MOCK - VENTES
 * 
 * Structure backend : Vente avec numero, sous_total, taxe, remise, mode_paiement, statut
 * 
 * ⚠️ IMPORTANT :
 * - numero (pas saleNumber)
 * - sous_total (pas subtotal)
 * - taxe (pas tax)
 * - remise (nouveau)
 * - mode_paiement: 'especes', 'carte', 'mobile' (pas 'cash', 'card')
 * - statut: 'en_cours', 'validee', 'annulee' (pas 'pending', 'completed', 'cancelled')
 * - client (ID client, nullable)
 * - vendeur (ID user)
 * - Lié à entreprise (pas businessType)
 */

// ============================================================================
// 💰 VENTES
// ============================================================================

/**
 * Liste de toutes les ventes
 * Correspond au modèle backend : inventory.Vente + inventory.LigneVente
 */
export const mockVentes = [
  // ============================================================================
  // PHARMACIE SOSA (entreprise_id: 1)
  // ============================================================================
  {
    id: 1,
    entreprise: 1,
    numero: 'V-PHARM001-0001',
    client: 1, // Jean Dubois
    vendeur: 1, // Marie Louis
    
    sous_total: 450.00,
    taxe: 45.00,
    remise: 0.00,
    total: 495.00,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-12-03T14:30:00Z',
    date_modification: '2025-12-03T14:30:00Z',
    
    // Lignes de vente
    lignes: [
      {
        id: 1,
        produit: 1, // Aspirine 500mg
        quantite: 10,
        prix_unitaire: 45.00,
        remise: 0.00,
        total: 450.00,
      },
    ],
  },
  {
    id: 2,
    entreprise: 1,
    numero: 'V-PHARM001-0002',
    client: 2, // Marie Laurent
    vendeur: 2, // Jean Pierre
    
    sous_total: 385.00,
    taxe: 38.50,
    remise: 20.00,
    total: 403.50,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: 'Cliente fidèle - remise de 20 HTG',
    
    date_creation: '2025-12-03T10:15:00Z',
    date_modification: '2025-12-03T10:15:00Z',
    
    lignes: [
      {
        id: 2,
        produit: 2, // Paracétamol 1000mg
        quantite: 5,
        prix_unitaire: 55.00,
        remise: 0.00,
        total: 275.00,
      },
      {
        id: 3,
        produit: 3, // Amoxicilline 500mg
        quantite: 1,
        prix_unitaire: 120.00,
        remise: 10.00,
        total: 110.00,
      },
    ],
  },
  {
    id: 3,
    entreprise: 1,
    numero: 'V-PHARM001-0003',
    client: null, // Pas de client enregistré
    vendeur: 1, // Marie Louis
    
    sous_total: 250.00,
    taxe: 25.00,
    remise: 0.00,
    total: 275.00,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-12-02T16:45:00Z',
    date_modification: '2025-12-02T16:45:00Z',
    
    lignes: [
      {
        id: 4,
        produit: 5, // Thermomètre digital
        quantite: 1,
        prix_unitaire: 250.00,
        remise: 0.00,
        total: 250.00,
      },
    ],
  },
  {
    id: 4,
    entreprise: 1,
    numero: 'V-PHARM001-0004',
    client: 3, // Paul Charles
    vendeur: 2, // Jean Pierre
    
    sous_total: 1200.00,
    taxe: 120.00,
    remise: 0.00,
    total: 1320.00,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-12-01T11:20:00Z',
    date_modification: '2025-12-01T11:20:00Z',
    
    lignes: [
      {
        id: 5,
        produit: 6, // Tensiomètre automatique
        quantite: 1,
        prix_unitaire: 1200.00,
        remise: 0.00,
        total: 1200.00,
      },
    ],
  },
  {
    id: 5,
    entreprise: 1,
    numero: 'V-PHARM001-0005',
    client: null,
    vendeur: 1, // Marie Louis
    
    sous_total: 330.00,
    taxe: 33.00,
    remise: 0.00,
    total: 363.00,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-11-30T09:10:00Z',
    date_modification: '2025-11-30T09:10:00Z',
    
    lignes: [
      {
        id: 6,
        produit: 4, // Vitamine C 1000mg
        quantite: 2,
        prix_unitaire: 165.00,
        remise: 0.00,
        total: 330.00,
      },
    ],
  },
  
  // ============================================================================
  // PHARMACIE SANTÉ PLUS (entreprise_id: 2)
  // ============================================================================
  {
    id: 6,
    entreprise: 2,
    numero: 'V-PHARM002-0001',
    client: 4, // Claire Joseph
    vendeur: 4, // Rose Dameus
    
    sous_total: 545.00,
    taxe: 54.50,
    remise: 0.00,
    total: 599.50,
    
    mode_paiement: 'carte',
    statut: 'validee',
    
    notes: 'Paiement par carte bancaire',
    
    date_creation: '2025-12-03T15:30:00Z',
    date_modification: '2025-12-03T15:30:00Z',
    
    lignes: [
      {
        id: 7,
        produit: 11, // Multivitamines
        quantite: 1,
        prix_unitaire: 245.00,
        remise: 0.00,
        total: 245.00,
      },
      {
        id: 8,
        produit: 12, // Ginseng 500mg
        quantite: 1,
        prix_unitaire: 300.00,
        remise: 0.00,
        total: 300.00,
      },
    ],
  },
  {
    id: 7,
    entreprise: 2,
    numero: 'V-PHARM002-0002',
    client: 5, // André Michel
    vendeur: 5, // Paul Michel
    
    sous_total: 560.00,
    taxe: 56.00,
    remise: 30.00,
    total: 586.00,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: 'Remise fidélité appliquée',
    
    date_creation: '2025-12-02T14:20:00Z',
    date_modification: '2025-12-02T14:20:00Z',
    
    lignes: [
      {
        id: 9,
        produit: 12, // Ginseng 500mg
        quantite: 1,
        prix_unitaire: 300.00,
        remise: 15.00,
        total: 285.00,
      },
      {
        id: 10,
        produit: 13, // Curcuma Bio
        quantite: 1,
        prix_unitaire: 260.00,
        remise: 15.00,
        total: 245.00,
      },
      {
        id: 11,
        produit: 9, // Ibuprofène 400mg
        quantite: 1,
        prix_unitaire: 70.00,
        remise: 0.00,
        total: 70.00,
      },
    ],
  },
  
  // ============================================================================
  // PHARMACIE NOUVELLE VIE (entreprise_id: 3)
  // ============================================================================
  {
    id: 8,
    entreprise: 3,
    numero: 'V-PHARM003-0001',
    client: 6, // Sophie Pierre
    vendeur: 6, // Josette Pierre
    
    sous_total: 247.00,
    taxe: 24.70,
    remise: 0.00,
    total: 271.70,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-12-03T13:45:00Z',
    date_modification: '2025-12-03T13:45:00Z',
    
    lignes: [
      {
        id: 12,
        produit: 14, // Doliprane 500mg
        quantite: 3,
        prix_unitaire: 52.00,
        remise: 0.00,
        total: 156.00,
      },
      {
        id: 13,
        produit: 16, // Vitamine D3
        quantite: 1,
        prix_unitaire: 195.00,
        remise: 10.00,
        total: 185.00,
      },
    ],
  },
  
  // ============================================================================
  // RESTAURANT TI MOUCHE (entreprise_id: 4)
  // ============================================================================
  {
    id: 9,
    entreprise: 4,
    numero: 'V-REST004-0001',
    client: 7, // Jean-Claude François
    vendeur: 7, // Frantz Bernard
    
    sous_total: 600.00,
    taxe: 60.00,
    remise: 0.00,
    total: 660.00,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-12-03T18:20:00Z',
    date_modification: '2025-12-03T18:20:00Z',
    
    lignes: [
      {
        id: 14,
        produit: 19, // Griyo ak Bannann
        quantite: 2,
        prix_unitaire: 250.00,
        remise: 0.00,
        total: 500.00,
      },
      {
        id: 15,
        produit: 23, // Jus de Passion
        quantite: 1,
        prix_unitaire: 60.00,
        remise: 0.00,
        total: 60.00,
      },
      {
        id: 16,
        produit: 24, // Prestige
        quantite: 1,
        prix_unitaire: 100.00,
        remise: 0.00,
        total: 100.00,
      },
    ],
  },
  {
    id: 10,
    entreprise: 4,
    numero: 'V-REST004-0002',
    client: 8, // Nathalie Beauvais
    vendeur: 8, // Sophia Joseph
    
    sous_total: 395.00,
    taxe: 39.50,
    remise: 20.00,
    total: 414.50,
    
    mode_paiement: 'carte',
    statut: 'validee',
    
    notes: 'Cliente fidèle - remise appliquée',
    
    date_creation: '2025-12-03T17:30:00Z',
    date_modification: '2025-12-03T17:30:00Z',
    
    lignes: [
      {
        id: 17,
        produit: 17, // Salade César
        quantite: 1,
        prix_unitaire: 150.00,
        remise: 10.00,
        total: 140.00,
      },
      {
        id: 18,
        produit: 20, // Tassot Kabrit
        quantite: 1,
        prix_unitaire: 280.00,
        remise: 10.00,
        total: 270.00,
      },
    ],
  },
  {
    id: 11,
    entreprise: 4,
    numero: 'V-REST004-0003',
    client: null,
    vendeur: 7, // Frantz Bernard
    
    sous_total: 505.00,
    taxe: 50.50,
    remise: 0.00,
    total: 555.50,
    
    mode_paiement: 'especes',
    statut: 'validee',
    
    notes: '',
    
    date_creation: '2025-12-02T19:10:00Z',
    date_modification: '2025-12-02T19:10:00Z',
    
    lignes: [
      {
        id: 19,
        produit: 21, // Lambi
        quantite: 1,
        prix_unitaire: 350.00,
        remise: 0.00,
        total: 350.00,
      },
      {
        id: 20,
        produit: 22, // Douce Macoss
        quantite: 1,
        prix_unitaire: 95.00,
        remise: 0.00,
        total: 95.00,
      },
      {
        id: 21,
        produit: 23, // Jus de Passion
        quantite: 1,
        prix_unitaire: 60.00,
        remise: 0.00,
        total: 60.00,
      },
    ],
  },
  {
    id: 12,
    entreprise: 4,
    numero: 'V-REST004-0004',
    client: 9, // Patrick Desir
    vendeur: 8, // Sophia Joseph
    
    sous_total: 420.00,
    taxe: 42.00,
    remise: 0.00,
    total: 462.00,
    
    mode_paiement: 'mobile',
    statut: 'validee',
    
    notes: 'Paiement mobile money',
    
    date_creation: '2025-12-01T20:30:00Z',
    date_modification: '2025-12-01T20:30:00Z',
    
    lignes: [
      {
        id: 22,
        produit: 18, // Accra
        quantite: 2,
        prix_unitaire: 75.00,
        remise: 0.00,
        total: 150.00,
      },
      {
        id: 23,
        produit: 20, // Tassot Kabrit
        quantite: 1,
        prix_unitaire: 280.00,
        remise: 10.00,
        total: 270.00,
      },
    ],
  },
];

// ============================================================================
// 📊 FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupère une vente par son ID
 * @param {number} id - ID de la vente
 */
export const getVenteById = (id) => {
  return mockVentes.find(v => v.id === id);
};

/**
 * Récupère les ventes d'une entreprise
 * Correspond à : GET /api/inventory/ventes/?entreprise=1
 * 
 * @param {number} entrepriseId - ID de l'entreprise
 */
export const getVentesByEntreprise = (entrepriseId) => {
  return mockVentes.filter(v => v.entreprise === entrepriseId);
};

/**
 * Récupère les ventes d'un vendeur
 * @param {number} vendeurId - ID du vendeur
 */
export const getVentesByVendeur = (vendeurId) => {
  return mockVentes.filter(v => v.vendeur === vendeurId);
};

/**
 * Récupère les ventes d'un client
 * @param {number} clientId - ID du client
 */
export const getVentesByClient = (clientId) => {
  return mockVentes.filter(v => v.client === clientId);
};

/**
 * Récupère les ventes du jour
 * @param {number} entrepriseId - ID de l'entreprise
 * @param {string} date - Date au format 'YYYY-MM-DD' (optionnel, par défaut aujourd'hui)
 */
export const getVentesOfDay = (entrepriseId, date = null) => {
  const targetDate = date || new Date().toISOString().split('T')[0];
  return getVentesByEntreprise(entrepriseId).filter(v => 
    v.date_creation.startsWith(targetDate)
  );
};

/**
 * Récupère les ventes entre deux dates
 * @param {number} entrepriseId - ID de l'entreprise
 * @param {string} dateDebut - Date début au format 'YYYY-MM-DD'
 * @param {string} dateFin - Date fin au format 'YYYY-MM-DD'
 */
export const getVentesBetweenDates = (entrepriseId, dateDebut, dateFin) => {
  return getVentesByEntreprise(entrepriseId).filter(v => {
    const venteDate = v.date_creation.split('T')[0];
    return venteDate >= dateDebut && venteDate <= dateFin;
  });
};

/**
 * Calcule les statistiques de vente
 * @param {Array} ventes - Liste des ventes
 */
export const calculateVentesStats = (ventes) => {
  const total_ventes = ventes.length;
  const total_montant = ventes.reduce((sum, v) => sum + v.total, 0);
  const moyenne_vente = total_ventes > 0 ? total_montant / total_ventes : 0;
  
  return {
    total_ventes,
    total_montant: parseFloat(total_montant.toFixed(2)),
    moyenne_vente: parseFloat(moyenne_vente.toFixed(2)),
  };
};

/**
 * Génère un nouveau numéro de vente
 * @param {number} entrepriseId - ID de l'entreprise
 * @param {string} prefix - Préfixe (ex: 'V-PHARM001')
 */
export const generateNumeroVente = (entrepriseId, prefix) => {
  const ventes = getVentesByEntreprise(entrepriseId);
  const lastNumber = ventes.length;
  const newNumber = String(lastNumber + 1).padStart(4, '0');
  return `${prefix}-${newNumber}`;
};

// ============================================================================
// 📊 STATISTIQUES
// ============================================================================

const totalMontant = mockVentes.reduce((sum, v) => sum + v.total, 0);
const moyenneVente = totalMontant / mockVentes.length;

console.log('✅ Données mock ventes chargées :');
console.log(`   💰 TOTAL : ${mockVentes.length} ventes`);
console.log(`   💵 Montant total : ${totalMontant.toFixed(2)} HTG`);
console.log(`   📊 Moyenne par vente : ${moyenneVente.toFixed(2)} HTG`);
console.log(`   ✅ Validées : ${mockVentes.filter(v => v.statut === 'validee').length}`);
console.log(`   ⏳ En cours : ${mockVentes.filter(v => v.statut === 'en_cours').length}`);
console.log(`   ❌ Annulées : ${mockVentes.filter(v => v.statut === 'annulee').length}`);