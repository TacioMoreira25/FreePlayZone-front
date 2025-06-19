import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-indigo-700">

      <div className="absolute top-0.5 left-7 z-10">
        <img
          src="/image.png"
          alt="FreePlayZone Logo"
          className="scale-200 w-22 h-20 object-contain drop-shadow-xl"
        />
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl mb-8 mt-8">
        <h1 className="bg-gradient-to-r from-gray-950 to-gray-100 bg-clip-text text-7xl font-extrabold 
        text-transparent text-center drop-shadow-lg">
          Bem-vindo ao FreePlayZone
        </h1>
      </div>

      <div className="bg-blue-100 p-16 rounded-2xl shadow-2xl max-w-2xl w-full text-center">
        <p className="text-gray-600 mb-12 text-2xl font-semibold">
          Entre ou cadastre-se
        </p>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-900 text-white py-4 text-xl rounded-lg hover:bg-blue-700 transition font-bold"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full bg-emerald-950 text-white py-4 text-xl rounded-lg hover:bg-green-700 transition font-bold"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
