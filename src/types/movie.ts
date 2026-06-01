// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

// export interface Movie {
//   // TODO: Add movie properties based on TMDB API response
//   // Examples: id, title, overview, poster_path, etc.
// }

// export interface MovieResponse {
//   // TODO: Add pagination properties
//   // Examples: page, results, total_pages, total_results
// }

// TODO: Add more types as needed (Genre, Video, etc.)

export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  softcore: boolean;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
