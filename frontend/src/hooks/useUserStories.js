import {useQuery} from "@tanstack/react-query"; 
import {fetchUserStories} from "@/services/userStoryService";

export function useUserStories(enabled = false) {
  return useQuery({
    queryKey: ['userStories'],
    queryFn: fetchUserStories,
    enabled,
  });
}