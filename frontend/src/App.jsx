import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Login from './pages/Login';

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><div>Dashboard (à venir)</div></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
