import React from "react";
import type { GamesResponseDTO } from "../types";

interface GameListPageProps {
  games: GamesResponseDTO[];
  showSaveButton?: boolean;
  onSaveGame?: (game: GamesResponseDTO) => void;
  showRemoveButton?: boolean;
  onRemoveGame?: (game: GamesResponseDTO) => void;
}

const GameListPage: React.FC<GameListPageProps> = ({
  games,
  showSaveButton,
  onSaveGame,
  showRemoveButton,
  onRemoveGame,
}) => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-r from-gray-800 to-indigo-700">
      {games.length === 0 ? (
        <p className="text-center text-gray-200 text-xl mt-20">
          Nenhum jogo encontrado.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto w-full">
          {games.map((game, index) => {
            const releaseDate =
              (game as any).releaseDate ||
              (game as any).ReleaseDate ||
              "Indisponível";
            return (
              <li
                key={game.name + index}
                className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white/95 flex flex-col h-full"
              >
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="text-lg font-bold mb-2 truncate text-gray-900"
                    title={game.name}
                  >
                    {game.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">Gênero principal:</span>{" "}
                    {game.mainGenre}
                  </p>
                  <p className="text-sm text-gray-700  mb-1">
                    <span className="font-semibold">Data de lançamento:</span>{" "}
                    {releaseDate}
                  </p>
                  {game.isFree && (
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold w-fit mb-2">
                      Grátis
                    </span>
                  )}
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      game.name + " game"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto text-indigo-600 hover:underline text-sm font-semibold"
                  >
                    Ver mais detalhes
                  </a>
                  {showSaveButton && onSaveGame && (
                    <button
                      className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition text-sm shadow"
                      onClick={() => onSaveGame(game)}
                    >
                      Salvar na biblioteca
                    </button>
                  )}
                  {showRemoveButton && onRemoveGame && (
                    <button
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition text-sm shadow"
                      onClick={() => onRemoveGame(game)}
                    >
                      Remover da biblioteca
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GameListPage;
