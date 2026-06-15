import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/constants/paths';

export function useLoginMutation(form) {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: () => login(form.username, form.password),
    onSuccess: () => { navigate(ROUTES.DASHBOARD); },
  });
}

export function useRegisterMutation(form) {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  return useMutation({
    mutationFn: () => register(form),
    onSuccess: () => { navigate(ROUTES.DASHBOARD); },
  });
}
