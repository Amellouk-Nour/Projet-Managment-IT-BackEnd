import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '@/services/ticketService';

export function useTicketsByUserStory(userStoryId) {
  return useQuery({
    queryKey: ['tickets', 'userStory', userStoryId],
    queryFn: () => fetchTickets({ userStoryId }),
    enabled: !!userStoryId,
  });
}
