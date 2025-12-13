/**
 * SafeStorage - A wrapper for localStorage with graceful fallback
 * Handles cases where localStorage is unavailable (incognito mode, storage quota, etc.)
 */

// In-memory fallback storage
const memoryStorage = new Map();

/**
 * Check if localStorage is available
 */
const isLocalStorageAvailable = () => {
    try {
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
};

const storageAvailable = isLocalStorageAvailable();

/**
 * Safely get an item from storage
 * @param {string} key - The key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or default
 */
export const safeGetItem = (key, defaultValue = null) => {
    try {
        if (storageAvailable) {
            const item = window.localStorage.getItem(key);
            return item !== null ? item : defaultValue;
        }
        return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue;
    } catch (e) {
        console.warn('SafeStorage: Failed to get item', key, e);
        return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue;
    }
};

/**
 * Safely set an item in storage
 * @param {string} key - The key to set
 * @param {string} value - The value to store
 * @returns {boolean} Whether the operation succeeded
 */
export const safeSetItem = (key, value) => {
    try {
        if (storageAvailable) {
            window.localStorage.setItem(key, value);
            return true;
        }
        memoryStorage.set(key, value);
        return true;
    } catch (e) {
        console.warn('SafeStorage: Failed to set item', key, e);
        // Fallback to memory storage
        memoryStorage.set(key, value);
        return false;
    }
};

/**
 * Safely remove an item from storage
 * @param {string} key - The key to remove
 * @returns {boolean} Whether the operation succeeded
 */
export const safeRemoveItem = (key) => {
    try {
        if (storageAvailable) {
            window.localStorage.removeItem(key);
        }
        memoryStorage.delete(key);
        return true;
    } catch (e) {
        console.warn('SafeStorage: Failed to remove item', key, e);
        memoryStorage.delete(key);
        return false;
    }
};

/**
 * Safely get and parse JSON from storage
 * @param {string} key - The key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist or parse fails
 * @returns {*} The parsed value or default
 */
export const safeGetJSON = (key, defaultValue = null) => {
    try {
        const item = safeGetItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
    } catch (e) {
        console.warn('SafeStorage: Failed to parse JSON', key, e);
        return defaultValue;
    }
};

/**
 * Safely stringify and set JSON in storage
 * @param {string} key - The key to set
 * @param {*} value - The value to stringify and store
 * @returns {boolean} Whether the operation succeeded
 */
export const safeSetJSON = (key, value) => {
    try {
        return safeSetItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('SafeStorage: Failed to stringify JSON', key, e);
        return false;
    }
};

/**
 * Check if localStorage is working
 * @returns {boolean}
 */
export const isStorageAvailable = () => storageAvailable;

export default {
    getItem: safeGetItem,
    setItem: safeSetItem,
    removeItem: safeRemoveItem,
    getJSON: safeGetJSON,
    setJSON: safeSetJSON,
    isAvailable: isStorageAvailable
};
