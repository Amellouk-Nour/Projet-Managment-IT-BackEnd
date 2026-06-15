import { useReducer, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTicket } from '@/services/ticketService';
import { useUpdateTicket } from '@/hooks/useUpdateTicket';
import { useDeleteTicket } from '@/hooks/useDeleteTicket';
import { ROUTES } from '@/constants/paths';

const STATUS_OPTIONS = [
  { value: 'a_faire', label: 'À faire' },
  { value: 'en_cours_dev', label: 'En cours' },
  { value: 'en_code_review', label: 'Code review' },
  { value: 'dev_termine', label: 'Dev terminé' },
  { value: 'en_test', label: 'En test' },
  { value: 'test_valide', label: 'Terminé' },
];

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ALL':
      return { ...action.data };
    default:
      return state;
  }
}

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateMutation = useUpdateTicket();
  const deleteMutation = useDeleteTicket();
  const [editing, setEditing] = useState(false);

  const { data: ticket, isLoading, error } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => fetchTicket(id),
  });

  const [form, dispatch] = useReducer(formReducer, {});

  function startEditing() {
    if (!ticket) return;
    dispatch({
      type: 'SET_ALL',
      data: {
        titre: ticket.titre || '',
        description: ticket.description || '',
        priorite: ticket.priorite ?? 3,
        statut: ticket.statut || 'a_faire',
        estimDev: ticket.estimDev ?? '',
        estimReview: ticket.estimReview ?? '',
        estimTest: ticket.estimTest ?? '',
        dueAt: ticket.dueAt || '',
        assignedToId: ticket.assignedToId ?? '',
        userStoryId: ticket.userStoryId ?? '',
      },
    });
    setEditing(true);
  }

  function set(field, value) {
    dispatch({ type: 'SET_FIELD', field, value });
  }

  function handleSave(e) {
    e.preventDefault();
    const payload = {
      titre: form.titre,
      description: form.description || undefined,
      priorite: Number(form.priorite),
      statut: form.statut,
      estimDev: form.estimDev ? Number(form.estimDev) : undefined,
      estimReview: form.estimReview ? Number(form.estimReview) : undefined,
      estimTest: form.estimTest ? Number(form.estimTest) : undefined,
      dueAt: form.dueAt || undefined,
      assignedToId: form.assignedToId ? Number(form.assignedToId) : undefined,
      userStoryId: form.userStoryId ? Number(form.userStoryId) : undefined,
    };
    updateMutation.mutate(
      { id: Number(id), data: payload },
      { onSuccess: () => setEditing(false) }
    );
  }

  function handleDelete() {
    if (!confirm('Supprimer ce ticket ?')) return;
    deleteMutation.mutate(Number(id), {
      onSuccess: () => navigate(ROUTES.DASHBOARD),
    });
  }

  if (isLoading) return <div className="loading-screen">Chargement...</div>;
  if (error) return <div className="loading-screen">Erreur de chargement</div>;

  if (editing) {
    return (
      <div className="detail-page">
        <div className="detail-card">
          <div className="detail-header">
            <h2>Modifier le ticket</h2>
            <button className="modal-close" onClick={() => setEditing(false)}>&times;</button>
          </div>
          <form onSubmit={handleSave} className="modal-form">
            <div className="form-group">
              <label>Titre *</label>
              <input value={form.titre} onChange={(e) => set('titre', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Priorité</label>
                <select className="form-select" value={form.priorite} onChange={(e) => set('priorite', e.target.value)}>
                  {[1, 2, 3, 4].map((p) => <option key={p} value={p}>P{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select className="form-select" value={form.statut} onChange={(e) => set('statut', e.target.value)}>
                  {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Estim. Dev (h)</label>
                <input type="number" step="0.1" value={form.estimDev} onChange={(e) => set('estimDev', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Estim. Review (h)</label>
                <input type="number" step="0.1" value={form.estimReview} onChange={(e) => set('estimReview', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Estim. Test (h)</label>
                <input type="number" step="0.1" value={form.estimTest} onChange={(e) => set('estimTest', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date limite</label>
                <input type="date" value={form.dueAt} onChange={(e) => set('dueAt', e.target.value)} />
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Annuler</button>
              <button type="submit" className="btn-primary" disabled={!form.titre?.trim()}>Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <button className="link-btn" onClick={() => navigate(ROUTES.DASHBOARD)}>&larr; Retour</button>
          <div className="detail-actions">
            <button className="btn-secondary" onClick={startEditing}>Modifier</button>
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
          {ticket.dueAt && (
            <div className="detail-field">
              <span className="detail-label">Date limite</span>
              <span>{ticket.dueAt}</span>
            </div>
          )}
          {(ticket.assignedToId || ticket.assignedToUsername) && (
            <div className="detail-field">
              <span className="detail-label">Assigné à</span>
              <span>{ticket.assignedToUsername ?? `#${ticket.assignedToId}`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
