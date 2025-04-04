import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Updated Base URL to match your server's actual port (5002)
// If testing on the same device where server is running, use localhost
// If testing on a physical device, use your computer's actual IP address
const API_URL = 'http://192.168.8.104:5002/api'; // Updated port from 5000 to 5002  //192.168.8.104

// Create axios instance with improved configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeouts to prevent hanging requests
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to attach authentication token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`Making request to: ${config.baseURL}${config.url}`);
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Detailed error logging to help with debugging
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received:', error.request);
      console.error('Request was sent to:', error.config?.url);
      
      // More detailed network error information
      if (error.message === 'Network Error') {
        console.error('Network Error Details:', {
          message: 'Could not connect to the server.',
          possibleCauses: [
            '1. Server is not running',
            '2. Incorrect server URL or port',
            '3. CORS issue (server not allowing cross-origin requests)',
            '4. Network connectivity problem'
          ],
          checkList: [
            'Is the server running on port 5002?',
            'Is the IP address correct?',
            'Is there a firewall blocking the connection?'
          ]
        });
      }
    } else {
      // Something happened in setting up the request
      console.error('Error during request setup:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

// Fine services
export const fineService = {
  // Get all fines
  getAllFines: async () => {
    try {
      const response = await api.get('/fines');
      return response.data;
    } catch (error) {
      console.error('Get all fines error:', error);
      throw error;
    }
  },

  // Get outstanding fines
  getOutstandingFines: async () => {
    try {
      const response = await api.get('/fines/outstanding');
      return response.data;
    } catch (error) {
      console.error('Get outstanding fines error:', error);
      throw error;
    }
  },

  // Get fine details
  getFineDetails: async (fineId) => {
    try {
      const response = await api.get(`/fines/${fineId}`);
      return response.data;
    } catch (error) {
      console.error(`Get fine details error for ID ${fineId}:`, error);
      throw error;
    }
  },

  // Dispute a fine
  disputeFine: async (fineId) => {
    try {
      const response = await api.put(`/fines/${fineId}`, { status: 'Disputed' });
      return response.data;
    } catch (error) {
      console.error(`Dispute fine error for ID ${fineId}:`, error);
      throw error;
    }
  },
};

// License services
export const licenseService = {
  // Get license details
  getLicenseDetails: async () => {
    try {
      const response = await api.get('/licenses');
      return response.data;
    } catch (error) {
      console.error('Get license details error:', error);
      throw error;
    }
  },

  // Get license status
  getLicenseStatus: async () => {
    try {
      const response = await api.get('/licenses/status');
      return response.data;
    } catch (error) {
      console.error('Get license status error:', error);
      throw error;
    }
  },

  // Request license renewal
  requestRenewal: async () => {
    try {
      const response = await api.post('/licenses/renewal-request');
      return response.data;
    } catch (error) {
      console.error('Request renewal error:', error);
      throw error;
    }
  },
};

// Payment services
export const paymentService = {
  // Get payment history
  getPaymentHistory: async () => {
    try {
      const response = await api.get('/payments');
      return response.data;
    } catch (error) {
      console.error('Get payment history error:', error);
      throw error;
    }
  },

  // Pay a fine
  payFine: async (fineId, paymentDetails) => {
    try {
      const response = await api.post(`/payments/fines/${fineId}`, paymentDetails);
      return response.data;
    } catch (error) {
      console.error(`Pay fine error for ID ${fineId}:`, error);
      throw error;
    }
  },

  // Get payment receipt
  getPaymentReceipt: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}/receipt`);
      return response.data;
    } catch (error) {
      console.error(`Get payment receipt error for ID ${paymentId}:`, error);
      throw error;
    }
  },
};

// Function to test server connectivity - useful for debugging
export const testServerConnection = async () => {
  try {
    // Test a simple endpoint or the base URL
    const response = await axios.get(`${API_URL}`);
    console.log('Server connection test successful:', response.status);
    return true;
  } catch (error) {
    console.error('Server connection test failed:', error.message);
    return false;
  }
};

export default {
  authService,
  fineService,
  licenseService,
  paymentService,
  testServerConnection
};