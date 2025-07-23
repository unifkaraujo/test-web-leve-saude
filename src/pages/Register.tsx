import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { FaSignInAlt } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { ButtonLink } from '../components/Button/ButtonLink';
import { Spinner } from '../components/Spinner';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate('/dashboard');
    } catch {
      setErro('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white text-gray-800 p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>

        <div className="flex flex-col gap-4">
          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-600 p-3 gap-2">
            <MdEmail className="text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-600 p-3 gap-2">
            <MdLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Senha"
              className="flex-1 outline-none"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && (
            <p className="text-red-600 text-sm text-center font-medium">
              {erro}
            </p>
          )}

           <Button disabled={loading}>
              <div className={`flex items-center justify-center gap-2 transition-opacity ${loading && 'opacity-50 pointer-events-none'}`} >
                Cadastrar
                {loading && <Spinner colorClass="text-white" />}
              </div>
            </Button>

          <ButtonLink onClick={() => navigate('/')}>
            <FaSignInAlt className="inline mr-2" /> Já tenho conta
          </ButtonLink>
        </div>
      </form>
    </div>
  );
}