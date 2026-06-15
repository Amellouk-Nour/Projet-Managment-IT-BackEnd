import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicket } from '@/services/ticketService';

export function useUpdateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTicket(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}
