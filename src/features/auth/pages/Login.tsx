import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Digite um email válido.");
      return;
    }
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      const userName = (res as any).name || (res as any).user?.name || "";
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify({ name: userName }));
      navigate("/dashboard");
    } catch (err: any) {
      if (err.message === "Email ou senha inválidos") {
        setError("Email ou senha inválidos");
      } else {
        setError("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-indigo-700">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-100 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block">
            <span className="block mb-1 font-medium">Email</span>
            <input
              type="email"
              className="peer w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p
              className={`text-red-500 text-sm mt-1 ${
                email && !/\S+@\S+\.\S+/.test(email) ? "" : "invisible"
              }`}
            >
              Por favor, insira um email válido.
            </p>
          </label>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Senha</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <button
          type="button"
          className="w-full bg-cyan-950 text-white py-2 rounded hover:bg-cyan-900 transition mt-2"
          disabled={loading}
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
