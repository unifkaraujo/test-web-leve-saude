import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Spinner } from './Spinner';

interface Feedback {
  id: string;
  usuarioId: string;
  nota: number;
  comentario: string;
  criadoEm: { seconds: number; nanoseconds: number };
  nomeUsuario?: string;
}

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [busca, setBusca] = useState('');
  const [filtroOrdenacao, setFiltroOrdenacao] = useState<'data' | 'nota'>('data');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const campoOrdenacao = filtroOrdenacao === 'data' ? 'criadoEm' : 'nota';
    const constraints: QueryConstraint[] = [orderBy(campoOrdenacao, 'desc')];

    const q = query(collection(db, 'feedbacks'), ...constraints);

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const rawDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Feedback, 'id' | 'nomeUsuario'>),
      }));

      const feedbacksComNome = await Promise.all(
        rawDocs.map(async (feedback) => {
          try {
            const userDoc = await getDoc(doc(db, 'users', feedback.usuarioId));
            const nomeUsuario = userDoc.exists() ? userDoc.data().nome : 'Usuário desconhecido';
            return { ...feedback, nomeUsuario };
          } catch {
            return { ...feedback, nomeUsuario: 'Erro ao buscar nome' };
          }
        }),
      );

      const filtrados =
        busca.trim() !== ''
          ? feedbacksComNome.filter((f) =>
              `${f.nomeUsuario ?? ''} ${f.comentario}`.toLowerCase().includes(busca.toLowerCase()),
            )
          : feedbacksComNome;

      setFeedbacks(filtrados);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [busca, filtroOrdenacao]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar comentário ou nome"
          className="p-2 rounded border w-full sm:w-78"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          className="p-2 rounded border"
          value={filtroOrdenacao}
          onChange={(e) => setFiltroOrdenacao(e.target.value === 'nota' ? 'nota' : 'data')}
        >
          <option value="data">Mais recentes</option>
          <option value="nota">Maior nota</option>
        </select>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner colorClass="text-black" />
          </div>
        ) : feedbacks.length === 0 ? (
          <p className="">Nenhum feedback encontrado.</p>
        ) : (
          feedbacks.map(({ id, nota, comentario, criadoEm, nomeUsuario }) => (
            <div
              key={id}
              className="p-4 rounded shadow bg-gray-800 text-white border border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold mr-2">{Array(nota).fill('⭐').join('')}</span>
                <span className="text-gray-400 text-sm">
                  {new Date(criadoEm.seconds * 1000).toLocaleString()}
                </span>
              </div>
              <p className="mb-1">{comentario}</p>
              <p className="text-xs text-gray-400">Enviado por: {nomeUsuario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
