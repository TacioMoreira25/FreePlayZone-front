export interface PreferenceRequestDTO {
  genres?: string[];
  description?: string;
}

export interface GamesResponseDTO {
  name: string;
  imageUrl: string;
  mainGenre: string;
  releaseDate: string;
  isFree: boolean;
}
