// src/axiosConfig.js
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          window.location.href = '/login'; // Redirect to login
          return Promise.reject('Token expired');
        } else {
          config.headers.Authorization = `Bearer ${token}`; // Attach valid token
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject('Invalid token');
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
