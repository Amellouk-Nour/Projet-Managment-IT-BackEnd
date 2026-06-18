import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTicketForm } from '@/hooks/useTicketForm';
import { fetchUserStories } from '@/services/userStoryService';
import { fetchUsers } from '@/services/userService';

export default function TicketEditForm({ ticket, onCancel }) {
  const { form, set, handleSave, updateMutation, STATUS_OPTIONS } = useTicketForm(ticket, onCancel);
  const [userSearch, setUserSearch] = useState('');
  const { data: userStories = [] } = useQuery({
    queryKey: ['userStories'],
    queryFn: fetchUserStories,
  });
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  const filteredUsers = users.filter((u) => u.username.toLowerCase().includes(userSearch.toLowerCase()));

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <h2>Modifier le ticket</h2>
          <button className="modal-close" onClick={onCancel}>&times;</button>
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
              <label>Temps Dev (h)</label>
              <input type="number" step="0.1" value={form.tempsDev} onChange={(e) => set('tempsDev', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Temps Review (h)</label>
              <input type="number" step="0.1" value={form.tempsReview} onChange={(e) => set('tempsReview', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Temps Test (h)</label>
              <input type="number" step="0.1" value={form.tempsTest} onChange={(e) => set('tempsTest', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date limite</label>
              <input type="date" value={form.dueAt} onChange={(e) => set('dueAt', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Assigné(s) à</label>
            <input className="form-input user-search" placeholder="Rechercher..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
            <div className="checkbox-group">
              {filteredUsers.map((u) => (
                <label key={u.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={String(u.id)}
                    checked={(form.assigneeIds || []).includes(String(u.id))}
                    onChange={(e) => {
                      const id = e.target.value;
                      const current = form.assigneeIds || [];
                      if (e.target.checked) {
                        set('assigneeIds', [...current, id]);
                      } else {
                        set('assigneeIds', current.filter((x) => x !== id));
                      }
                    }}
                  />
                  {u.username}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>User Story</label>
            <select className="form-select"
                    value={form.userStoryId ?? ''}
                    onChange={(e) => set('userStoryId', e.target.value)}>
              <option value="">— Aucune —</option>
              {userStories.map((us) => <option key={us.id} value={String(us.id)}>{us.titre}</option>)}
            </select>
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