import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService"; 

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authService.updatePassword({ email, newPassword: "" });
      setSuccess("Email encontrado! Redirecionando para redefinir senha...");
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Email não encontrado.");
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
        <h2 className="text-2xl font-bold mb-6 text-center">
          Esqueceu a senha?
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {success && (
          <div className="mb-4 text-green-600 text-center">{success}</div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Verificando..." : "Enviar"}
        </button>
        <button
          type="button"
          className="w-full bg-cyan-950 text-white py-2 rounded hover:bg-cyan-900 transition mt-2"
          disabled={loading}
          onClick={() => navigate("/login")}
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
