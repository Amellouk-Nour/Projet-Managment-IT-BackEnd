import { useDraggable } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';

export default function KanbanCard({ ticket }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `ticket-${ticket.id}`,
    data: { ticket },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`kanban-card${isDragging ? ' kanban-card-dragging' : ''}`}
      onClick={() => navigate(`/tickets/${ticket.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="kanban-card-title">{ticket.titre}</div>
      {ticket.priorite && <span className={`kanban-priority p-${ticket.priorite}`}>P{ticket.priorite}</span>}
      {ticket.assigneeUsernames?.length > 0 && (
        <div className="kanban-card-assignees">{ticket.assigneeUsernames.join(', ')}</div>
      )}
    </div>
  );
}
