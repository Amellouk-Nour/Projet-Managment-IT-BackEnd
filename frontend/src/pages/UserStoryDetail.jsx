import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFetchUserStory } from '@/hooks/useFetchUserStory';
import { useDeleteUserStory } from '@/hooks/useDeleteUserStory';
import { fetchTickets } from '@/services/ticketService';
import UserStoryEditForm from '@/components/userStory/UserStoryEditForm';
import { ROUTES } from '@/constants/paths';

const STATUS_LABELS = {
  BACKLOG: 'Backlog', TODO: 'À faire', IN_PROGRESS: 'En cours',
  IN_REVIEW: 'En revue', DONE: 'Terminé', CANCELED: 'Annulé',
};

export default function UserStoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: story, isLoading } = useFetchUserStory(id);
  const deleteMutation = useDeleteUserStory();
  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets', 'userStory', id],
    queryFn: () => fetchTickets({ userStoryId: id }),
    enabled: !!id,
  });

  const [editing, setEditing] = useState(false);

  function handleDelete() {
    if (!confirm('Supprimer cette user story ?')) return;
    deleteMutation.mutate(Number(id), {
      onSuccess: () => navigate(ROUTES.USER_STORIES),
    });
  }

  if (isLoading) return <div className="loading-screen">Chargement...</div>;
  if (!story) return <div className="loading-screen">User story non trouvée</div>;

  if (editing) {
    return <UserStoryEditForm story={story} onCancel={() => setEditing(false)} />;
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <button className="link-btn" onClick={() => navigate(ROUTES.USER_STORIES)}>&larr; Retour</button>
          <div className="detail-actions">
            <button className="btn-secondary" onClick={() => setEditing(true)}>Modifier</button>
            <button className="btn-danger" onClick={handleDelete}>Supprimer</button>
          </div>
        </div>
        <h2 className="detail-title">{story.titre}</h2>
        {story.description && <p className="detail-desc">{story.description}</p>}
        {story.criteresAcceptation && (
          <div className="detail-grid">
            <div className="detail-field">
              <span className="detail-label">Critères d'acceptation</span>
              <span>{story.criteresAcceptation}</span>
            </div>
          </div>
        )}
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label">Priorité</span>
            <span className={`kanban-priority p-${story.priorite}`}>P{story.priorite}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Statut</span>
            <span>{story.statut}</span>
          </div>
        </div>
        <h3 className="section-title">Tickets associés ({tickets.length})</h3>
        {tickets.length === 0 ? (
          <p className="loading-screen">Aucun ticket associé</p>
        ) : (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Priorité</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} onClick={() => navigate(`/tickets/${t.id}`)}>
                    <td className="cell-title">{t.titre}</td>
                    <td><span className={`kanban-priority p-${t.priorite}`}>P{t.priorite}</span></td>
                    <td>{STATUS_LABELS[t.statut] ?? t.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
