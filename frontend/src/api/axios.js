import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Important for sending/receiving cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      alert(`Account Blocked: ${error.response.data.response || 'Your account has been blocked.'}`);
      localStorage.removeItem('acs_user');
      window.location.href = '/login';
    } else if (error.response && error.response.status === 401) {
      // User deleted, token expired, or unauthorized
      localStorage.removeItem('acs_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
