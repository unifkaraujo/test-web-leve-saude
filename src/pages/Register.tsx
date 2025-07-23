import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate('/dashboard');
    } catch {
      setErro('Erro ao criar conta');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] text-white">
      <form onSubmit={handleRegister} className="bg-white text-black p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Cadastro</h1>
        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 border rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-2"
        >
          Cadastrar
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300 text-sm"
        >
          Já tenho conta
        </button>
      </form>
    </div>
  );
}
