import { create } from 'zustand';
import { getUserFromToken } from '@/utils/token';
import { loginUser, registerUser } from '@/services/authService';

const useAuthStore = create((set, get) => {
  const stored = localStorage.getItem('token');
  return {
    user: stored ? getUserFromToken(stored) : null,
    token: stored,
    login: async (username, password) => {
      const data = await loginUser({ username, password });
      localStorage.setItem('token', data.token);
      set({ token: data.token, user: getUserFromToken(data.token) });
    },
    register: async (formData) => {
      const data = await registerUser(formData);
      localStorage.setItem('token', data.token);
      set({ token: data.token, user: getUserFromToken(data.token) });
    },
    logout: () => {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    },
  };
});

export default useAuthStore;
