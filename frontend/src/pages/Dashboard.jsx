import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TicketFormModal from '@/components/kanban/TicketFormModal';
import { useTicketKpi } from '@/hooks/useTicketKpi';
import useAuthStore from '@/store/authStore';
import { ROUTES } from '@/constants/paths';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [showForm, setShowForm] = useState(false);
  const kpi = useTicketKpi();
  const myStats = kpi.userStats.find((u) => u.id === user?.id);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <div className="dashboard-user">
          <button className="btn-primary" onClick={() => setShowForm(true)}>Nouveau ticket</button>
          <button className="btn-secondary" onClick={() => navigate(ROUTES.USER_STORIES)}>User Stories</button>
          <span>{user?.username}</span>
          <button className="link-btn logout-btn" onClick={logout}>Déconnexion</button>
        </div>
      </div>

      <div className="kpi-grid">
            <div className="kpi-card">
              <span className="kpi-value">{kpi.total}</span>
              <span className="kpi-label">Total tickets</span>
            </div>
            <div className="kpi-card kpi-todo">
              <span className="kpi-value">{kpi.todo}</span>
              <span className="kpi-label">À faire</span>
            </div>
            <div className="kpi-card kpi-progress">
              <span className="kpi-value">{kpi.inProgress}</span>
              <span className="kpi-label">En cours</span>
            </div>
            <div className="kpi-card kpi-done">
              <span className="kpi-value">{kpi.completed}</span>
              <span className="kpi-label">Terminé</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-value">{kpi.remainingEstim.toFixed(1)}h</span>
              <span className="kpi-label">Reste à faire</span>
            </div>
          </div>

          {myStats && (
            <div className="section">
              <h2>Ma progression</h2>
              <div className="kpi-user-grid">
                <div className="kpi-user-card">
                  <div className="kpi-user-bar" style={{ flex: 1 }}>
                    <div
                      className="kpi-user-fill"
                      style={{ width: myStats.assigned > 0 ? `${(myStats.done / myStats.assigned) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="kpi-user-count">{myStats.done}/{myStats.assigned}</span>
                </div>
              </div>
            </div>
          )}

      <KanbanBoard />
      {showForm && (
        <TicketFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}