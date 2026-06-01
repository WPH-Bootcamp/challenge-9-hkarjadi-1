import tmdbapi from '@/lib/axios';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

// export const movieService = {
// TODO: Implement getPopularMovies function
// Endpoint: GET /movie/popular

// TODO: Implement getNowPlayingMovies function
// Endpoint: GET /movie/now_playing

// TODO: Implement getMovieDetails function
// Endpoint: GET /movie/{movie_id}

// TODO: Implement searchMovies function
// Endpoint: GET /search/movie

// TODO: Add more endpoints as needed
// };

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbapi.get('/movie/popular', {
      params: {
        page,
      },
    });
    // console.log('response=', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNowPlayingMovies = async (page: number) => {
  try {
    const response = await tmdbapi.get('/movie/now_playing', {
      params: {
        page,
        limit: 12,
      },
    });
    console.log('response=', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetail = async (id: number) => {
  try {
    const response = await tmdbapi.get(`/movie/${id}`, {
      params: {
        id,
      },
    });
    // console.log('response=', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const movieService = {
  getPopularMovies,
  getNowPlayingMovies,
  getMovieDetail,
};
