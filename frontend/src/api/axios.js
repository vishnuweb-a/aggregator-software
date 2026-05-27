import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Important for sending/receiving cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
