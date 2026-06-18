import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStories } from '@/hooks/useUserStories';
import UserStoryFormModal from '@/components/userStory/UserStoryFormModal';
import { ROUTES } from '@/constants/paths';
import useAuthStore from '@/store/authStore';

export default function UserStoriesList() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [showForm, setShowForm] = useState(false);
  const { data: stories = [], isLoading } = useUserStories();

  if (isLoading) return <div className="loading-screen">Chargement...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>User Stories</h1>
        <div className="dashboard-user">
          <button className="btn-secondary" onClick={() => navigate(ROUTES.DASHBOARD)}>Tableau de bord</button>
          <button className="btn-primary" onClick={() => setShowForm(true)}>Nouvelle user story</button>
          <span>{user?.username}</span>
          <button className="link-btn logout-btn" onClick={logout}>Déconnexion</button>
        </div>
      </div>

      {showForm && <UserStoryFormModal onClose={() => setShowForm(false)} />}

      <div className="data-table">
        {stories.length === 0 ? (
          <p className="loading-screen">Aucune user story</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Priorité</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((s) => (
                <tr key={s.id} onClick={() => navigate(`/user-stories/${s.id}`)}>
                  <td className="cell-title">{s.titre}</td>
                  <td><span className={`kanban-priority p-${s.priorite}`}>P{s.priorite}</span></td>
                  <td>{s.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
