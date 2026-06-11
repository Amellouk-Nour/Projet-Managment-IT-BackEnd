import { create } from 'zustand';
import { getUserFromToken } from '@/utils/token';

const useAuthStore = create((set, get) => {
  const stored = localStorage.getItem('token');
  return {
    user: stored ? getUserFromToken(stored) : null,
    token: stored,
    setAuth: (token) => {
      localStorage.setItem('token', token);
      set({ token, user: getUserFromToken(token) });
    },
    logout: () => {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    },
  };
});

export const { setAuth, logout } = useAuthStore.getState();

export default useAuthStore;
