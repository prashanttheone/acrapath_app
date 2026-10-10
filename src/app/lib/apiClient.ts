import axios from 'axios';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

/**
 * Core Axios instance configured for the application.
 * Use this directly for mutations (POST, PUT, DELETE) or
 * pass it to TanStack Query's useQuery for fetching (GET).
 */
export const apiClient = axios.create({
  baseURL: Config.API_URL || 'https://acrapathapi.schooldb.in',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true', // Bypasses ngrok's anti-abuse HTML page!
  },
});

// Request Interceptor: useful for injecting tokens later
apiClient.interceptors.request.use(
  async (config) => {
    console.log('\n====================================');
    console.log(`🚀 [API REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log(`📦 [PAYLOAD]:\n${JSON.stringify(config.data, null, 2)}`);
    }
    console.log('====================================\n');

    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ [API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: useful for globally handling errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    console.log('\n====================================');
    console.log(`✅ [API RESPONSE] ${response.config.method?.toUpperCase()} ${response.config.baseURL}${response.config.url}`);
    console.log(`📄 [DATA]:\n${JSON.stringify(response.data, null, 2)}`);
    console.log('====================================\n');
    return response;
  },
  async (error) => {
    console.log('\n====================================');
    console.error(`❌ [API ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.baseURL}${error.config?.url}`);
    console.error(`🚨 [MESSAGE]:`, error.message);
    if (error.response?.data) {
      console.error(`📄 [SERVER ERROR RESPONSE]:\n${JSON.stringify(error.response.data, null, 2)}`);
    }
    console.log('====================================\n');
    // if (error.response?.status === 401) {
    //   // Handle automatic logout or token refresh
    // }

    return Promise.reject(error);
  }
);
