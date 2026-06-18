import api from '@/api/axios';
import { API_PATHS } from '@/constants/paths';

export const fetchUsers = () =>
  api.get(API_PATHS.USERS).then((r) => r.data);
