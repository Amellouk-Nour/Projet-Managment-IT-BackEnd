import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserStory } from '@/services/userStoryService';

export function useUpdateUserStory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateUserStory(id, data),
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
