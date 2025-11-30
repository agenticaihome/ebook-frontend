import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 * Removes all HTML tags and dangerous characters
 */
export const sanitizeInput = (input) => {
    if (!input || typeof input !== 'string') return '';

    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [], // No HTML tags allowed
        ALLOWED_ATTR: [],
        KEEP_CONTENT: true // Keep text content, remove tags
    }).trim();
};

/**
 * Validate and sanitize email address
 * Returns sanitized email if valid, null otherwise
 */
export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return null;

    const sanitized = sanitizeInput(email).toLowerCase();

    // RFC 5322 compliant email regex (simplified but robust)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(sanitized)) return null;
    if (sanitized.length > 255) return null; // Email length limit

    return sanitized;
};

/**
 * Sanitize string with length limit
 */
export const sanitizeString = (input, maxLength = 500) => {
    if (!input || typeof input !== 'string') return '';

    const sanitized = sanitizeInput(input);
    return sanitized.slice(0, maxLength);
};

/**
 * Validate password strength
 * Returns { valid: boolean, message: string }
 */
export const validatePassword = (password) => {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: 'Password is required' };
    }

    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters' };
    }

    if (password.length > 128) {
        return { valid: false, message: 'Password is too long (max 128 characters)' };
    }

    // Check for at least one number and one letter
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain both letters and numbers' };
    }

    return { valid: true, message: '' };
};

/**
 * Debounce function to prevent rapid-fire submissions
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Prevent double-click exploit
 * Returns function that can only be called once within cooldown period
 */
export const preventDoubleClick = (func, cooldown = 2000) => {
    let lastCall = 0;
    let isProcessing = false;

    return async (...args) => {
        const now = Date.now();

        if (isProcessing || (now - lastCall) < cooldown) {
            console.warn('Action blocked: Too many requests');
            return;
        }

        lastCall = now;
        isProcessing = true;

        try {
            return await func(...args);
        } finally {
            // Keep processing flag for cooldown period
            setTimeout(() => {
                isProcessing = false;
            }, cooldown);
        }
    };
};
