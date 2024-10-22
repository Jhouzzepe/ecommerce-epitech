import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers['Authorization'] = `Bearer ${parsedToken.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
