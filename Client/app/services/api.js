import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL - update this to match your server address and port
// For local development with an Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator, you can use localhost
// For a physical device, use your computer's local IP address
const API_URL = 'http://localhost:5002/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add request interceptor to attach token
api.interceptors.request.use(
  async (config) => {
    try {
      // For debugging
      console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
      
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('API interceptor error:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // Register new user
  register: async (userData) => {
    console.log('Registering with data:', userData);
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    console.log('Logging in with:', credentials);
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    await AsyncStorage.removeItem('token');
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }
};

// Fine services
export const fineService = {
  // Get all fines
  getAllFines: async () => {
    const response = await api.get('/fines');
    return response.data;
  },

  // Get outstanding fines
  getOutstandingFines: async () => {
    const response = await api.get('/fines/outstanding');
    return response.data;
  },

  // Get fine details
  getFineDetails: async (fineId) => {
    const response = await api.get(`/fines/${fineId}`);
    return response.data;
  },

  // Dispute a fine
  disputeFine: async (fineId) => {
    const response = await api.put(`/fines/${fineId}`, { status: 'Disputed' });
    return response.data;
  },
};

// License services
export const licenseService = {
  // Get license details
  getLicenseDetails: async () => {
    const response = await api.get('/licenses');
    return response.data;
  },

  // Get license status
  getLicenseStatus: async () => {
    const response = await api.get('/licenses/status');
    return response.data;
  },

  // Request license renewal
  requestRenewal: async () => {
    const response = await api.post('/licenses/renewal-request');
    return response.data;
  },
};

// Payment services
export const paymentService = {
  // Get payment history
  getPaymentHistory: async () => {
    const response = await api.get('/payments');
    return response.data;
  },

  // Pay a fine
  payFine: async (fineId, paymentDetails) => {
    const response = await api.post(`/payments/fines/${fineId}`, paymentDetails);
    return response.data;
  },

  // Get payment receipt
  getPaymentReceipt: async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}/receipt`);
    return response.data;
  },
};

export default {
  authService,
  fineService,
  licenseService,
  paymentService,
};