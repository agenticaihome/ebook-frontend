/**
 * Centralized Logger for Production Observability
 * 
 * Provides structured logging for events and errors with:
 * - Automatic context (appVersion, route, timestamp)
 * - Error deduplication (same error within 5s ignored)
 * - Error classification into categories
 * - Provider-agnostic (swap to Sentry/Mixpanel later)
 * 
 * @usage
 * import { logEvent, logError, ERROR_CATEGORY } from './logger';
 * logEvent('page_view', { route: '/games' });
 * logError(err, { component: 'GameLoader' });
 */

import { APP_VERSION } from '../config/appConfig';

// ===================
// ERROR CATEGORIES
// ===================
export const ERROR_CATEGORY = {
    NETWORK: 'NETWORK',           // Fetch failed, no connection
    TIMEOUT: 'TIMEOUT',           // Request timeout
    BAD_RESPONSE: 'BAD_RESPONSE', // Invalid JSON, malformed response
    STATE_RACE: 'STATE_RACE',     // setState after unmount
    STORAGE: 'STORAGE',           // localStorage error
    ROUTING: 'ROUTING',           // Navigation/route error
    RENDER: 'RENDER',             // Component crash
    PAYMENT: 'PAYMENT',           // Payment processing error
    UNKNOWN: 'UNKNOWN',           // Unclassified
};

// ===================
// DEDUPLICATION
// ===================
const recentErrors = new Map(); // key -> timestamp
const DEDUP_WINDOW_MS = 5000; // 5 seconds

function getErrorKey(err, context) {
    return `${err?.message || 'unknown'}::${context?.component || 'global'}`;
}

function isDuplicate(key) {
    const lastSeen = recentErrors.get(key);
    const now = Date.now();

    if (lastSeen && now - lastSeen < DEDUP_WINDOW_MS) {
        return true;
    }

    recentErrors.set(key, now);

    // Clean old entries
    if (recentErrors.size > 50) {
        const cutoff = now - DEDUP_WINDOW_MS;
        for (const [k, v] of recentErrors) {
            if (v < cutoff) recentErrors.delete(k);
        }
    }

    return false;
}

// ===================
// CONTEXT HELPERS
// ===================
function getBaseContext() {
    return {
        appVersion: APP_VERSION,
        timestamp: new Date().toISOString(),
        route: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 100) : 'unknown',
    };
}

function getStatusBucket(status) {
    if (!status) return 'unknown';
    if (status >= 200 && status < 300) return '2xx';
    if (status >= 400 && status < 500) return '4xx';
    if (status >= 500) return '5xx';
    return 'other';
}

// ===================
// ERROR CLASSIFICATION
// ===================
export function classifyError(err) {
    if (!err) return ERROR_CATEGORY.UNKNOWN;

    const message = (err.message || '').toLowerCase();
    const name = (err.name || '').toLowerCase();

    // Network errors
    if (name === 'typeerror' && message.includes('fetch')) {
        return ERROR_CATEGORY.NETWORK;
    }
    if (message.includes('network') || message.includes('failed to fetch')) {
        return ERROR_CATEGORY.NETWORK;
    }

    // Timeout
    if (message.includes('timeout') || name === 'aborterror') {
        return ERROR_CATEGORY.TIMEOUT;
    }

    // Bad response
    if (message.includes('json') || message.includes('unexpected token')) {
        return ERROR_CATEGORY.BAD_RESPONSE;
    }

    // State race (React unmounted component)
    if (message.includes('unmounted') || message.includes('can\'t perform')) {
        return ERROR_CATEGORY.STATE_RACE;
    }

    // Storage
    if (message.includes('localstorage') || message.includes('quota')) {
        return ERROR_CATEGORY.STORAGE;
    }

    // Routing
    if (message.includes('route') || message.includes('navigate')) {
        return ERROR_CATEGORY.ROUTING;
    }

    // Render (usually caught by ErrorBoundary)
    if (err.componentStack || message.includes('render')) {
        return ERROR_CATEGORY.RENDER;
    }

    // Payment
    if (message.includes('payment') || message.includes('stripe') || message.includes('ergo')) {
        return ERROR_CATEGORY.PAYMENT;
    }

    return ERROR_CATEGORY.UNKNOWN;
}

