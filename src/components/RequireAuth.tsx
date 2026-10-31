import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// Sends signed-out visitors to Log In, which returns them here afterwards.
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <main aria-busy='true' style={{ minHeight: '60vh' }} />;
  if (!user) return <Navigate to='/log-in' replace state={{ from: pathname }} />;
  return <>{children}</>;
}
