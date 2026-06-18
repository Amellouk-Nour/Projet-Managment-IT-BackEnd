import { useQuery } from '@tanstack/react-query';
import { fetchTicket } from '@/services/ticketService';

export function useFetchTicket(id) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => fetchTicket(id),
    enabled: !!id,
  });
}
