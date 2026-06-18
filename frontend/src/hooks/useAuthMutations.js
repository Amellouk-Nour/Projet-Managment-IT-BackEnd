import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/authStore';

export function useAuthForm(form, isRegister) {
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);

  return useMutation({
    mutationFn: () => isRegister ? register(form) : login(form.username, form.password),
  });
}
