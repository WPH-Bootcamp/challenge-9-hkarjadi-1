// import React from 'react';
import { useMovieDetails } from '@/hooks/useMovies';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const numericMovieId = id ? Number(id) : 0;
  const { data: movieDetailsData } = useMovieDetails(numericMovieId);
  const backdropUrl = movieDetailsData?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movieDetailsData.backdrop_path}`
    : null;

  return (
    <div className='w-full h-full relative bg-black'>
      <div className='w-full h-full'>
        {backdropUrl && <img src={backdropUrl} alt='' />}
      </div>
      <div className='relative top=10 left=10'>
        <h1 className='text-7xl'>{movieDetailsData?.title}</h1>
        {id}
      </div>
    </div>
  );
}

export default MovieDetail;
