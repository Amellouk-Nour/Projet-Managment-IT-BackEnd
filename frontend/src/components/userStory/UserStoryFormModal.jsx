import { useReducer } from 'react';
import { useCreateUserStory } from '@/hooks/useCreateUserStory';

const PRIORITES = [1, 2, 3, 4];
const STATUS_OPTIONS = [
  { value: 'TODO', label: 'À faire' },
  { value: 'IN_PROGRESS', label: 'En cours' },
  { value: 'DONE', label: 'Terminé' },
];

const initialForm = { titre: '', description: '', criteresAcceptation: '', priorite: 3, statut: 'TODO' };

function formReducer(state, action) {
  switch (action.type) {
    case 'SET': return { ...state, [action.field]: action.value };
    case 'RESET': return initialForm;
    default: return state;
  }
}

export default function UserStoryFormModal({ onClose }) {
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const createMutation = useCreateUserStory();

  const set = (field) => (e) => dispatch({ type: 'SET', field, value: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.titre.trim()) return;
    createMutation.mutate(
      {
        titre: form.titre,
        description: form.description || undefined,
        criteresAcceptation: form.criteresAcceptation || undefined,
        priorite: Number(form.priorite),
        statut: form.statut,
      },
      { onSuccess: () => { dispatch({ type: 'RESET' }); onClose(); } }
    );
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'RESET' });
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>Nouvelle user story</h2>
          <button className="modal-close" onClick={() => { dispatch({ type: 'RESET' }); onClose(); }}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Titre *</label>
            <input value={form.titre} onChange={set('titre')} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} />
          </div>
          <div className="form-group">
            <label>Critères d'acceptation</label>
            <textarea value={form.criteresAcceptation} onChange={set('criteresAcceptation')} rows={3} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Priorité</label>
              <select className="form-select" value={form.priorite} onChange={set('priorite')}>
                {PRIORITES.map((p) => <option key={p} value={p}>P{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Statut</label>
              <select className="form-select" value={form.statut} onChange={set('statut')}>
                {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => { dispatch({ type: 'RESET' }); onClose(); }}>Annuler</button>
            <button type="submit" className="btn-primary" disabled={!form.titre.trim() || createMutation.isPending}>
              {createMutation.isPending ? 'Création...' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
