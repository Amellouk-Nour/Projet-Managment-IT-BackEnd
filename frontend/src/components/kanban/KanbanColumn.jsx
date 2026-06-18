import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ column }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.key}`,
    data: { columnKey: column.key },
  });

  return (
    <div ref={setNodeRef} className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}>
      <div className="kanban-column-header">
        {column.label}
        <span className="kanban-count">{column.tickets.length}</span>
      </div>
      <div className="kanban-column-body">
        {column.tickets.map((ticket) => (
          <KanbanCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
