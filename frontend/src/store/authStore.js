import { create } from 'zustand';
import { getUserFromToken } from '@/utils/token';

const useAuthStore = create(() => {
  const stored = localStorage.getItem('token');
  const user = stored ? getUserFromToken(stored) : null;
  return { user, token: stored };
});

const set = useAuthStore.setState;

export const setAuth = (token) => {
  localStorage.setItem('token', token);
  set({ token, user: getUserFromToken(token) });
};

export const logout = () => {
  localStorage.removeItem('token');
  set({ user: null, token: null });
};

export default useAuthStore;
