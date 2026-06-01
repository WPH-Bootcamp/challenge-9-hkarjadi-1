// import React from 'react';

// import { useMovieDetails } from '@/hooks/useMovies';
// import { useParams } from 'react-router-dom';

// function MovieDetail() {
//   const { id } = useParams<{ id: string }>();
//   const numericMovieId = id ? Number(id) : 0;
//   const { data: movieDetailsData } = useMovieDetails(numericMovieId);
//   const backdropUrl = movieDetailsData?.backdrop_path
//     ? `https://image.tmdb.org/t/p/original${movieDetailsData.backdrop_path}`
//     : null;

//   return (
//     <div className='w-full h-full relative bg-black'>
//       <div className='w-full h-full'>
//         {backdropUrl && <img src={backdropUrl} alt='' />}
//       </div>
//       <div className='relative top=10 left=10'>
//         <h1 className='text-7xl'>{movieDetailsData?.title}</h1>
//         {id}
//       </div>
//     </div>
//   );
// }

// export default MovieDetail;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../services/movieService';
import type { Movie } from '../types/movie';

const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) return;

        const data = await getMovieDetail(Number(id));
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        Movie not found
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      {/* Hero Section */}
      <section className='relative h-[90vh] overflow-hidden'>
        <img
          src={`${IMAGE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className='absolute inset-0 w-full h-full object-cover'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20' />

        <div className='relative z-10 container mx-auto px-8 h-full flex items-end pb-16'>
          <div className='flex flex-col lg:flex-row gap-8 w-full'>
            {/* Poster */}
            <div className='w-[220px] shrink-0'>
              <img
                src={`${POSTER_URL}${movie.poster_path}`}
                alt={movie.title}
                className='rounded-2xl shadow-2xl w-full'
              />
            </div>

            {/* Content */}
            <div className='flex-1'>
              <h1 className='text-5xl font-bold mb-4'>{movie.title}</h1>

              <p className='text-gray-300 mb-6'>{movie.release_date}</p>

              <div className='flex gap-4 mb-8'>
                <button
                  type='button'
                  className='bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold'
                >
                  Watch Trailer
                </button>

                <button
                  type='button'
                  className='w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center'
                >
                  ♥
                </button>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl'>
                <div className='bg-black/60 backdrop-blur-md rounded-xl p-5 border border-white/10'>
                  <p className='text-yellow-400 text-xl mb-2'>★</p>
                  <p className='text-gray-400 text-sm'>Rating</p>
                  <h3 className='text-xl font-bold'>
                    {movie.vote_average.toFixed(1)}/10
                  </h3>
                </div>

                <div className='bg-black/60 backdrop-blur-md rounded-xl p-5 border border-white/10'>
                  <p className='text-gray-400 text-sm'>Genre</p>
                  <h3 className='text-xl font-bold'>
                    {((movie as { genres?: Array<{ name?: string }> })
                      .genres?.[0]?.name as string | undefined) ?? '-'}
                  </h3>
                </div>

                <div className='bg-black/60 backdrop-blur-md rounded-xl p-5 border border-white/10'>
                  <p className='text-gray-400 text-sm'>Language</p>
                  <h3 className='text-xl font-bold uppercase'>
                    {movie.original_language}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className='container mx-auto px-8 py-10'>
        <h2 className='text-3xl font-bold mb-4'>Overview</h2>

        <p className='text-gray-300 leading-8'>{movie.overview}</p>
      </section>

      {/* Cast */}
      {(
        movie as {
          credits?: {
            cast?: Array<{
              id: number;
              name: string;
              character: string;
              profile_path: string | null;
            }>;
          };
        }
      ).credits?.cast && (
        <section className='container mx-auto px-8 py-8'>
          <h2 className='text-3xl font-bold mb-6'>Cast & Crew</h2>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {(
              movie as {
                credits?: {
                  cast?: Array<{
                    id: number;
                    name: string;
                    character: string;
                    profile_path: string | null;
                  }>;
                };
              }
            ).credits?.cast
              ?.slice(0, 10)
              .map((person) => (
                <div key={person.id} className='bg-zinc-900 rounded-xl p-3'>
                  <img
                    src={
                      person.profile_path
                        ? `${POSTER_URL}${person.profile_path}`
                        : 'https://via.placeholder.com/300x450'
                    }
                    alt={person.name}
                    className='w-full h-[220px] object-cover rounded-lg mb-3'
                  />

                  <h4 className='font-semibold'>{person.name}</h4>

                  <p className='text-sm text-gray-400'>{person.character}</p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className='border-t border-white/10 mt-12'>
        <div className='container mx-auto px-8 py-6 flex justify-between'>
          <span className='font-bold'>🎬 Movie</span>

          <span className='text-gray-500'>Copyright ©2025 Movie Explorer</span>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetail;
