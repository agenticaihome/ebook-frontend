const API_URL = 'http://localhost:8080/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
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
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // User
  getPurchases: async () => {
    const response = await fetch(`${API_URL}/user/purchases`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  checkAccess: async () => {
    const response = await fetch(`${API_URL}/user/access`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Ergo
  initiateErgoPayment: async () => {
    const response = await fetch(`${API_URL}/payment/ergo/initiate`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  claimErgoPayment: async (transactionId, accessCode) => {
    const response = await fetch(`${API_URL}/payment/ergo/claim`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ transactionId, accessCode }),
    });
    return handleResponse(response);
  },

  checkRecentErgoPayment: async (accessCode) => {
    const response = await fetch(`${API_URL}/payment/ergo/check-recent`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ accessCode }),
    });
    return handleResponse(response);
  }
};
