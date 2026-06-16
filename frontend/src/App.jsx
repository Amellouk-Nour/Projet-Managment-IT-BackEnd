import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import Login from '@/pages/Login';
import { ROUTES } from '@/constants/paths';
import {lazy,Suspense} from 'react';
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const TicketDetail = lazy(() => import('@/pages/TicketDetail'));

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
        <Route path={ROUTES.DASHBOARD} element={
          <ProtectedRoute>
            <Suspense fallback="Chargement...">
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.TICKET_DETAIL} element={
          <ProtectedRoute>
            <Suspense fallback="Chargement...">
              <TicketDetail />
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
}
