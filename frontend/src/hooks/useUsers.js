import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/services/userService';

export function useUsers(enabled = true) {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers, enabled });
}