/**
 * SGPME - Navigation Index
 * 
 * Export central de tous les navigators
 * 
 * Usage:
 * import AppNavigator from './navigation';
 * ou
 * import { AppNavigator, AuthNavigator, MainNavigator } from './navigation';
 */

export { default as AppNavigator } from './AppNavigator';
export { default as AuthNavigator } from './AuthNavigator';
export { default as MainNavigator } from './MainNavigator';

// Export par défaut : AppNavigator
export { default } from './AppNavigator';