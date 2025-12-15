/**
 * Application Configuration
 * 
 * Centralized config for version tracking, feature flags, and runtime settings.
 * APP_VERSION should be incremented on each deploy for hot-deploy detection.
 */

// Version format: MAJOR.MINOR.PATCH
// Increment on each deploy for hot-reload detection
export const APP_VERSION = '1.0.0';

// Build timestamp (set at build time via vite.config.js or manually)
export const BUILD_TIMESTAMP = '__BUILD_TIMESTAMP__';

// Feature flags
export const FEATURES = {
    CROSS_TAB_SYNC: true,
    VERSION_CHECK: true,
    ORIENTATION_PAUSE: true,
    ANALYTICS: true,
    SALES_ENABLED: true,      // Enable payment buttons and purchase flow
    PASSWORD_GATE: true,      // Enable password protection on chapters
};

// API Configuration
export const API_CONFIG = {
    TIMEOUT_MS: 30000,
    RETRY_COUNT: 3,
    RETRY_DELAY_MS: 1000,
};

// Game Configuration
export const GAME_CONFIG = {
    MAX_ACTIVE_TABS: 1,
    HEARTBEAT_INTERVAL_MS: 1000,
    STALE_TAB_THRESHOLD_MS: 3000,
};

/**
 * Check if the app version matches the expected version
 * @param {string} serverVersion - Version from server response header
 * @returns {boolean} - True if versions match
 */
export function isVersionMatch(serverVersion) {
    if (!serverVersion) return true; // No version header = assume match
    return serverVersion === APP_VERSION;
}

/**
 * Get version mismatch warning message
 */
export function getVersionMismatchMessage() {
    return 'A new version of the app is available. Please refresh to get the latest features.';
}

export default {
    APP_VERSION,
    BUILD_TIMESTAMP,
    FEATURES,
    API_CONFIG,
    GAME_CONFIG,
    isVersionMatch,
    getVersionMismatchMessage,
};
