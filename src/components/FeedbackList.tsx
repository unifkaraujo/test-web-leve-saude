import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getDoc,
  doc,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  const [filtroNota, setFiltroNota] = useState<number | null>(null);
  const [filtroOrdenacao, setFiltroOrdenacao] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    const constraints: QueryConstraint[] = [];

    if (filtroNota !== null) {
      constraints.push(where('nota', '==', filtroNota));
    }

    constraints.push(orderBy('criadoEm', filtroOrdenacao));

    const q = query(collection(db, 'feedbacks'), ...constraints);

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const rawDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Feedback, 'id' | 'nomeUsuario'>),
      }));

      const filtrados = busca.trim()
        ? rawDocs.filter((f) => f.comentario.toLowerCase().includes(busca.toLowerCase()))
        : rawDocs;

      const feedbacksComNome = await Promise.all(
        filtrados.map(async (feedback) => {
          try {
            const userDoc = await getDoc(doc(db, 'users', feedback.usuarioId));
            const nomeUsuario = userDoc.exists() ? userDoc.data().nome : 'Usuário desconhecido';
            return { ...feedback, nomeUsuario };
          } catch {
            return { ...feedback, nomeUsuario: 'Erro ao buscar nome' };
          }
        })
      );

      setFeedbacks(feedbacksComNome);
    });

    return () => unsubscribe();
  }, [busca, filtroNota, filtroOrdenacao]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar comentário"
          className="p-2 rounded border w-full sm:w-64"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          className="p-2 rounded border"
          value={filtroNota ?? ''}
          onChange={(e) => setFiltroNota(e.target.value === '' ? null : Number(e.target.value))}
        >
          <option value="">Todas as notas</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} estrela{n > 1 ? 's' : ''}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded border"
          value={filtroOrdenacao}
          onChange={(e) => setFiltroOrdenacao(e.target.value === 'asc' ? 'asc' : 'desc')}
        >
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
      </div>

      <div className="space-y-4">
        {feedbacks.length === 0 ? (
          <p className="text-white">Nenhum feedback encontrado.</p>
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
