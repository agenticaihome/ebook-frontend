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

// ==================== CONVERSION EVENTS ====================

/**
 * Log email subscription (lead generation)
 * @param {string} source - Where they signed up (splash_page, chapter3, etc.)
 */
export const logSubscription = (source) => {
    ReactGA.gtag("event", "sign_up", {
        method: 'email',
        source: source
    });

    // Also track as generate_lead for conversion value
    ReactGA.gtag("event", "generate_lead", {
        currency: 'USD',
        value: 2.00, // Estimated value of a lead
        source: source
    });
};

// ==================== ENGAGEMENT EVENTS ====================

/**
 * Log chapter start
 * @param {number} chapterNumber - Chapter 1-10
 */
export const logChapterStart = (chapterNumber) => {
    ReactGA.gtag("event", "tutorial_begin", {
        chapter_number: chapterNumber,
        chapter_name: `Chapter ${chapterNumber}`
    });
};

/**
 * Log chapter completion
 * @param {number} chapterNumber - Chapter 1-10
 */
export const logChapterComplete = (chapterNumber) => {
    ReactGA.gtag("event", "tutorial_complete", {
        chapter_number: chapterNumber,
        chapter_name: `Chapter ${chapterNumber}`
    });

    // Track milestone achievements
    if (chapterNumber === 1) {
        ReactGA.gtag("event", "unlock_achievement", { achievement_id: 'first_chapter' });
    } else if (chapterNumber === 3) {
        ReactGA.gtag("event", "unlock_achievement", { achievement_id: 'free_chapters_complete' });
    } else if (chapterNumber === 10) {
        ReactGA.gtag("event", "unlock_achievement", { achievement_id: 'all_chapters_complete' });
    }
};

/**
 * Log CTA button clicks for optimization
 * @param {string} buttonName - Button identifier
 * @param {string} location - Page location
 */
export const logButtonClick = (buttonName, location) => {
    ReactGA.gtag("event", "select_content", {
        content_type: 'button',
        content_id: buttonName,
        location: location
    });
};

/**
 * Log game plays
 * @param {string} gameId - Game identifier
 * @param {number} score - Final score
 */
export const logGamePlayed = (gameId, score) => {
    ReactGA.gtag("event", "post_score", {
        score: score,
        level: gameId,
        character: 'captain_efficiency'
    });
};

/**
 * Log share actions
 * @param {string} method - 'twitter', 'copy_link', etc.
 * @param {string} contentType - What was shared
 */
export const logShare = (method, contentType) => {
    ReactGA.gtag("event", "share", {
        method: method,
        content_type: contentType
    });
};

