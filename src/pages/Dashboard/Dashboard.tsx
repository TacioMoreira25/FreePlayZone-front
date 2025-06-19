import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      navigate("/login");
    } else {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-indigo-700">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        {user ? (
          <p className="mb-4 text-gray-700">
            Bem-vindo <strong>{user.name}</strong>!
          </p>
        ) : (
          <p className="mb-4 text-gray-700">
            Usuário não encontrado ou não logado.
          </p>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-cyan-950 text-white py-2 rounded hover:bg-cyan-900 transition mt-2"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
