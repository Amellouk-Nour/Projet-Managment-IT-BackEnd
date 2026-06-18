import { useMutation } from '@tanstack/react-query';
import { updateTicket } from '@/services/ticketService';

export function useUpdateTicket() {
  return useMutation({
    mutationFn: ({ id, data }) => updateTicket(id, data),
  });
}
