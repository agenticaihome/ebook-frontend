// Determine API URL based on current hostname (runtime check)
// This ensures production always uses Railway, local dev uses localhost
const getApiUrl = () => {
  const hostname = window.location.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocal) {
    return 'http://localhost:8080/api';
  }

  return 'https://ebook-backend-production-8f68.up.railway.app/api';
};

const API_URL = getApiUrl();

/**
 * Get CSRF token from cookie
 * Backend sets this automatically when CSRF is enabled
 */
const getCsrfToken = () => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return token || '';
};

/**
 * Get headers with CSRF token
 * No Authorization header needed - JWT is in httpOnly cookie
 */
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': getCsrfToken()
  };
};

// Import logger for structured API error tracking
import { logApiError } from '../utils/logger';

/**
 * Handle API responses with automatic redirect on 401
 * Includes safe JSON parsing and basic shape validation
 */
const handleResponse = async (response, endpointLabel = 'unknown') => {
  if (!response.ok) {
    if (response.status === 401) {
      // Clear any frontend state and redirect to login
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    const err = new Error(error.message || error.error || 'Request failed');

    // Log structured API error
    logApiError(endpointLabel, err, response.status);

    throw err;
  }

  // Safe JSON parsing with validation
  try {
    const data = await response.json();
    // Validate response is an object or array (not null/undefined)
    if (data === null || data === undefined) {
      console.warn('[API] Response was null or undefined');
      return {};
    }
    return data;
  } catch (e) {
    console.warn('[API] Failed to parse JSON response:', e);
    return {};
  }
};

export const api = {
  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },

  register: async (email, password, paymentId) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email, password, paymentId }),
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  forgotPassword: async (email) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  resetPassword: async (email, token, newPassword) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email, token, newPassword }),
    });
    return handleResponse(response);
  },

  // User
  getPurchases: async () => {
    const response = await fetch(`${API_URL}/user/purchases`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  checkAccess: async () => {
    const response = await fetch(`${API_URL}/user/access`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  updateEmail: async (email) => {
    const response = await fetch(`${API_URL}/user/update-email`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  // Ergo
  getErgoPrice: async () => {
    const response = await fetch(`${API_URL}/payment/ergo/price`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  getErgoQuote: async (amountUsd) => {
    const response = await fetch(`${API_URL}/payment/ergo/quote?amountUsd=${amountUsd}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  initiateErgoPayment: async () => {
    const response = await fetch(`${API_URL}/payment/ergo/initiate`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  claimErgoPayment: async (transactionId, accessCode) => {
    const response = await fetch(`${API_URL}/payment/ergo/claim`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ transactionId, accessCode }),
    });
    return handleResponse(response);
  },

  checkRecentErgoPayment: async (accessCode) => {
    const response = await fetch(`${API_URL}/payment/ergo/check-recent`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ accessCode }),
    });
    return handleResponse(response);
  },

  checkErgoPayment: async (requestId) => {
    const response = await fetch(`${API_URL}/payment/ergo/check-recent`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ accessCode: requestId }),
    });
    return handleResponse(response);
  },

  // Stripe
  createStripeCheckout: async (email) => {
    const response = await fetch(`${API_URL}/payment/stripe/checkout`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  verifyStripePayment: async (sessionId) => {
    const response = await fetch(`${API_URL}/payment/stripe/verify`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ sessionId }),
    });
    return handleResponse(response);
  },

  // Generic Claim
  claimPayment: async (identifier) => {
    const response = await fetch(`${API_URL}/payment/claim`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ identifier }),
    });
    return handleResponse(response);
  },

  // Leaderboard
  submitScore: async (gameId, score) => {
    const response = await fetch(`${API_URL}/leaderboard/submit`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ gameId, score }),
    });
    return handleResponse(response);
  },

  // All-time leaderboard (for Hall of Fame)
  getLeaderboard: async (gameId) => {
    const response = await fetch(`${API_URL}/leaderboard/global/${gameId}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // Monthly leaderboard (for in-game display, resets each month)
  getMonthlyLeaderboard: async (gameId) => {
    const response = await fetch(`${API_URL}/leaderboard/monthly/${gameId}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  getMyBestScore: async (gameId) => {
    const response = await fetch(`${API_URL}/leaderboard/personal/${gameId}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  // AI
  getAiTip: async (context) => {
    try {
      const response = await fetch(`${API_URL}/ai/tip?context=${encodeURIComponent(context)}`);
      if (!response.ok) throw new Error('Failed to fetch tip');
      return await response.json();
    } catch (error) {
      return null;
    }
  },

  // Email Subscription
  subscribe: async (email, source = 'unlock_page') => {
    const response = await fetch(`${API_URL}/subscribe`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ email, source }),
    });
    return handleResponse(response);
  }
};
