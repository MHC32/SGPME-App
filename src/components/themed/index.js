/**
 * SGPME - Index des composants themed
 * 
 * Export central de tous les composants UI thémés
 * 
 * Usage:
 * import { ThemedHeader, ThemedSearchBar, ThemedCategoryFilter } from '@/components/themed';
 */

// ============================================================================
// 🔍 LOGS DE DÉBOGAGE - VÉRIFICATION DES EXPORTS
// ============================================================================
console.log('🔵 [themed/index.js] Chargement du module...');
// ============================================================================

// PRIORITÉ 1 - Layout
export { default as ThemedHeader } from './ThemedHeader';
export { default as ThemedSearchBar } from './ThemedSearchBar';
export { default as ThemedCategoryFilter } from './ThemedCategoryFilter';

// PRIORITÉ 2 - Panier & Vente
export { default as ThemedCartItem } from './ThemedCartItem';
export { default as ThemedQuantityControl } from './ThemedQuantityControl';
export { default as ThemedCartSummary } from './ThemedCartSummary';
export { default as ThemedNumericKeypad } from './ThemedNumericKeypad';
export { default as ThemedPaymentSummary } from './ThemedPaymentSummary';

// PRIORITÉ 3 - Historique
export { default as ThemedSaleCard } from './ThemedSaleCard';
export { default as ThemedStatCard } from './ThemedStatCard';
export { default as ThemedReceiptPreview } from './ThemedReceiptPreview';

// PRIORITÉ 4 - UI Base
export { default as ThemedButton } from './ThemedButton';
export { default as ThemedCard } from './ThemedCard';
export { default as ThemedBadge } from './ThemedBadge';
export { default as ThemedStockBadge } from './ThemedStockBadge';
export { default as ThemedPriceDisplay } from './ThemedPriceDisplay';
export { default as ThemedEmptyState } from './ThemedEmptyState';
export { default as ThemedToast } from './ThemedToast';
export { default as ThemedLoading } from './ThemedLoading';

console.log('✅ [themed/index.js] Tous les exports configurés');