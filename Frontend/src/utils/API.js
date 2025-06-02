import axios from 'axios'
import Swal from 'sweetalert2'

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 5000
})

// Request interceptor to attach token
API.interceptors.request.use(
  (config) => {
      const token = sessionStorage.getItem('AuthToken');
      
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const errorCode = error.response?.data?.code;

    if (status === 401 && errorCode === 'TOKEN_EXPIRED' && !isAlertShown) {
      isAlertShown = true;

      await Swal.fire({
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });

      sessionStorage.clear();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default API;