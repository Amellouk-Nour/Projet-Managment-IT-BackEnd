import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuthStore, { setAuth, logout } from '@/store/authStore';
import { authApi } from '@/api/axios';
import { ROUTES } from '@/constants/paths';

const initialForm = { username: '', password: '', email: '', role: 'Développeur' };

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialForm;
    default:
      return state;
  }
}

function getErrorMessage(error) {
  if (!error) return '';
  const d = error.response?.data;
  if (typeof d === 'string') return d;
  if (d?.error) return d.error;
  if (d?.message) return d.message;
  return 'Erreur de connexion';
}

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => authApi.login({ username: form.username, password: form.password }),
    onSuccess: (data) => { setAuth(data.token); navigate(ROUTES.DASHBOARD); },
  });

  const registerMutation = useMutation({
    mutationFn: () => authApi.register(form),
    onSuccess: (data) => { setAuth(data.token); navigate(ROUTES.DASHBOARD); },
  });

  const pending = loginMutation.isPending || registerMutation.isPending;
  const errorMessage = getErrorMessage(loginMutation.error || registerMutation.error);

  const setField = (field) => (e) => dispatch({ type: 'SET_FIELD', field, value: e.target.value });

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
              <button className="link-btn" onClick={() => navigate(ROUTES.DASHBOARD)}>Tableau de bord</button>
              <button className="link-btn logout-btn" onClick={logout}>Déconnexion</button>
            </div>
          </div>
        )}

        <form onSubmit={(e) => {
          e.preventDefault();
          isRegister ? registerMutation.mutate() : loginMutation.mutate();
        }}>
          {errorMessage && <div className="form-error">{errorMessage}</div>}

          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input name="username" value={form.username} onChange={setField('username')} placeholder="Entrez votre nom d'utilisateur" required />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={setField('email')} placeholder="Entrez votre email" required />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select name="role" value={form.role} onChange={setField('role')} className="form-select">
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
            <input name="password" type="password" value={form.password} onChange={setField('password')} placeholder="Entrez votre mot de passe" required />
          </div>

          <button type="submit" className="btn-primary" disabled={pending}>
            {pending ? 'Chargement...' : (isRegister ? "S'inscrire" : 'Se connecter')}
          </button>
        </form>

        <p className="login-toggle">
          {isRegister ? 'Déjà un compte ?' : "Pas encore de compte ?"}
          <button className="link-btn" onClick={() => { setIsRegister(!isRegister); }}>
            {isRegister ? 'Se connecter' : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
}
