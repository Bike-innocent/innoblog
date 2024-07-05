import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Ensure credentials (cookies) are included with requests
  headers: {
    'Accept': 'application/json',
    // 'Referer': 'http://localhost:5173/', // Removed this line
  }
});

// Setup CSRF token retrieval
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the CSRF token
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        headers: {
          'Accept': 'application/json',
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
