import { useTicketForm } from '@/hooks/useTicketForm';

export default function TicketEditForm({ ticket, onCancel }) {
  const { form, set, handleSave, updateMutation, STATUS_OPTIONS } = useTicketForm(ticket, onCancel);

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <h2>Modifier le ticket</h2>
          <button className="modal-close" onClick={onCancel}>&times;</button>
        </div>
        <form onSubmit={handleSave} className="modal-form">
          {/* ... copie le formulaire depuis TicketDetail.jsx ... */}
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