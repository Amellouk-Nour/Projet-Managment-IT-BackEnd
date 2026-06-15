import { useReducer } from 'react';

const STATUS_OPTIONS = [
  { value: 'a_faire', label: 'À faire' },
  { value: 'en_cours_dev', label: 'En cours' },
  { value: 'en_code_review', label: 'Code review' },
  { value: 'dev_termine', label: 'Dev terminé' },
  { value: 'en_test', label: 'En test' },
  { value: 'test_valide', label: 'Terminé' },
];

const initialState = {
  titre: '',
  description: '',
  priorite: 3,
  statut: 'a_faire',
  estimDev: '',
  estimReview: '',
  estimTest: '',
  dueAt: '',
  userStoryId: '',
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function TicketFormModal({ isOpen, onClose, onSubmit, userStories }) {
  const [form, dispatch] = useReducer(formReducer, initialState);

  if (!isOpen) return null;

  function handleSubmit(e) {
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
      userStoryId: form.userStoryId ? Number(form.userStoryId) : undefined,
    };
    onSubmit(payload);
    dispatch({ type: 'RESET' });
    onClose();
  }

  function set(field, value) {
    dispatch({ type: 'SET_FIELD', field, value });
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
          <h2>Nouveau ticket</h2>
          <button className="modal-close" onClick={() => { dispatch({ type: 'RESET' }); onClose(); }}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
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
          <div className="form-group">
            <label>User Story</label>
            <select className="form-select" value={form.userStoryId} onChange={(e) => set('userStoryId', e.target.value)}>
              <option value="">—</option>
              {userStories.map((us) => <option key={us.id} value={us.id}>{us.titre}</option>)}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => { dispatch({ type: 'RESET' }); onClose(); }}>Annuler</button>
            <button type="submit" className="btn-primary" disabled={!form.titre.trim()}>Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
