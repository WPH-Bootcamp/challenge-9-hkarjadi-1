import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
// export const usePopularMovies = () => {
//   // TODO: Implement useQuery hook
//   // Hint: Use movieService.getPopularMovies as queryFn
//   return useQuery({
//     queryKey: ['movies', 'popular'],
//     queryFn: () => {
//       // TODO: Call your movie service function
//       throw new Error('Not implemented');
//     },
//   });
// };

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular'],

    queryFn: () => movieService.getPopularMovies(page),
  });
};

export const useNowPlayingMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'now_playing'],
    queryFn: ({ pageParam }) => movieService.getNowPlayingMovies(pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movies', 'detail'],

    queryFn: () => movieService.getMovieDetail(id),
  });
};
