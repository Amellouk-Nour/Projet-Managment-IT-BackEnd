import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export function useLoginMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ username, password }) =>
      api.post('/auth/login', { username, password }).then((r) => r.data),
    onSuccess: (data) => setAuth(data.token),
  });
}

export function useRegisterMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (body) =>
      api.post('/auth/register', body).then((r) => r.data),
    onSuccess: (data) => setAuth(data.token),
  });
}
