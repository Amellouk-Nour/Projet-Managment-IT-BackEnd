import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicketStatus } from '@/services/ticketService';

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, statut }) => updateTicketStatus(id, statut),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}
