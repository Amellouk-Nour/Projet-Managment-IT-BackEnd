import { useQuery } from '@tanstack/react-query';
import { fetchUserStory } from '@/services/userStoryService';

export function useFetchUserStory(id) {
  return useQuery({
    queryKey: ['userStory', id],
    queryFn: () => fetchUserStory(id),
    enabled: !!id,
  });
}
