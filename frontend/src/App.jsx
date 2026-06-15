import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import TicketDetail from '@/pages/TicketDetail';
import { ROUTES } from '@/constants/paths';

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to={ROUTES.LOGIN} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path={ROUTES.TICKET_DETAIL} element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
}
