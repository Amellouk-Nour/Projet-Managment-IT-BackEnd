import { useState } from 'react';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TicketFormModal from '@/components/kanban/TicketFormModal';
import { useCreateTicket } from '@/hooks/useCreateTicket';
import { useUserStories } from '@/hooks/useUserStories';
import useAuthStore from '@/store/authStore';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const createMutation = useCreateTicket();
  const [showForm, setShowForm] = useState(false);
  const { data: userStories = [] } = useUserStories(showForm);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <div className="dashboard-user">
          <button className="btn-primary" onClick={() => setShowForm(true)} style={{ width: 'auto', padding: '8px 16px', margin: 0 }}>Nouveau ticket</button>
          <span>{user?.username}</span>
          <button className="link-btn logout-btn" onClick={logout}>Déconnexion</button>
        </div>
      </div>
      <KanbanBoard />
      {showForm && (
        <TicketFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => createMutation.mutate(data)}
          userStories={userStories}
        />
      )}
    </div>
  );
}