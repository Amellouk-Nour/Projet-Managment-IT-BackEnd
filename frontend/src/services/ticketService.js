import api from '@/api/axios';
import { API_PATHS } from '@/constants/paths';

export const fetchTickets = () =>
  api.get(API_PATHS.TICKETS).then((r) => r.data);

export const createTicket = (data) =>
  api.post(API_PATHS.TICKETS, data).then((r) => r.data);

export const fetchTicket = (id) =>
  api.get(`${API_PATHS.TICKETS}/${id}`).then((r) => r.data);

export const updateTicket = (id, data) =>
  api.put(`${API_PATHS.TICKETS}/${id}`, data).then((r) => r.data);

export const deleteTicket = (id) =>
  api.delete(`${API_PATHS.TICKETS}/${id}`).then((r) => r.data);

export const updateTicketStatus = (id, statut) =>
  api.patch(`${API_PATHS.TICKETS}/${id}/status`, { statut }).then((r) => r.data);