// ===================
// MAIN LOGGING FUNCTIONS
// ===================

/**
 * Log a structured event
 * @param {string} eventName - Event name (e.g., 'page_view', 'game_start')
 * @param {Object} payload - Event-specific data
 */
export function logEvent(eventName, payload = {}) {
    const event = {
        event: eventName,
        ...getBaseContext(),
        ...payload,
    };

    // In production, send to analytics provider
    // For now, use console.info with structured format
    if (process.env.NODE_ENV === 'production') {
        // Future: send to analytics endpoint
        // analytics.track(eventName, event);

        // For now, minimal console output
        console.info(`[Event] ${eventName}`, JSON.stringify(payload));
    } else {
        // Dev: full output
        console.info(`[Event] ${eventName}`, event);
    }

    return event;
}

/**
 * Log an error with context and classification
 * @param {Error} err - The error object
 * @param {Object} context - Additional context (component, action, etc.)
 */
export function logError(err, context = {}) {
    const errorKey = getErrorKey(err, context);

    // Deduplicate rapid-fire errors
    if (isDuplicate(errorKey)) {
        return null;
    }

    const category = classifyError(err);

    const errorLog = {
        event: 'error',
        category,
        message: err?.message || 'Unknown error',
        name: err?.name || 'Error',
        ...getBaseContext(),
        ...context,
        // Don't include full stack in prod (privacy + size)
        ...(process.env.NODE_ENV !== 'production' && { stack: err?.stack }),
    };

    // In production, send to error tracking
    if (process.env.NODE_ENV === 'production') {
        // Future: send to Sentry/LogRocket
        // Sentry.captureException(err, { extra: errorLog });

        console.error(`[Error:${category}] ${err?.message}`, { context });
    } else {
        console.error(`[Error:${category}]`, errorLog, err);
    }

    return errorLog;
}

/**
 * Log API errors with endpoint info
 * @param {string} endpoint - API endpoint label (not full URL)
 * @param {Error} err - The error
 * @param {number} status - HTTP status code
 */
export function logApiError(endpoint, err, status) {
    return logEvent('api_error', {
        endpoint,
        statusBucket: getStatusBucket(status),
        category: classifyError(err),
        message: err?.message,
    });
}

/**
 * Log a UI crash from ErrorBoundary
 * @param {Error} error - The error
 * @param {Object} errorInfo - React error info with componentStack
 */
export function logUICrash(error, errorInfo) {
    return logEvent('ui_crash', {
        message: error?.message,
        category: ERROR_CATEGORY.RENDER,
        // Truncate component stack for safety
        componentStack: errorInfo?.componentStack?.slice(0, 500),
    });
}

/**
 * Log performance degradation
 * @param {string} metric - What degraded (pageLoad, fps, etc.)
 * @param {number} value - The measured value
 */
export function logPerfDegraded(metric, value) {
    return logEvent('perf_degraded', {
        metric,
        value,
        deviceMemory: navigator?.deviceMemory || 'unknown',
        hardwareConcurrency: navigator?.hardwareConcurrency || 'unknown',
    });
}

// ===================
// GLOBAL ERROR HANDLERS
// ===================

/**
 * Install global error handlers
 * Call this once on app init
 */
export function installGlobalErrorHandlers() {
    if (typeof window === 'undefined') return;

    // Unhandled JS errors
    window.onerror = (message, source, lineno, colno, error) => {
        logError(error || new Error(message), {
            source: 'window.onerror',
            file: source?.split('/').pop(), // Just filename, not full path
            line: lineno,
        });
        return false; // Don't suppress default handling
    };

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        const error = event.reason instanceof Error
            ? event.reason
            : new Error(String(event.reason));

        logError(error, {
            source: 'unhandledrejection',
        });
    });

    console.info('[Logger] Global error handlers installed');
}

export default {
    logEvent,
    logError,
    logApiError,
    logUICrash,
    logPerfDegraded,
    classifyError,
    installGlobalErrorHandlers,
    ERROR_CATEGORY,
};
