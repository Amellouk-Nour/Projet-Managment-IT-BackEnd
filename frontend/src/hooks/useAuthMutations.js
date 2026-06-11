import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '@/store/authStore';
import { ROUTES } from '@/constants/paths';
import { loginUser, registerUser } from '@/services/authService';

export function useLoginMutation(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => loginUser({ username: form.username, password: form.password }),
    onSuccess: (data) => { setAuth(data.token); navigate(ROUTES.DASHBOARD); },
  });
}

export function useRegisterMutation(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => registerUser(form),
    onSuccess: (data) => { setAuth(data.token); navigate(ROUTES.DASHBOARD); },
  });
}
