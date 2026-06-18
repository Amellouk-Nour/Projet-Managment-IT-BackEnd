import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserStory } from '@/services/userStoryService';

export function useDeleteUserStory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => deleteUserStory(id),
  });
  const mutate = (id, callbacks) => mutation.mutate(id, {
    ...callbacks,
    onSuccess: (resp, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
      callbacks?.onSuccess?.(resp, vars, ctx);
    },
  });
  return { ...mutation, mutate };
}
