import { getCart, saveCart, getFavorites, saveFavorites as saveFavoritesToStorage, getLoginStatus, setLoginStatus } from './src/storage.js';
/**
 * A utility module for interacting with localStorage.
 * This centralizes all storage keys and logic.
 */

const CART_KEY = 'mor_cart';
const FAVORITES_KEY = 'mor_favorites';
const LOGIN_STATUS_KEY = 'mor_user_loggedin';

/**
 * Retrieves and parses a JSON item from localStorage.
 * @param {string} key The key of the item to retrieve.
 * @returns {any | null} The parsed item, or null if not found or on error.
 */
const getJSON = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error getting item ${key} from localStorage`, error);
        return null;
    }
};

/**
 * Stringifies and sets a JSON item in localStorage.
 * @param {string} key The key of the item to set.
 * @param {any} value The value to set.
 */
const setJSON = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item ${key} in localStorage`, error);
    }
};

// --- Exported Functions ---

export const getCart = () => getJSON(CART_KEY) || [];
export const saveCart = (cartItems) => setJSON(CART_KEY, cartItems);

export const getFavorites = () => getJSON(FAVORITES_KEY) || [];
export const saveFavorites = (favoriteItems) => setJSON(FAVORITES_KEY, favoriteItems);

export const getLoginStatus = () => localStorage.getItem(LOGIN_STATUS_KEY) === 'true';
export const setLoginStatus = (isLoggedIn) => localStorage.setItem(LOGIN_STATUS_KEY, String(isLoggedIn));