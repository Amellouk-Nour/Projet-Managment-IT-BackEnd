import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchTicket } from '@/hooks/useFetchTicket';
import TicketView from '@/components/ticket/TicketView';
import TicketEditForm from '@/components/ticket/TicketEditForm';

export default function TicketDetail() {
  const { id } = useParams();
  const { data: ticket, isLoading } = useFetchTicket(id);
  const [editing, setEditing] = useState(false);

  if (isLoading) return <div className="loading-screen">Chargement...</div>;
  if (!ticket) return <div className="loading-screen">Ticket non trouvé</div>;

  if (editing) {
    return <TicketEditForm ticket={ticket} onCancel={() => setEditing(false)} />;
  }

  return (
    <TicketView
      ticket={ticket}
      onEdit={() => setEditing(true)}
    />
  );
}