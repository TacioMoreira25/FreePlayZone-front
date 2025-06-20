import axios from 'axios';
import type { PreferenceRequestDTO, GamesResponseDTO } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/recommendations',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export async function recommendGames(data: PreferenceRequestDTO): Promise<GamesResponseDTO[]> 
{
  try {
    const response = await api.post<GamesResponseDTO[]>('/games', data);
    return response.data;
  } catch (error: any) {

    if (error.response) {

        if (error.response.status === 400) {
        throw new Error('Requisição inválida para recomendação de jogos');
      }
    }
    throw new Error('Erro ao buscar recomendações de jogos');
  }
}

export const gameRecommendationService = {
  recommendGames,
};
