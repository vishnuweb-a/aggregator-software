import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Using Vite proxy
  withCredentials: true, // Important for sending/receiving cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
