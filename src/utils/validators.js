/**
 * SGPME - Validateurs de formulaires et données
 * 
 * Ce fichier contient toutes les fonctions de validation utilisées dans l'application
 * pour valider les formulaires, les entrées utilisateur, etc.
 */

import { REGEX, LIMITS, PRODUCT_UNITS, PAYMENT_MODES, USER_ROLES } from './constants';

// ============================================================================
// VALIDATION BASIQUE
// ============================================================================

/**
 * Vérifie si une valeur est requise (non vide)
 * @param {any} value
 * @returns {Object} {isValid: boolean, error: string}
 */
export const required = (value) => {
  const isValid =
    value !== null &&
    value !== undefined &&
    value !== '' &&
    (typeof value !== 'string' || value.trim() !== '');

  return {
    isValid,
    error: isValid ? '' : 'Ce champ est requis',
  };
};

/**
 * Vérifie la longueur minimale
 * @param {string} value
 * @param {number} minLength
 * @returns {Object}
 */
export const minLength = (value, minLength) => {
  const isValid = value && value.length >= minLength;
  return {
    isValid,
    error: isValid ? '' : `Minimum ${minLength} caractères requis`,
  };
};

/**
 * Vérifie la longueur maximale
 * @param {string} value
 * @param {number} maxLength
 * @returns {Object}
 */
export const maxLength = (value, maxLength) => {
  const isValid = !value || value.length <= maxLength;
  return {
    isValid,
    error: isValid ? '' : `Maximum ${maxLength} caractères autorisés`,
  };
};

/**
 * Vérifie si un nombre est dans une plage
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {Object}
 */
export const numberInRange = (value, min, max) => {
  const num = parseFloat(value);
  const isValid = !isNaN(num) && num >= min && num <= max;
  
  return {
    isValid,
    error: isValid ? '' : `Doit être entre ${min} et ${max}`,
  };
};

// ============================================================================
// VALIDATION EMAIL
// ============================================================================

/**
 * Valide une adresse email
 * @param {string} email
 * @returns {Object}
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'Email requis' };
  }

  const isValid = REGEX.EMAIL.test(email.trim());
  
  return {
    isValid,
    error: isValid ? '' : 'Format email invalide',
  };
};

// ============================================================================
// VALIDATION TÉLÉPHONE
// ============================================================================

/**
 * Valide un numéro de téléphone haïtien
 * @param {string} phone
 * @param {boolean} required - Si le champ est requis
 * @returns {Object}
 */
export const validatePhone = (phone, required = true) => {
  if (!phone || phone.trim() === '') {
    return {
      isValid: !required,
      error: required ? 'Numéro de téléphone requis' : '',
    };
  }

  const cleaned = phone.replace(/\s/g, '');
  const isValid = REGEX.PHONE_HT.test(cleaned) || REGEX.PHONE_SIMPLE.test(cleaned);

  return {
    isValid,
    error: isValid ? '' : 'Format de téléphone invalide (8 chiffres)',
  };
};

/**
 * Formate un numéro de téléphone haïtien
 * @param {string} phone
 * @returns {string}
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  // Si commence par 509, on garde
  if (cleaned.startsWith('509') && cleaned.length === 11) {
    return `+509 ${cleaned.substring(3, 7)} ${cleaned.substring(7)}`;
  }
  
  // Sinon, on formate les 8 chiffres
  if (cleaned.length === 8) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4)}`;
  }
  
  return phone;
};

// ============================================================================
// VALIDATION MOT DE PASSE
// ============================================================================

/**
 * Valide un mot de passe
 * @param {string} password
 * @returns {Object}
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Mot de passe requis' };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Le mot de passe doit contenir au moins 8 caractères',
    };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLower || !hasUpper || !hasNumber) {
    return {
      isValid: false,
      error: 'Le mot de passe doit contenir : minuscules, majuscules et chiffres',
    };
  }

  return { isValid: true, error: '' };
};

/**
 * Vérifie la correspondance de deux mots de passe
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {Object}
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  const isValid = password === confirmPassword;
  
  return {
    isValid,
    error: isValid ? '' : 'Les mots de passe ne correspondent pas',
  };
};

/**
 * Calcule la force d'un mot de passe
 * @param {string} password
 * @returns {Object} {score: number (0-4), label: string, color: string}
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { score: 0, label: '', color: '#9CA3AF' };
  }

  let score = 0;

  // Longueur
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Caractères
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const strength = [
    { label: 'Très faible', color: '#EF4444' },
    { label: 'Faible', color: '#F59E0B' },
    { label: 'Moyen', color: '#F59E0B' },
    { label: 'Bon', color: '#10B981' },
    { label: 'Excellent', color: '#10B981' },
  ];

  return { score, ...strength[Math.min(score, 4)] };
};

// ============================================================================
// VALIDATION USERNAME
// ============================================================================

/**
 * Valide un nom d'utilisateur
 * @param {string} username
 * @returns {Object}
 */
