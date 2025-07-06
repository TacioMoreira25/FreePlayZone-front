import React, { useEffect, useState } from "react";
import { gameLibraryService } from "../services/gameLibraryService";
import type { GamesResponseDTO } from "../types";
import GameListPage from "./GameListPage";

interface LibraryPageProps {
  onBack: () => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onBack }) => {
  const [libraryGames, setLibraryGames] = useState<GamesResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLibrary();
    // eslint-disable-next-line
  }, []);

  async function fetchLibrary() {
    setLoading(true);
    setError(null);
    try {
      const games = await gameLibraryService.getLibraryGames();
      setLibraryGames(games);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar biblioteca");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveGame(game: GamesResponseDTO) {
    try {
      await gameLibraryService.removeGameFromLibrary(game.name);
      setLibraryGames((prev) => prev.filter((g) => g.name !== game.name));
    } catch (err: any) {
      alert(err.message || "Erro ao remover jogo da biblioteca");
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-r from-gray-800 to-indigo-700">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow">
            Minha Biblioteca
          </h1>
          <button
            onClick={onBack}
            className="bg-indigo-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-500 transition text-lg shadow"
          >
            Voltar
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-200 text-xl mt-20">
            Carregando...
          </p>
        ) : error ? (
          <p className="text-center text-red-400 text-xl mt-20">{error}</p>
        ) : (
          <div className="flex justify-center">
            <div className="w-full">
              <GameListPage
                games={libraryGames}
                showRemoveButton
                onRemoveGame={handleRemoveGame}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
