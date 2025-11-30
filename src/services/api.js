// Use environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

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

/**
 * Handle API responses with automatic redirect on 401
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Clear any frontend state and redirect to login
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || error.error || 'Request failed');
  }
  return response.json();
};

export const api = {
  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include', // CRITICAL: Send/receive cookies
      body: JSON.stringify({ email, password }),
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

  // Access Control
  verifyAccess: async (password) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Auth verification error:', error);
      return { success: false, error: 'Connection failed' };
    }
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

  // Generic Claim (Stripe or Ergo)
  claimPayment: async (identifier) => {
    const response = await fetch(`${API_URL}/payment/claim`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
      body: JSON.stringify({ identifier }),
    });
    return handleResponse(response);
  }
};

