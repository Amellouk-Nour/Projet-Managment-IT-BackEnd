import { useNavigate } from 'react-router-dom';
import { useDeleteTicket } from '@/hooks/useDeleteTicket';
import { ROUTES } from '@/constants/paths';

const STATUS_OPTIONS = [
  { value: 'BACKLOG', label: 'Backlog' },
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'IN_REVIEW', label: 'In Review' },
  { value: 'DONE', label: 'Done' },
  { value: 'CANCELED', label: 'Canceled' },
];

export default function TicketView({ ticket, onEdit }) {
  const navigate = useNavigate();
  const deleteMutation = useDeleteTicket();

  function handleDelete() {
    if (!confirm('Supprimer ce ticket ?')) return;
    deleteMutation.mutate(ticket.id, {
      onSuccess: () => navigate(ROUTES.DASHBOARD),
    });
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <button className="link-btn" onClick={() => navigate(ROUTES.DASHBOARD)}>&larr; Retour</button>
          <div className="detail-actions">
            <button className="btn-secondary" onClick={onEdit}>Modifier</button>
            <button className="btn-danger" onClick={handleDelete}>Supprimer</button>
          </div>
        </div>
        <h2 className="detail-title">{ticket.titre}</h2>
        {ticket.description && <p className="detail-desc">{ticket.description}</p>}
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label">Priorité</span>
            <span className={`kanban-priority p-${ticket.priorite}`}>P{ticket.priorite}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Statut</span>
            <span>{STATUS_OPTIONS.find((o) => o.value === ticket.statut)?.label ?? ticket.statut}</span>
          </div>
          {ticket.estimDev != null && (
            <div className="detail-field">
              <span className="detail-label">Estim. Dev</span>
              <span>{ticket.estimDev}h</span>
            </div>
          )}
          {ticket.estimReview != null && (
            <div className="detail-field">
              <span className="detail-label">Estim. Review</span>
              <span>{ticket.estimReview}h</span>
            </div>
          )}
          {ticket.estimTest != null && (
            <div className="detail-field">
              <span className="detail-label">Estim. Test</span>
              <span>{ticket.estimTest}h</span>
            </div>
          )}
          {ticket.tempsDev != null && (
            <div className="detail-field">
              <span className="detail-label">Temps Dev</span>
              <span>{ticket.tempsDev}h</span>
            </div>
          )}
          {ticket.tempsReview != null && (
            <div className="detail-field">
              <span className="detail-label">Temps Review</span>
              <span>{ticket.tempsReview}h</span>
            </div>
          )}
          {ticket.tempsTest != null && (
            <div className="detail-field">
              <span className="detail-label">Temps Test</span>
              <span>{ticket.tempsTest}h</span>
            </div>
          )}
          {ticket.dueAt && (
            <div className="detail-field">
              <span className="detail-label">Date limite</span>
              <span>{ticket.dueAt}</span>
            </div>
          )}
          {ticket.assigneeUsernames?.length > 0 && (
            <div className="detail-field">
              <span className="detail-label">Assigné(s) à</span>
              <span>{ticket.assigneeUsernames.join(', ')}</span>
            </div>
          )}
          {ticket.userStoryTitre && (
            <div className="detail-field">
              <span className="detail-label">User Story</span>
              <span>{ticket.userStoryTitre}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}