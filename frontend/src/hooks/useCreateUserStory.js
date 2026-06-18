import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserStory } from '@/services/userStoryService';

export function useCreateUserStory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => createUserStory(data),
  });
  const mutate = (data, callbacks) => mutation.mutate(data, {
    ...callbacks,
    onSuccess: (resp, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
      callbacks?.onSuccess?.(resp, vars, ctx);
    },
  });
  return { ...mutation, mutate };
}
