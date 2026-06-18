import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '@/services/ticketService';
import { fetchUsers } from '@/services/userService';

export function useTicketKpi() {
  const { data: tickets = [] } = useQuery({ queryKey: ['tickets'], queryFn: fetchTickets });
  const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

  const total = tickets.length;
  const completed = tickets.filter((t) => t.statut === 'test_valide').length;
  const inProgress = tickets.filter((t) => t.statut !== 'test_valide' && t.statut !== 'a_faire').length;
  const todo = tickets.filter((t) => t.statut === 'a_faire').length;

  const remainingEstim = tickets.reduce((acc, t) => {
    const estDev = Number(t.estimDev) || 0;
    const estRev = Number(t.estimReview) || 0;
    const estTest = Number(t.estimTest) || 0;
    const tmpDev = Number(t.tempsDev) || 0;
    const tmpRev = Number(t.tempsReview) || 0;
    const tmpTest = Number(t.tempsTest) || 0;
    return acc + Math.max(0, estDev - tmpDev) + Math.max(0, estRev - tmpRev) + Math.max(0, estTest - tmpTest);
  }, 0);

  const userStats = users.map((u) => {
    const assigned = tickets.filter((t) => (t.assigneeIds || []).includes(u.id));
    const done = assigned.filter((t) => t.statut === 'test_valide');
    return { ...u, assigned: assigned.length, done: done.length };
  }).filter((u) => u.assigned > 0);

  return { total, completed, inProgress, todo, remainingEstim, userStats };
}
