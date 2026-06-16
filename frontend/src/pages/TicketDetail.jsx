import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchTicket } from '@/hooks/useFetchTicket';
import { useDeleteTicket } from '@/hooks/useDeleteTicket';
import TicketView from '@/components/ticket/TicketView';
import TicketEditForm from '@/components/ticket/TicketEditForm';
import { ROUTES } from '@/constants/paths';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: ticket, isLoading } = useFetchTicket(id);
  const [editing, setEditing] = useState(false);
  const deleteMutation = useDeleteTicket();

  if (isLoading) return <div className="loading-screen">Chargement...</div>;
  if (!ticket) return <div className="loading-screen">Ticket non trouvé</div>;

  if (editing) {
    return <TicketEditForm ticket={ticket} onCancel={() => setEditing(false)} />;
  }

  return (
    <TicketView
      ticket={ticket}
      onEdit={() => setEditing(true)}
      onDelete={() => {
        if (confirm('Supprimer ce ticket ?')) {
          deleteMutation.mutate(id, {
            onSuccess: () => navigate(ROUTES.DASHBOARD)
          });
        }
      }}
    />
  );
}