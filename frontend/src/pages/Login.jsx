import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useLoginMutation, useRegisterMutation } from '../hooks/useAuthMutations';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', email: '', role: 'Développeur' });
  const [error, setError] = useState('');
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await registerMutation.mutateAsync(form);
      } else {
        await loginMutation.mutateAsync({ username: form.username, password: form.password });
      }
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'string') setError(data);
      else if (data?.error) setError(data.error);
      else if (data?.message) setError(data.message);
      else setError('Erreur de connexion');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>Projet Management</h1>
        </div>

        {user && (
          <div className="logged-in-bar">
            <span>Connecté en tant que <strong>{user.username}</strong></span>
            <div className="logged-in-actions">
              <button className="link-btn" onClick={() => navigate('/dashboard')}>Tableau de bord</button>
              <button className="link-btn logout-btn" onClick={() => logout()}>Déconnexion</button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Entrez votre nom d'utilisateur" required />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Entrez votre email" required />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select name="role" value={form.role} onChange={handleChange} className="form-select">
                  <option value="ADMIN">Administrateur</option>
                  <option value="Chef de projet">Chef de projet</option>
                  <option value="Développeur">Développeur</option>
                  <option value="Testeur">Testeur</option>
                  <option value="Product Owner">Product Owner</option>
                  <option value="Scrum Master">Scrum Master</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Mot de passe</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Entrez votre mot de passe" required />
          </div>

          <button type="submit" className="btn-primary" disabled={loginMutation.isPending || registerMutation.isPending}>
            {loginMutation.isPending || registerMutation.isPending ? 'Chargement...' : (isRegister ? "S'inscrire" : 'Se connecter')}
          </button>
        </form>

        <p className="login-toggle">
          {isRegister ? 'Déjà un compte ?' : "Pas encore de compte ?"}
          <button className="link-btn" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
}
