import api from '@/api/axios';
import { API_PATHS } from '@/constants/paths';

export const fetchUserStories = () =>
  api.get(API_PATHS.USER_STORIES).then((r) => r.data);
