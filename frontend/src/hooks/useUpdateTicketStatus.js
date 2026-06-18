import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicketStatus } from '@/services/ticketService';

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, statut }) => updateTicketStatus(id, statut),
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
