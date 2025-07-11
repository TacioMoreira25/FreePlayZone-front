import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameRecommendationService } from "../../features/games/services/gameRecommendationService";
import { gameLibraryService } from "../../features/games/services/gameLibraryService";
import type {
  PreferenceRequestDTO,
  GamesResponseDTO,
} from "../../features/games/types";
import { GAME_GENRES } from "../../constants/genres";
import GameListPage from "../../features/games/pages/GameListPage";
import LibraryPage from "../../features/games/pages/LibraryPage";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [games, setGames] = useState<GamesResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGameList, setShowGameList] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [fromGameList, setFromGameList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      navigate("/login");
    } else {
      try {
        const parsed = JSON.parse(userData);
        const name =
          parsed.name || (parsed.user && parsed.user.name) || "usuário";
        setUser({ name });
      } catch {
        setUser(null);
        navigate("/login");
      }
    }
  }, [navigate]);

  function toggleGenre(slug: string) {
    setSelectedGenres((prev) =>
      prev.includes(slug) ? prev.filter((g) => g !== slug) : [...prev, slug]
    );
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setGames([]);
    setShowGameList(false);

    const payload: PreferenceRequestDTO = {};
    if (selectedGenres.length > 0) payload.genres = selectedGenres;
    if (description.trim()) payload.description = description.trim();

    try {
      const recommended = await gameRecommendationService.recommendGames(
        payload
      );
      setGames(recommended);
      setShowGameList(true);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar recomendações");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveGame(game: GamesResponseDTO) {
    try {
      await gameLibraryService.addGameToLibrary(game);
      alert("Jogo salvo na biblioteca!");
    } catch (err: any) {
      alert(err.message || "Erro ao salvar jogo na biblioteca");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Redirecionando para login...</p>
      </div>
    );
  }

  if (showGameList) {
    if (showLibrary) {
      return <LibraryPage onBack={() => setShowLibrary(false)} />;
    }
    return (
      <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-r from-gray-800 to-indigo-700">
        <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto w-full">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow">
            Jogos recomendados
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowLibrary(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 
              transition text-lg shadow"
            >
              Ver Biblioteca
            </button>
            <button
              onClick={() => setShowGameList(false)}
              className="bg-indigo-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-500 
              transition text-lg shadow"
            >
              Voltar
            </button>
          </div>
        </div>
        <GameListPage
          games={games}
          showSaveButton
          onSaveGame={handleSaveGame}
        />
      </div>
    );
  }
  if (showLibrary) {
    return (
      <LibraryPage
        onBack={() => {
          setShowLibrary(false);
          if (fromGameList) {
            setShowGameList(true);
            setFromGameList(false);
          }
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-r
     from-gray-800 to-indigo-700"
    >
      <div className="absolute top-0.5 left-7 z-10">
        <img
          src="/image.png"
          alt="FreePlayZone Logo"
          className="scale-200 w-22 h-20 object-contain drop-shadow-xl"
        />
      </div>

      <div className="w-full max-w-5xl bg-white/10 rounded-2xl shadow-xl p-8 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">
              Olá,{" "}
              <span className="text-indigo-300">{user?.name || "usuário"}</span>
              !
            </h2>
          </div>
          <button
            onClick={() => {
              setShowLibrary(true);
              setFromGameList(false);
            }}
            className="bg-blue-100 hover:bg-blue-200 text-shadow-neutral-800 px-8 py-3 rounded-lg 
            font-semibold transition text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Minha Biblioteca
          </button>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white text-center">
          Escolha seus gêneros favoritos e/ou descreva o tipo de jogo que gosta.
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {GAME_GENRES.map(({ name, slug }) => {
            const selected = selectedGenres.includes(slug);
            return (
              <button
                key={slug}
                onClick={() => toggleGenre(slug)}
                type="button"
                className={`px-5 py-2 rounded-full font-medium border-2 transition text-base shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    selected
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-lg scale-105"
                      : "bg-white/80 text-gray-800 border-gray-300 hover:bg-indigo-100"
                  }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-white font-medium mb-2"
          >
            Descrição <span className="text-gray-300">(opcional)</span>
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: jogos parecidos com Red Dead Redemption"
            className="w-full min-h-[70px] max-h-40 rounded-lg border border-gray-400
             bg-white/80 text-gray-900 px-4 py-3 text-base focus:outline-none focus:ring-2
              focus:ring-indigo-400 resize-vertical shadow"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-100 hover:bg-blue-200 text-shadow-neutral-800 px-8 py-3 rounded-lg font-semibold 
            transition text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {loading ? "Carregando..." : "Buscar recomendações"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-blue-100 hover:bg-blue-200 text-shadow-neutral-800 px-8 py-2.5 rounded-lg font-semibold 
            transition text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sair
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
