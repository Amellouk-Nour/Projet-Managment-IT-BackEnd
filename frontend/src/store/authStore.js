import { create } from 'zustand';
import { getUserFromToken } from '@/utils/token';
import { getToken, setToken, removeToken } from '@/utils/storage';
import { loginUser, registerUser } from '@/services/authService';

const useAuthStore = create((set) => ({
  user: (() => { const t = getToken(); return t ? getUserFromToken(t) : null; })(),
  token: getToken(),
  login: async (username, password) => {
    const data = await loginUser({ username, password });
    setToken(data.token);
    set({ token: data.token, user: getUserFromToken(data.token) });
  },
  register: async (formData) => {
    const data = await registerUser(formData);
    setToken(data.token);
    set({ token: data.token, user: getUserFromToken(data.token) });
  },
  logout: () => {
    removeToken();
    set({ user: null, token: null });
  },
}));

export default useAuthStore;