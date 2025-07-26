import { useAuth } from '../contexts/AuthContext';
import FeedbackList from '../components/FeedbackList';
import Layout from '../components/Layout';
import { Spinner } from '../components/Spinner';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout title="Dashboard">
        <Spinner colorClass="text-black" />
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard">
      <p className="mb-4">
        Bem-vindo(a) {user?.displayName && <strong>{user.displayName}</strong>} !
      </p>

      <FeedbackList />

    </Layout>
  );
}
