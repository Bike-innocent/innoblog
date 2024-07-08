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



// ///////////////
// import axios from 'axios';
// import { createBrowserHistory } from 'history';

// // Create a history object for navigation
// const history = createBrowserHistory();

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   withCredentials: true, // Ensure credentials (cookies) are included with requests
//   headers: {
//     'Accept': 'application/json',
//   }
// });

// // Function to get CSRF token
// const getCsrfToken = async () => {
//   try {
//     await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
//       headers: {
//         'Accept': 'application/json',
//       }
//     });
//   } catch (error) {
//     console.error('Error getting CSRF token:', error);
//   }
// };

// // Immediately get CSRF token on load
// getCsrfToken();

// // Setup request interceptor to add CSRF token to headers
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//     if (csrfToken) {
//       config.headers['X-CSRF-TOKEN'] = csrfToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Setup response interceptor to handle 401 errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Redirect to login page
//       history.push('/login');
//       window.location.reload(); // Ensure the page reloads to apply the navigation
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

