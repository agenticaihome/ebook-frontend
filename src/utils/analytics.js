import ReactGA from 'react-ga4';

/**
 * Initialize Google Analytics 4
 * @param {string} measurementId - The GA4 Measurement ID (G-XXXXXXXXXX)
 */
export const initGA = (measurementId) => {
    const id = measurementId || 'G-QDYN0E69MT';
    if (id) {
        ReactGA.initialize(id, {
            gaOptions: {
                // Enable debug mode in development
                debug_mode: process.env.NODE_ENV === 'development'
            }
        });
    }
};

/**
 * Log a page view with UTM preservation
 * @param {string} path - The current path (e.g., /games)
 */
export const logPageView = (path) => {
    // Attach first-touch UTM params from session storage for attribution
    const utmParams = {
        utm_source: sessionStorage.getItem('initial_utm_source') || undefined,
        utm_medium: sessionStorage.getItem('initial_utm_medium') || undefined,
        utm_campaign: sessionStorage.getItem('initial_utm_campaign') || undefined,
        utm_content: sessionStorage.getItem('initial_utm_content') || undefined,
        utm_term: sessionStorage.getItem('initial_utm_term') || undefined
    };

    ReactGA.send({
        hitType: "pageview",
        page: path,
        ...utmParams
    });
};

/**
 * Log a custom event (GA4-native format)
 * @param {string} eventName - The event name (e.g., 'cta_click', 'game_select')
 * @param {object} params - Event parameters
 */
export const logEvent = (eventName, params = {}) => {
    ReactGA.event(eventName, params);
};

/**
 * Log a specific purchase event (Standard GA4 ecommerce event)
 * @param {object} transactionDetails - { transaction_id, value, currency, items, payment_method }
 */
export const logPurchase = (transactionDetails) => {
    ReactGA.gtag("event", "purchase", transactionDetails);
};

/**
 * Log when user views a product/item
 * @param {object} itemDetails - { currency, value, items }
 */
export const logViewItem = (itemDetails) => {
    ReactGA.gtag("event", "view_item", itemDetails);
};

/**
 * Log when user adds item to cart
 * @param {object} itemDetails - { currency, value, items }
 */
export const logAddToCart = (itemDetails) => {
    ReactGA.gtag("event", "add_to_cart", itemDetails);
};

/**
 * Log when checkout process begins
 * @param {object} itemDetails - { currency, value, items }
 */
export const logBeginCheckout = (itemDetails) => {
    ReactGA.gtag("event", "begin_checkout", itemDetails);
};
