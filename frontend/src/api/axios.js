import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Important for sending/receiving cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints where 401 is expected (e.g. cross-domain cookie not set yet)
const AUTH_PATHS = ['/auth/register', '/auth/login', '/auth/me', '/auth/validate'];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthPath = AUTH_PATHS.some((p) => requestUrl.includes(p));

    if (error.response && error.response.status === 403) {
      alert(`Account Blocked: ${error.response.data.response || 'Your account has been blocked.'}`);
      localStorage.removeItem('acs_user');
      window.location.href = '/login';
    } else if (error.response && error.response.status === 401 && !isAuthPath) {
      // Only redirect for non-auth endpoints (e.g. expired session on dashboard)
      localStorage.removeItem('acs_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
