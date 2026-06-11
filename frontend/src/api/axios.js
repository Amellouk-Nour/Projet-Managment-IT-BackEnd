import axios from 'axios';
import { API_PATHS } from '@/constants/paths';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (data) => api.post(API_PATHS.LOGIN, data).then((r) => r.data),
  register: (data) => api.post(API_PATHS.REGISTER, data).then((r) => r.data),
};

export default api;