export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, error: "Nom d'utilisateur requis" };
  }

  if (username.length < 3) {
    return {
      isValid: false,
      error: "Minimum 3 caractères",
    };
  }

  if (username.length > 20) {
    return {
      isValid: false,
      error: "Maximum 20 caractères",
    };
  }

  const isValid = REGEX.USERNAME.test(username);

  return {
    isValid,
    error: isValid ? '' : 'Lettres, chiffres, tirets et underscores uniquement',
  };
};

// ============================================================================
// VALIDATION PRODUIT
// ============================================================================

/**
 * Valide le code d'un produit
 * @param {string} code
 * @returns {Object}
 */
export const validateCodeProduit = (code) => {
  if (!code) {
    return { isValid: false, error: 'Code produit requis' };
  }

  const isValid = REGEX.CODE_PRODUIT.test(code.trim().toUpperCase());

  return {
    isValid,
    error: isValid ? '' : 'Format invalide (ex: PROD-001, ASP500)',
  };
};

/**
 * Valide le prix d'un produit
 * @param {number} prix
 * @param {string} label - 'achat' ou 'vente'
 * @returns {Object}
 */
export const validatePrix = (prix, label = 'vente') => {
  if (prix === null || prix === undefined || prix === '') {
    return { isValid: false, error: `Prix de ${label} requis` };
  }

  const num = parseFloat(prix);

  if (isNaN(num)) {
    return { isValid: false, error: 'Prix invalide' };
  }

  if (num <= 0) {
    return { isValid: false, error: 'Le prix doit être supérieur à 0' };
  }

  return { isValid: true, error: '' };
};

/**
 * Valide que prix_vente > prix_achat
 * @param {number} prix_vente
 * @param {number} prix_achat
 * @returns {Object}
 */
export const validatePrixMargin = (prix_vente, prix_achat) => {
  const vente = parseFloat(prix_vente);
  const achat = parseFloat(prix_achat);

  if (isNaN(vente) || isNaN(achat)) {
    return { isValid: true, error: '' }; // On valide séparément
  }

  const isValid = vente >= achat;

  return {
    isValid,
    error: isValid ? '' : 'Le prix de vente doit être supérieur au prix d\'achat',
  };
};

/**
 * Valide le stock d'un produit
 * @param {number} stock
 * @returns {Object}
 */
export const validateStock = (stock) => {
  if (stock === null || stock === undefined || stock === '') {
    return { isValid: false, error: 'Stock requis' };
  }

  const num = parseFloat(stock);

  if (isNaN(num)) {
    return { isValid: false, error: 'Stock invalide' };
  }

  if (num < 0) {
    return { isValid: false, error: 'Le stock ne peut pas être négatif' };
  }

  return { isValid: true, error: '' };
};

/**
 * Valide l'unité d'un produit
 * @param {string} unite
 * @returns {Object}
 */
export const validateUnite = (unite) => {
  if (!unite) {
    return { isValid: false, error: 'Unité requise' };
  }

  const isValid = Object.values(PRODUCT_UNITS).includes(unite);

  return {
    isValid,
    error: isValid ? '' : 'Unité invalide',
  };
};

// ============================================================================
// VALIDATION VENTE
// ============================================================================

/**
 * Valide une quantité
 * @param {number} quantite
 * @returns {Object}
 */
export const validateQuantite = (quantite) => {
  if (quantite === null || quantite === undefined || quantite === '') {
    return { isValid: false, error: 'Quantité requise' };
  }

  const num = parseFloat(quantite);

  if (isNaN(num)) {
    return { isValid: false, error: 'Quantité invalide' };
  }

  if (num <= 0) {
    return { isValid: false, error: 'La quantité doit être supérieure à 0' };
  }

  if (num > LIMITS.MAX_QUANTITY_PER_ITEM) {
    return {
      isValid: false,
      error: `Maximum ${LIMITS.MAX_QUANTITY_PER_ITEM} unités`,
    };
  }

  return { isValid: true, error: '' };
};

/**
 * Valide la disponibilité du stock pour une quantité
 * @param {number} quantite
 * @param {number} stock_actuel
 * @returns {Object}
 */
export const validateStockDisponibilite = (quantite, stock_actuel) => {
  const qty = parseFloat(quantite);
  const stock = parseFloat(stock_actuel);

  if (isNaN(qty) || isNaN(stock)) {
    return { isValid: true, error: '' }; // Validation séparée
  }

  const isValid = qty <= stock;

  return {
    isValid,
    error: isValid ? '' : `Stock insuffisant (disponible: ${stock})`,
  };
};

/**
 * Valide une remise
 * @param {number} remise
 * @returns {Object}
 */
export const validateRemise = (remise) => {
  if (remise === null || remise === undefined || remise === '') {
    return { isValid: true, error: '' }; // Remise optionnelle
  }

  const num = parseFloat(remise);

  if (isNaN(num)) {
    return { isValid: false, error: 'Remise invalide' };
  }

  if (num < 0 || num > 100) {
    return {
      isValid: false,
      error: 'La remise doit être entre 0 et 100%',
    };
  }

  return { isValid: true, error: '' };
};

