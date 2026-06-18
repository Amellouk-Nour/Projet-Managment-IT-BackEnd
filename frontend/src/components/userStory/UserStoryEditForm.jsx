import { useParams } from 'react-router-dom';
import { useUserStoryForm } from '@/hooks/useUserStoryForm';
import { useFetchUserStory } from '@/hooks/useFetchUserStory';

export default function UserStoryEditForm({ onCancel }) {
  const { id } = useParams();
  const { data: story } = useFetchUserStory(id);
  const { form, set, handleSave, updateMutation, PRIORITES, STATUS_OPTIONS } = useUserStoryForm(story, onCancel);

  if (!story) return <div className="loading-screen">Chargement...</div>;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <h2>Modifier la user story</h2>
          <button className="modal-close" onClick={onCancel}>&times;</button>
        </div>
        <form onSubmit={handleSave} className="modal-form">
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
            <button type="button" className="btn-secondary" onClick={onCancel}>Annuler</button>
            <button type="submit" className="btn-primary" disabled={!form.titre?.trim()}>
              {updateMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
