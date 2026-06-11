import api from '@/api/axios';
import { API_PATHS } from '@/constants/paths';

export const loginUser = ({ username, password }) =>
  api.post(API_PATHS.LOGIN, { username, password }).then((r) => r.data);

export const registerUser = (data) =>
  api.post(API_PATHS.REGISTER, data).then((r) => r.data);
