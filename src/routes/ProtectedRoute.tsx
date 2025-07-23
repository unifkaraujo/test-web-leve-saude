import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;
  if (!user) return <Navigate to="/" />;
  return children;
}
