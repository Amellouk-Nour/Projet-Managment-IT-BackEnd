import api from '@/api/axios';
import { API_PATHS } from '@/constants/paths';

export const fetchUserStories = () =>
  api.get(API_PATHS.USER_STORIES).then((r) => r.data);

export const createUserStory = (data) =>
  api.post(API_PATHS.USER_STORIES, data).then((r) => r.data);

export const fetchUserStory = (id) =>
  api.get(`${API_PATHS.USER_STORIES}/${id}`).then((r) => r.data);

export const updateUserStory = (id, data) =>
  api.put(`${API_PATHS.USER_STORIES}/${id}`, data).then((r) => r.data);

export const deleteUserStory = (id) =>
  api.delete(`${API_PATHS.USER_STORIES}/${id}`).then((r) => r.data);
