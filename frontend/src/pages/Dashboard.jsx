import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useQuery } from '@tanstack/react-query';
import KanbanColumn from '@/components/kanban/KanbanColumn';
import KanbanCard from '@/components/kanban/KanbanCard';
import TicketFormModal from '@/components/kanban/TicketFormModal';
import { useTicketBoard } from '@/hooks/useTicketBoard';
import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';
import { useCreateTicket } from '@/hooks/useCreateTicket';
import { fetchUserStories } from '@/services/userStoryService';
import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/constants/paths';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { columns, isLoading, error } = useTicketBoard();
  const updateStatus = useUpdateTicketStatus();
  const createMutation = useCreateTicket();
  const [activeTicket, setActiveTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: userStories = [] } = useQuery({ queryKey: ['userStories'], queryFn: fetchUserStories });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(event) {
    setActiveTicket(event.active.data.current?.ticket ?? null);
  }

  function handleDragEnd(event) {
    setActiveTicket(null);
    const { active, over } = event;
    if (!over) return;
    const ticketId = active.data.current?.ticket?.id;
    const targetColumn = over.data.current?.columnKey;
    const sourceColumn = active.data.current?.ticket?.statut;
    if (!ticketId || !targetColumn || targetColumn === sourceColumn) return;
    updateStatus.mutate({ id: ticketId, statut: targetColumn });
  }

  if (isLoading) return <div className="loading-screen">Chargement...</div>;
  if (error) return <div className="loading-screen">Erreur de chargement</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <div className="dashboard-user">
          <button className="btn-primary" onClick={() => setShowForm(true)} style={{ width: 'auto', padding: '8px 16px', margin: 0 }}>Nouveau ticket</button>
          <span>{user?.username}</span>
          <button className="link-btn logout-btn" onClick={logout}>Déconnexion</button>
        </div>
      </div>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {columns.map((col) => (
            <KanbanColumn key={col.key} column={col} onCardClick={(ticket) => navigate(`/tickets/${ticket.id}`)} />
          ))}
        </div>
        <DragOverlay>
          {activeTicket ? <KanbanCard ticket={activeTicket} /> : null}
        </DragOverlay>
      </DndContext>
      <TicketFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        userStories={userStories}
      />
    </div>
  );
}
