import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTicket } from '@/services/ticketService';

export function useDeleteTicket() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => deleteTicket(id),
  });
  const mutate = (id, callbacks) => mutation.mutate(id, {
    ...callbacks,
    onSuccess: (resp, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      callbacks?.onSuccess?.(resp, vars, ctx);
    },
  });
  return { ...mutation, mutate };
}
