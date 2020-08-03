import api from '../../api';
import { getMovies, getSeries } from '../modules/app-module';
import { api_key } from '../../api';

const getMoviesMethod = (type) =>
  api({
    method: 'get',
    url: `/movie/${type}?api_key=${api_key}`,
  });

const getSeriesMethod = (type) =>
  api({
    method: 'get',
    url: `/tv/${type}?api_key=${api_key}`,
  });

export const getMoviesThunk = (info) => async (dispatch) => {
  try {
    const response = await getMoviesMethod(info);
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

export const getSeriesThunk = (info) => async (dispatch) => {
  try {
    const response = await getSeriesMethod(info);
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