import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '@/services/ticketService';

const COLUMNS = [
  { key: 'a_faire', label: 'À faire' },
  { key: 'en_cours_dev', label: 'En cours' },
  { key: 'en_code_review', label: 'Code review' },
  { key: 'dev_termine', label: 'Dev terminé' },
  { key: 'en_test', label: 'En test' },
  { key: 'test_valide', label: 'Terminé' },
];

export function useTicketBoard() {
  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => fetchTickets(),
  });

  const columns = COLUMNS.map((col) => ({
    ...col,
    tickets: tickets.filter((t) => t.statut === col.key),
  }));

  return { columns, tickets, isLoading, error };
}
