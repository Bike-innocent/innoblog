import axios from 'axios';
import { createBrowserHistory } from 'history';

// Create a history object for navigation
const history = createBrowserHistory();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Ensure credentials (cookies) are included with requests
  headers: {
    'Accept': 'application/json',
  }
});

// Setup CSRF token retrieval
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Check if CSRF token is already set
      if (!document.cookie.includes('XSRF-TOKEN')) {
        // Retrieve the CSRF token
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
          headers: {
            'Accept': 'application/json',
          }
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Setup response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      history.push('/login');
      window.location.reload(); // Ensure the page reloads to apply the navigation
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