/**
 * Valide un mode de paiement
 * @param {string} mode
 * @returns {Object}
 */
export const validatePaymentMode = (mode) => {
  if (!mode) {
    return { isValid: false, error: 'Mode de paiement requis' };
  }

  const isValid = Object.values(PAYMENT_MODES).includes(mode);

  return {
    isValid,
    error: isValid ? '' : 'Mode de paiement invalide',
  };
};

/**
 * Valide un panier avant checkout
 * @param {Array} cart
 * @returns {Object}
 */
export const validateCart = (cart) => {
  if (!Array.isArray(cart) || cart.length === 0) {
    return {
      isValid: false,
      error: 'Le panier est vide',
    };
  }

  if (cart.length > LIMITS.MAX_CART_ITEMS) {
    return {
      isValid: false,
      error: `Maximum ${LIMITS.MAX_CART_ITEMS} articles dans le panier`,
    };
  }

  // Vérifie chaque article
  for (const item of cart) {
    const qtyValidation = validateQuantite(item.quantite);
    if (!qtyValidation.isValid) {
      return qtyValidation;
    }

    const stockValidation = validateStockDisponibilite(
      item.quantite,
      item.stock_actuel
    );
    if (!stockValidation.isValid) {
      return {
        isValid: false,
        error: `${item.nom}: ${stockValidation.error}`,
      };
    }
  }

  return { isValid: true, error: '' };
};

// ============================================================================
// VALIDATION CLIENT
// ============================================================================

/**
 * Valide les données d'un client
 * @param {Object} clientData
 * @returns {Object} {isValid: boolean, errors: Object}
 */
export const validateClient = (clientData) => {
  const errors = {};

  // Nom
  const nomValidation = required(clientData.nom);
  if (!nomValidation.isValid) {
    errors.nom = nomValidation.error;
  }

  // Prénom (optionnel)
  
  // Téléphone
  const phoneValidation = validatePhone(clientData.telephone, false);
  if (!phoneValidation.isValid) {
    errors.telephone = phoneValidation.error;
  }

  // Email (optionnel)
  if (clientData.email) {
    const emailValidation = validateEmail(clientData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ============================================================================
// VALIDATION UTILISATEUR
// ============================================================================

/**
 * Valide les données d'inscription/création utilisateur
 * @param {Object} userData
 * @returns {Object}
 */
export const validateUserRegistration = (userData) => {
  const errors = {};

  // Username
  const usernameValidation = validateUsername(userData.username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error;
  }

  // Email
  const emailValidation = validateEmail(userData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Mot de passe
  const passwordValidation = validatePassword(userData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  // Confirmation mot de passe
  if (userData.confirmPassword) {
    const matchValidation = validatePasswordMatch(
      userData.password,
      userData.confirmPassword
    );
    if (!matchValidation.isValid) {
      errors.confirmPassword = matchValidation.error;
    }
  }

  // Prénom
  const firstNameValidation = required(userData.first_name);
  if (!firstNameValidation.isValid) {
    errors.first_name = firstNameValidation.error;
  }

  // Nom
  const lastNameValidation = required(userData.last_name);
  if (!lastNameValidation.isValid) {
    errors.last_name = lastNameValidation.error;
  }

  // Téléphone (optionnel)
  if (userData.telephone) {
    const phoneValidation = validatePhone(userData.telephone, false);
    if (!phoneValidation.isValid) {
      errors.telephone = phoneValidation.error;
    }
  }

  // Rôle
  if (userData.role) {
    const isValidRole = Object.values(USER_ROLES).includes(userData.role);
    if (!isValidRole) {
      errors.role = 'Rôle invalide';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valide les données de connexion
 * @param {Object} loginData
 * @returns {Object}
 */
export const validateLogin = (loginData) => {
  const errors = {};

  // Username
  const usernameValidation = required(loginData.username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error;
  }

  // Password
  const passwordValidation = required(loginData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ============================================================================
// VALIDATION FORMULAIRE GÉNÉRIQUE
// ============================================================================

/**
 * Valide un formulaire avec des règles personnalisées
 * @param {Object} formData
 * @param {Object} rules - {field: [validator1, validator2]}
 * @returns {Object}
 */
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const validators = rules[field];
    const value = formData[field];

    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        errors[field] = result.error;
        break; // Arrête à la première erreur
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================
export default {
  // Basique
  required,
  minLength,
  maxLength,
  numberInRange,
  
  // Email
  validateEmail,
  
  // Téléphone
  validatePhone,
  formatPhone,
  
  // Mot de passe
  validatePassword,
  validatePasswordMatch,
  getPasswordStrength,
  
  // Username
  validateUsername,
  
  // Produit
  validateCodeProduit,
  validatePrix,
  validatePrixMargin,
  validateStock,
  validateUnite,
  
  // Vente
  validateQuantite,
  validateStockDisponibilite,
  validateRemise,
  validatePaymentMode,
  validateCart,
  
  // Client
  validateClient,
  
  // Utilisateur
  validateUserRegistration,
  validateLogin,
  
  // Générique
  validateForm,
};