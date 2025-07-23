import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/dashboard");
    } catch (err: any) {
      setErro("Login inválido");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300 text-sm"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}
