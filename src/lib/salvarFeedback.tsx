import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function salvarFeedback(nota: number, comentario: string, usuarioId?: string) {
  if (!usuarioId) return false;
  try {
    const docRef = await addDoc(collection(db, 'feedbacks'), {
      usuarioId,
      nota,
      comentario,
      criadoEm: new Date(),
    });
    console.log('Feedback salvo com ID: ', docRef.id);
  } catch (e) {
    console.error('Erro ao salvar feedback: ', e);
  }
}
