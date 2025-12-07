/**
 * SGPME - Vente Slice
 * 
 * Gère les ventes et l'historique
 * Synchronise avec le backend
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateNumeroVente } from '../../utils';

// Pour l'instant, on utilise les données mock
import { VENTES } from '../../data/sales';

// ============================================================================
// 🔐 ASYNC THUNKS
// ============================================================================

/**
 * Créer une nouvelle vente
 */
export const createVente = createAsyncThunk(
  'vente/create',
  async (venteData, { getState, rejectWithValue }) => {
    try {
      const { auth, cart } = getState();

      if (!auth.user) {
        return rejectWithValue('Non authentifié');
      }

      if (cart.items.length === 0) {
        return rejectWithValue('Panier vide');
      }

      // Prépare les données de la vente
      const total = cart.items.reduce((sum, item) => sum + item.total, 0);
      
      const vente = {
        id: `vente_${Date.now()}`, // En prod, généré par le backend
        numero_vente: generateNumeroVente(auth.user.entreprise.id, Date.now()),
        vendeur: auth.user.id,
        vendeur_nom: `${auth.user.first_name} ${auth.user.last_name}`,
        entreprise: auth.user.entreprise.id,
        client: venteData.client || null,
        client_nom: venteData.client_nom || 'Client de passage',
        date_vente: new Date().toISOString(),
        total: total,
        montant_recu: venteData.montant_recu || total,
        monnaie: venteData.monnaie || 0,
        mode_paiement: venteData.mode_paiement || 'especes',
        statut: 'validee',
        notes: venteData.notes || '',
        lignes: cart.items.map((item) => ({
          produit: item.produit,
          nom_produit: item.nom,
          quantite: item.quantite,
          prix_unitaire: item.prix_unitaire,
          remise: item.remise,
          total: item.total,
        })),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // TODO: Appel API
      // const response = await fetch('API_URL/ventes/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${auth.token}`,
      //   },
      //   body: JSON.stringify(vente),
      // });
      // const data = await response.json();

      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 500));

      return vente;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur création vente');
    }
  }
);

/**
 * Récupérer l'historique des ventes
 */
export const fetchVentes = createAsyncThunk(
  'vente/fetchAll',
  async ({ startDate, endDate, limit = 50 }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      if (!auth.user) {
        return rejectWithValue('Non authentifié');
      }

      // TODO: Appel API
      // const params = new URLSearchParams({
      //   vendeur: auth.user.id,
      //   start_date: startDate,
      //   end_date: endDate,
      //   limit,
      // });
      // const response = await fetch(`API_URL/ventes/?${params}`, {
      //   headers: { Authorization: `Bearer ${auth.token}` }
      // });
      // const data = await response.json();

      // Simulation avec données mock
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filtre les ventes du vendeur
      let ventes = VENTES.filter((v) => v.vendeur === auth.user.id);

      // Filtre par dates si spécifiées
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        ventes = ventes.filter((v) => {
          const venteDate = new Date(v.date_vente);
          return venteDate >= start && venteDate <= end;
        });
      }

      // Limite
      ventes = ventes.slice(0, limit);

      return ventes;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur chargement ventes');
    }
  }
);

/**
 * Récupérer une vente par ID
 */
export const fetchVenteById = createAsyncThunk(
  'vente/fetchById',
  async (venteId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      if (!auth.user) {
        return rejectWithValue('Non authentifié');
      }

      // TODO: Appel API
      // const response = await fetch(`API_URL/ventes/${venteId}/`, {
      //   headers: { Authorization: `Bearer ${auth.token}` }
      // });
      // const data = await response.json();

      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 300));

      const vente = VENTES.find((v) => v.id === venteId);

      if (!vente) {
        return rejectWithValue('Vente introuvable');
      }

      return vente;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Annuler une vente
 */
export const cancelVente = createAsyncThunk(
  'vente/cancel',
  async (venteId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      if (!auth.user) {
        return rejectWithValue('Non authentifié');
      }

      // TODO: Appel API
      // const response = await fetch(`API_URL/ventes/${venteId}/cancel/`, {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${auth.token}` }
      // });

      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 500));

      return venteId;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur annulation vente');
    }
  }
);

// ============================================================================
// 🏪 SLICE
// ============================================================================

const initialState = {
  ventes: [], // Liste des ventes
  currentVente: null, // Vente en cours de consultation
  loading: false,
  error: null,
  
  // Stats (optionnel)
  stats: {
    total_today: 0,
    count_today: 0,
    total_month: 0,
    count_month: 0,
  },
};

const venteSlice = createSlice({
  name: 'vente',
  initialState,
  reducers: {
    // Réinitialise l'erreur
    clearVenteError: (state) => {
      state.error = null;
    },
    
    // Sélectionne une vente
    selectVente: (state, action) => {
      state.currentVente = action.payload;
    },
    
    // Clear vente sélectionnée
    clearCurrentVente: (state) => {
      state.currentVente = null;
    },
    
    // Met à jour les stats
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // ========================================================================
    // CREATE VENTE
    // ========================================================================
    builder.addCase(createVente.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createVente.fulfilled, (state, action) => {
      state.loading = false;
      // Ajoute la vente en tête de liste
      state.ventes.unshift(action.payload);
      state.currentVente = action.payload;
      state.error = null;
    });
    builder.addCase(createVente.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ========================================================================
    // FETCH VENTES
    // ========================================================================
    builder.addCase(fetchVentes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVentes.fulfilled, (state, action) => {
      state.loading = false;
      state.ventes = action.payload;
      state.error = null;
    });
    builder.addCase(fetchVentes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ========================================================================
    // FETCH VENTE BY ID
    // ========================================================================
    builder.addCase(fetchVenteById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVenteById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVente = action.payload;
      state.error = null;
    });
    builder.addCase(fetchVenteById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ========================================================================
    // CANCEL VENTE
    // ========================================================================
    builder.addCase(cancelVente.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cancelVente.fulfilled, (state, action) => {
      state.loading = false;
      // Met à jour le statut dans la liste
      const vente = state.ventes.find((v) => v.id === action.payload);
      if (vente) {
        vente.statut = 'annulee';
      }
      // Met à jour currentVente si c'est celle-ci
      if (state.currentVente?.id === action.payload) {
        state.currentVente.statut = 'annulee';
      }
      state.error = null;
    });
    builder.addCase(cancelVente.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// ============================================================================
// 📤 EXPORTS
// ============================================================================

export const {
  clearVenteError,
  selectVente,
  clearCurrentVente,
  updateStats,
} = venteSlice.actions;

// Sélecteurs
export const selectVentes = (state) => state.vente.ventes;
export const selectCurrentVente = (state) => state.vente.currentVente;
export const selectVenteLoading = (state) => state.vente.loading;
export const selectVenteError = (state) => state.vente.error;
export const selectVenteStats = (state) => state.vente.stats;

// Sélecteurs dérivés
export const selectVentesToday = (state) => {
  const today = new Date().toISOString().split('T')[0];
  return state.vente.ventes.filter((v) =>
    v.date_vente.startsWith(today)
  );
};

export const selectTotalToday = (state) => {
  const ventesToday = selectVentesToday(state);
  return ventesToday.reduce((sum, v) => sum + v.total, 0);
};

export default venteSlice.reducer;