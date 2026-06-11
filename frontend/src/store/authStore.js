import { create } from 'zustand';
import api from '../api/axios';

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    if (payload.exp && payload.exp < now) {
      localStorage.removeItem('token');
      return null;
    }
    return { username: payload.sub, role: payload.role };
  } catch {
    localStorage.removeItem('token');
    return null;
  }
};

const useAuthStore = create((set) => {
  const token = localStorage.getItem('token');
  const user = token ? decodeToken(token) : null;

  return {
    user,
    token,
    loading: false,

    setAuth: (newToken) => {
      localStorage.setItem('token', newToken);
      set({ token: newToken, user: decodeToken(newToken) });
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    },
  };
});

export default useAuthStore;
