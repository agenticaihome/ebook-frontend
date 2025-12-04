import ReactGA from 'react-ga4';

/**
 * Initialize Google Analytics 4
 * @param {string} measurementId - The GA4 Measurement ID (G-XXXXXXXXXX)
 */
export const initGA = (measurementId) => {
    const id = measurementId || 'G-QDYN0E69MT';
    if (id) {
        ReactGA.initialize(id);
        if (id) {
            ReactGA.initialize(id);
        }
    };

    /**
     * Log a page view
     * @param {string} path - The current path (e.g., /games)
     */
    export const logPageView = (path) => {
        ReactGA.send({ hitType: "pageview", page: path });
    };

    /**
     * Log a custom event
     * @param {string} category - The event category (e.g., 'Game', 'Purchase')
     * @param {string} action - The event action (e.g., 'Start', 'Complete')
     * @param {object} label - Optional label for extra detail
     * @param {number} value - Optional numeric value
     */
    export const logEvent = (category, action, label = null, value = null) => {
        ReactGA.event({
            category,
            action,
            label,
            value,
        });
    };

    /**
     * Log a specific purchase event (Standard GA4 ecommerce event)
     * @param {object} transactionDetails - { transaction_id, value, currency, items }
     */
    export const logPurchase = (transactionDetails) => {
        ReactGA.gtag("event", "purchase", transactionDetails);
    };
