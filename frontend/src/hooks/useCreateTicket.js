import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '@/services/ticketService';

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => createTicket(data),
  });
  const mutate = (data, callbacks) => mutation.mutate(data, {
    ...callbacks,
    onSuccess: (resp, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      callbacks?.onSuccess?.(resp, vars, ctx);
    },
  });
  return { ...mutation, mutate };
}
