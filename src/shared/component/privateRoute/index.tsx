import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import type { JSX } from '@emotion/react/jsx-runtime';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/auth/signin" replace />;

  return children;
}
