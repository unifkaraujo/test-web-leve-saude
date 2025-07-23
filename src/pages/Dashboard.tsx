import { useAuth } from '../contexts/AuthContext';
import { salvarFeedback } from '../lib/salvarFeedback';
import FeedbackList from '../components/FeedbackList';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout title="Dashboard">
      <p className="mb-4">
        Bem-vindo(a), <strong>{user?.email}</strong>!
      </p>

      <FeedbackList />

      <button
        onClick={() => salvarFeedback(5, 'comentário de teste', user?.uid)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Salvar feedback de teste
      </button>
    </Layout>
  );
}
