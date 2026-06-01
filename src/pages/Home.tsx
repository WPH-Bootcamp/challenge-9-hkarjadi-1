//import { useRef } from 'react';
import type { Movie } from '../types/movie';
import Star from '../assets/Star.svg';
import { Button } from '../../src/components/ui/button';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

import { usePopularMovies, useNowPlayingMovies } from '../hooks/useMovies';

function Home() {
  const {
    data: popularData,
    //  isLoading:popularIsLoading,
    //  isError:popularIsError,
    //  error:popularError
  } = usePopularMovies();

  const {
    data: nowPlayingData,
    //    isLoading:nowPlayingIsLoading,
    //    isError:nowPlayingIsError,
    //    error:nowPlayingError,
    fetchNextPage: nowPlayingFetchNextPage,
    hasNextPage: nowPlayingHasNextPage,
    isFetchingNextPage: nowPlayingIsFetchingNextPage,
  } = useNowPlayingMovies();

  const [rndIndex] = useState(() => Math.floor(Math.random() * 19));

  return (
    <div>
      <div id='MainBannerSection' className='w-full pb-30 md:pb-40'>
        {popularData?.results?.map((movieItem: Movie, index: number) => (
          <div>
            {index === rndIndex && (
              <div className='relative '>
                <div className='w-full b-6'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}
                    alt={movieItem.title}
                    className='w-full aspect-3/4 object-cover object-[center_5%] md:aspect-video md:max-h-[110vh] md:object-top'
                  />
                </div>
                <div className='absolute -bottom-10 left-4 mr-4 '>
                  <div>
                    <div className='text-2xl leading-9 font-bold md:text-5xl md:leading-15 md:tracking-[-2%]'>
                      {movieItem.title}
                    </div>
                    <div className='text-sm leading-7 font-normal text-neutral-40'>
                      {movieItem.overview}
                    </div>
                  </div>

                  {/* <div className='w-full flex flex-col justify-center items-center gap-4'>
                    <Button className='w-full max-w-90 text-md z-20 hover:scale-105 transition-transform bg-primary-300'>
                      Watch Trailer
                    </Button>
                    <Button className='text-md z-20 hover:scale-105 transition-transform'>
                      See Detail
                    </Button>
                  </div> */}

                  <div className='w-full flex flex-col justify-center items-center gap-4'>
                    <Button className='w-full max-w-90 text-md z-20 hover:scale-105 transition-transform bg-primary-300'>
                      Watch Trailer
                    </Button>

                    <Link
                      to={`/movie-detail-page/${movieItem.id}`}
                      className='w-full flex justify-center'
                    >
                      <Button className='text-md z-20 hover:scale-105 transition-transform'>
                        See Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        id='TrendingNowSection'
        className='relative w-full px-4 py-10 gap-6 md:py-30 md:pt-0 md:pb-21 xl:py-35'
      >
        <div className='text-2xl leading-9 font-bold '>Trending Now</div>

        <Carousel className='w-full' opts={{ align: 'center' }}>
          <CarouselContent className='px-4 md:px-25'>
            {popularData?.results?.map((movieItem: Movie) => (
              <CarouselItem
                key={movieItem.id}
                className='basis-1/2 sm:basis-1/3  md:basis-1/4 lg:basis-[18%]'
              >
                <div className='flex flex-row gap-4 w-40 h-auto'>
                  <Link to={`/movie-detail-page/${movieItem.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}
                      alt={movieItem.title}
                      className='w-full h-auto object-cover rounded-xl'
                    />
                  </Link>
                </div>
                <div>
                  <h2 className='text-lg leading-8 font-semibold'>
                    {movieItem.title}
                  </h2>
                  <div className=''>
                    <img src={Star} alt='menu' className='w-4 h-4' />
                    <span className='text-neutral-400'>
                      {Math.round(movieItem.vote_average * 10) / 10}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-10 peer/prev disabled:hidden z-10' />
          <CarouselNext className='right-10 peer/next disabled:hidden z-10' />
        </Carousel>
      </div>

      <div
        id='NewReleaseSection'
        className=' relative w-full px-4 pt-0 pb-10 xl:py-35 md:pb-22.5'
      >
        <div className='text-2xl leading-9 font-bold'>New Release</div>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10'>
          {nowPlayingData?.pages
            ?.flatMap((p) => p.results.slice(5))
            ?.map((movieItem) => (
              <div key={movieItem.id}>
                <div className='h-67 w-44 md:h-80 md:w-54'>
                  <Link to={`/movie-detail-page/${movieItem.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}
                      alt={movieItem.title}
                      className='rounded-md md:rounded-xl'
                    />
                  </Link>
                </div>
                <div>
                  <h2 className='text-lg leading-8 font-semibold'>
                    {movieItem.title}
                  </h2>
                  <div className=''>
                    <img src={Star} alt='menu' className='w-4 h-4' />
                    <span className='text-neutral-400'>
                      {Math.round(movieItem.vote_average * 10) / 10}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div
          id='LoadMoreSection'
          className='absolute flex flex-row  bottom-8 left-0 w-full justify-center  items-center py-8 -mt-8 pb-12'
        >
          {nowPlayingHasNextPage && (
            <Button
              className='text-md z-20 hover:scale-105 transition-transform'
              onClick={() => nowPlayingFetchNextPage()}
              disabled={nowPlayingIsFetchingNextPage}
            >
              {nowPlayingIsFetchingNextPage ? (
                <div
                  className='w-6 h-6 border-4 border-white border-t-transparent 
                            rounded-full animate-spin'
                ></div>
              ) : (
                'Load More'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
