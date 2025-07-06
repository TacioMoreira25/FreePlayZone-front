import axios from "axios";
import type { GamesResponseDTO } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080/Library",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function addGameToLibrary(game: GamesResponseDTO): Promise<void> {
  await api.post("/add", game);
}

export async function getLibraryGames(): Promise<GamesResponseDTO[]> {
  const response = await api.get<GamesResponseDTO[]>("");
  return response.data;
}

export async function removeGameFromLibrary(name: string): Promise<void> {
  await api.delete(`/remover/${encodeURIComponent(name)}`);
}

export const gameLibraryService = {
  addGameToLibrary,
  getLibraryGames,
  removeGameFromLibrary,
};
