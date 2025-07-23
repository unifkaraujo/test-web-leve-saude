import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { salvarFeedback } from "../lib/salvarFeedback";
import FeedbackList from "../components/FeedbackList";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#242424] text-white p-4">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <div>
        <p>Bem-vindo(a), <strong>{user?.email}</strong>!</p>

        <FeedbackList />

      </div>

      <button onClick={()=>salvarFeedback(5, 'comentário de teste',user?.uid)}>
        Salvar feedback de teste
      </button>

    </div>
  );
}
