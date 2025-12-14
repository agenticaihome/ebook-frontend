/**
 * TypedStorage - A typed, validated localStorage wrapper
 * Prevents crashes from corrupted data and provides automatic recovery
 * 
 * Features:
 * - Type-safe getters with validation
 * - Automatic recovery to defaults on corruption
 * - Single error log per key (no spam)
 * - Schema versioning for migrations
 * - Write throttling to prevent excessive writes
 */

// Track which keys have already logged errors (prevent spam)
const errorLoggedKeys = new Set();

// In-memory fallback when localStorage is unavailable
const memoryFallback = new Map();

// Throttle tracking for write operations
const writeTimestamps = new Map();
const WRITE_THROTTLE_MS = 100; // Minimum ms between writes to same key

/**
 * Check if localStorage is available
 */
const isStorageAvailable = (() => {
    try {
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
})();

/**
 * Log an error only once per key to prevent console spam
 */
const logOnce = (key, message, error) => {
    if (!errorLoggedKeys.has(key)) {
        errorLoggedKeys.add(key);
        console.warn(`[TypedStorage] ${message} for key "${key}":`, error?.message || error);
    }
};

/**
 * Get a raw string value from storage
 */
export const getString = (key, defaultValue = '') => {
    try {
        if (!isStorageAvailable) {
            return memoryFallback.get(key) ?? defaultValue;
        }
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (e) {
        logOnce(key, 'Failed to read', e);
        return memoryFallback.get(key) ?? defaultValue;
    }
};

/**
 * Get a boolean value from storage
 */
export const getBoolean = (key, defaultValue = false) => {
    const value = getString(key, null);
    if (value === null) return defaultValue;
    return value === 'true';
};

/**
 * Get a number value from storage
 */
export const getNumber = (key, defaultValue = 0) => {
    const value = getString(key, null);
    if (value === null) return defaultValue;
    const parsed = Number(value);
    if (isNaN(parsed)) {
        logOnce(key, 'Invalid number value, resetting to default', value);
        removeKey(key);
        return defaultValue;
    }
    return parsed;
};

/**
 * Get and parse JSON from storage with validation
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist or parse fails
 * @param {function} [validator] - Optional validation function (returns true if valid)
 */
export const getJSON = (key, defaultValue = null, validator = null) => {
    try {
        if (!isStorageAvailable) {
            return memoryFallback.get(key) ?? defaultValue;
        }

        const raw = localStorage.getItem(key);
        if (raw === null) return defaultValue;

        const parsed = JSON.parse(raw);

        // Run validator if provided
        if (validator && !validator(parsed)) {
            logOnce(key, 'Validation failed, resetting to default', 'Invalid structure');
            removeKey(key);
            return defaultValue;
        }

        return parsed;
    } catch (e) {
        logOnce(key, 'Failed to parse JSON, resetting to default', e);
        // Remove corrupted data
        removeKey(key);
        return defaultValue;
    }
};

/**
 * Set a string value in storage
 */
export const setString = (key, value) => {
    try {
        if (!isStorageAvailable) {
            memoryFallback.set(key, value);
            return true;
        }
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        logOnce(key, 'Failed to write', e);
        memoryFallback.set(key, value);
        return false;
    }
};

/**
 * Set a boolean value in storage
 */
export const setBoolean = (key, value) => {
    return setString(key, value ? 'true' : 'false');
};

/**
 * Set a number value in storage
 */
export const setNumber = (key, value) => {
    return setString(key, String(value));
};

/**
 * Set a JSON value in storage with optional throttling
 * @param {string} key - Storage key
 * @param {*} value - Value to stringify and store
 * @param {boolean} [throttle=false] - If true, rate-limit writes
 */
export const setJSON = (key, value, throttle = false) => {
    try {
        // Throttle check
        if (throttle) {
            const lastWrite = writeTimestamps.get(key) || 0;
            const now = Date.now();
            if (now - lastWrite < WRITE_THROTTLE_MS) {
                return true; // Skip write, still considered success
            }
            writeTimestamps.set(key, now);
        }

        const stringified = JSON.stringify(value);

        if (!isStorageAvailable) {
            memoryFallback.set(key, value);
            return true;
        }

        localStorage.setItem(key, stringified);
        return true;
    } catch (e) {
        logOnce(key, 'Failed to write JSON', e);
        memoryFallback.set(key, value);
        return false;
    }
};

/**
 * Remove a key from storage
 */
export const removeKey = (key) => {
    try {
        if (isStorageAvailable) {
            localStorage.removeItem(key);
        }
        memoryFallback.delete(key);
        return true;
    } catch (e) {
        logOnce(key, 'Failed to remove', e);
        return false;
    }
};

/**
 * Check if a key exists in storage
 */
export const hasKey = (key) => {
    try {
        if (!isStorageAvailable) {
            return memoryFallback.has(key);
        }
        return localStorage.getItem(key) !== null;
    } catch (e) {
        return memoryFallback.has(key);
    }
};

// ===================
// SCHEMA-VALIDATED STORAGE KEYS
// These are the app-specific typed getters/setters
// ===================

/**
 * User state with validation
 */
const DEFAULT_USER_STATE = {
    persona: 'general',
    name: '',
    progress: {},
    unlockedBadges: [],
    quizResults: null,
    lastVisit: Date.now()
};

export const getUserState = () => {
    return getJSON('agentic_user_state', DEFAULT_USER_STATE, (data) => {
        // Basic structure validation
        return data && typeof data === 'object' && 'persona' in data;
    });
};

export const setUserState = (state) => {
    return setJSON('agentic_user_state', { ...DEFAULT_USER_STATE, ...state });
};

/**
 * Payment status (Stripe)
 */
export const getStripePayment = () => {
    return getJSON('stripe_payment', null, (data) => {
        return data && typeof data === 'object';
    });
};

export const setStripePayment = (payment) => {
    return setJSON('stripe_payment', payment);
};

/**
 * Payment status (Ergo)
 */
export const getErgoPayment = () => {
    return getJSON('ergo_payment', null, (data) => {
        return data && typeof data === 'object';
    });
};

export const setErgoPayment = (payment) => {
    return setJSON('ergo_payment', payment);
};

/**
 * Beta access flag
 */
export const getBetaAccess = () => {
    return getBoolean('beta_access', false);
};

export const setBetaAccess = (hasAccess) => {
    return setBoolean('beta_access', hasAccess);
};

/**
 * Unlocked cards (for agent wallet)
 */
export const getUnlockedCards = () => {
    return getJSON('unlocked_cards', [], Array.isArray);
};

export const setUnlockedCards = (cards) => {
    return setJSON('unlocked_cards', cards);
};

/**
 * Completed chapters
 */
export const getCompletedChapters = () => {
    return getJSON('completed_chapters', [], Array.isArray);
};

export const setCompletedChapters = (chapters) => {
    return setJSON('completed_chapters', chapters);
};

/**
 * Part unlock status
 */
export const isPartUnlocked = (partNumber) => {
    return getBoolean(`unlocked_part_${partNumber}`, false);
};

export const setPartUnlocked = (partNumber, unlocked = true) => {
    return setBoolean(`unlocked_part_${partNumber}`, unlocked);
};

/**
 * Game high scores
 */
export const getHighScore = (gameId) => {
    return getNumber(`highscore_${gameId}`, 0);
};

export const setHighScore = (gameId, score) => {
    const current = getHighScore(gameId);
    if (score > current) {
        return setNumber(`highscore_${gameId}`, score);
    }
    return true;
};

/**
 * Game-specific best scores
 */
export const getGameBest = (gameId) => {
    return getNumber(`${gameId}_best`, 0);
};

export const setGameBest = (gameId, score) => {
    return setNumber(`${gameId}_best`, score);
};

/**
 * Calendar defense personal best (JSON format)
 */
export const getCalendarBest = () => {
    return getJSON('calendarBest', { score: 0, survived: false }, (data) => {
        return data && typeof data.score === 'number';
    });
};

export const setCalendarBest = (best) => {
    return setJSON('calendarBest', best);
};

/**
 * Triage game personal best (JSON format)
 */
export const getTriageBest = () => {
    return getJSON('triageBest', { score: 0, accuracy: 0 }, (data) => {
        return data && typeof data.score === 'number';
    });
};

export const setTriageBest = (best) => {
    return setJSON('triageBest', best);
};

/**
 * Captain Click high score (simple number)
 */
export const getCaptainClickBest = () => {
    return getNumber('captainClickHighScore', 0);
};

export const setCaptainClickBest = (score) => {
    return setNumber('captainClickHighScore', score);
};

/**
 * Deep work dive best score (simple number with legacy key)
 */
export const getDeepWorkBest = () => {
    return getNumber('deepwork_best', 0);
};

export const setDeepWorkBest = (score) => {
    return setNumber('deepwork_best', score);
};

/**
 * Sound preferences
 */
export const getSoundEnabled = () => {
    return getBoolean('sound_enabled', true);
};

export const setSoundEnabled = (enabled) => {
    return setBoolean('sound_enabled', enabled);
};

export const getGameSoundEnabled = () => {
    return getBoolean('game_sound_enabled', true);
};

export const setGameSoundEnabled = (enabled) => {
    return setBoolean('game_sound_enabled', enabled);
};

/**
 * Cookie consent
 */
export const getCookieConsent = () => {
    return getString('cookie_consent', null);
};

export const setCookieConsent = (status) => {
    return setString('cookie_consent', status);
};

/**
 * Welcome modal seen flag
 */
export const hasSeenWelcomeModal = () => {
    return getBoolean('welcome_modal_seen', false);
};

export const setWelcomeModalSeen = () => {
    return setBoolean('welcome_modal_seen', true);
};

/**
 * Graduation status
 */
export const hasGraduated = () => {
    return getBoolean('graduated', false);
};

export const setGraduated = () => {
    return setBoolean('graduated', true);
};

export const getCommanderName = () => {
    return getString('commander_name', '');
};

export const setCommanderName = (name) => {
    return setString('commander_name', name);
};

/**
 * Last visited route (for resume functionality)
 */
export const getLastVisitedRoute = () => {
    return getString('last_visited_route', null);
};

export const setLastVisitedRoute = (route) => {
    return setString('last_visited_route', route);
};

/**
 * Chapter-specific flags
 */
export const hasSeenChapterConfetti = (chapterNum) => {
    return getBoolean(`chapter${chapterNum}_confetti_seen`, false);
};

export const setChapterConfettiSeen = (chapterNum) => {
    return setBoolean(`chapter${chapterNum}_confetti_seen`, true);
};

/**
 * Token (legacy - should migrate to httpOnly cookies)
 */
export const getToken = () => {
    return getString('token', null);
};

export const setToken = (token) => {
    return setString('token', token);
};

export const removeToken = () => {
    return removeKey('token');
};

/**
 * User email
 */
export const getUserEmail = () => {
    return getString('user_email', '');
};

export const setUserEmail = (email) => {
    return setString('user_email', email);
};

/**
 * Chaos calculator state
 */
export const getChaosCalcState = () => {
    return getJSON('chaos_calc_state', null);
};

export const setChaosCalcState = (state, throttle = true) => {
    return setJSON('chaos_calc_state', state, throttle);
};

/**
 * Daily challenge completion
 */
export const getDailyChallengeCompletion = (dateKey) => {
    return getString(dateKey, null);
};

export const setDailyChallengeCompletion = (dateKey, score) => {
    return setString(dateKey, String(score));
};

// Default export with all functions
export default {
    // Primitives
    getString,
    getBoolean,
    getNumber,
    getJSON,
    setString,
    setBoolean,
    setNumber,
    setJSON,
    removeKey,
    hasKey,

    // App-specific
    getUserState,
    setUserState,
    getStripePayment,
    setStripePayment,
    getErgoPayment,
    setErgoPayment,
    getBetaAccess,
    setBetaAccess,
    getUnlockedCards,
    setUnlockedCards,
    getCompletedChapters,
    setCompletedChapters,
    isPartUnlocked,
    setPartUnlocked,
    getHighScore,
    setHighScore,
    getGameBest,
    setGameBest,
    getCalendarBest,
    setCalendarBest,
    getTriageBest,
    setTriageBest,
    getCaptainClickBest,
    setCaptainClickBest,
    getDeepWorkBest,
    setDeepWorkBest,
    getSoundEnabled,
    setSoundEnabled,
    getGameSoundEnabled,
    setGameSoundEnabled,
    getCookieConsent,
    setCookieConsent,
    hasSeenWelcomeModal,
    setWelcomeModalSeen,
    hasGraduated,
    setGraduated,
    getCommanderName,
    setCommanderName,
    getLastVisitedRoute,
    setLastVisitedRoute,
    hasSeenChapterConfetti,
    setChapterConfettiSeen,
    getToken,
    setToken,
    removeToken,
    getUserEmail,
    setUserEmail,
    getChaosCalcState,
    setChaosCalcState,
    getDailyChallengeCompletion,
    setDailyChallengeCompletion,
};
