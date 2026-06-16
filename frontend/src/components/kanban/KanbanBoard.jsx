import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { useTicketBoard } from '@/hooks/useTicketBoard';
import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';

export default function KanbanBoard() {
  const navigate = useNavigate();
  const { columns, isLoading, error } = useTicketBoard();
  const updateStatus = useUpdateTicketStatus();
  const [activeTicket, setActiveTicket] = useState(null);

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
  );
}