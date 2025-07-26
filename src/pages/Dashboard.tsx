import { useAuth } from '../contexts/AuthContext';
import FeedbackList from '../components/FeedbackList';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Layout title="Dashboard"><p>Carregando...</p></Layout>;
  }

  return (
    <Layout title="Dashboard">
      <p className="mb-4">
        Bem-vindo(a), <strong>{user?.displayName}</strong>!
      </p>

      <FeedbackList />

    </Layout>
  );
}
