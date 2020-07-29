import api from '../../api';
import { getMovies, getSeries } from '../modules/app-module';
import { api_key } from '../../api';

const getMoviesMethod = () =>
  api({
    method: 'get',
    url: `/movie/popular?api_key=${api_key}`,
  });

const getSeriesMethod = () =>
  api({
    method: 'get',
    url: `/tv/popular?api_key=${api_key}`,
  });

export const getMoviesThunk = () => async (dispatch) => {
  try {
    const response = await getMoviesMethod();
    const movies = response.data.results.map(data => {
      return {
        ...data,
        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        backdrop_poster: `https://image.tmdb.org/t/p/w500${data.backdrop_poster}`,
      }
    })
    dispatch(getMovies(movies))
  } catch (err) {
    console.log('error', err)
  }
}

export const getSeriesThunk = () => async (dispatch) => {
  try {
    const response = await getSeriesMethod();
    const series = response.data.results.map(data => {
      return {
        ...data,
        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        backdrop_poster: `https://image.tmdb.org/t/p/w500${data.backdrop_poster}`,
      }
    })
    dispatch(getSeries(series))
  } catch (err) {
    console.log('error', err)
  }
}