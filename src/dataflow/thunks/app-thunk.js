import api from '../../api';
import { getMovies, getSeries, searchMovies, searchSeries, openDetailsSeries, openDetailsMovies } from '../modules/app-module';
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

  
const searchMoviesMethod = (value) => 
  api({
    method: 'get',
    url: `search/movie?api_key=${api_key}&query=${value}&language=en-US`
  })

const searchSeriesMethod = (value) => 
  api({
    method: 'get',
    url: `/search/tv?api_key=${api_key}&query=${value}&language=en-US`
  })

const detailsSeriesMethod = (id) => 
  api({
    method: 'get',
    url: `/tv/${id}?api_key=${api_key}`,
  })

  const detailsMoviesMethod = (id) => 
  api({
    method: 'get',
    url: `/movie/${id}?api_key=${api_key}`,
  })


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

export const searchMoviesThunk = (value) => async (dispatch) => {
  try{
    const response = await searchMoviesMethod(value)
    const filteredMovies = response.data.results.map(data => {
      return{
        ...data,
        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        backdrop_poster: `https://image.tmdb.org/t/p/w500${data.backdrop_poster}`,
      }
    })
    dispatch(searchMovies(filteredMovies))
  } catch(err){
    console.log('erro', err);
  }
}

export const searchSeriesThunk = (value) => async (dispatch) => {
  try{
    const response = await searchSeriesMethod(value)
    const filteredSeries = response.data.results.map(data => {
      return{
        ...data,
        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        backdrop_poster: `https://image.tmdb.org/t/p/w500${data.backdrop_poster}`,
      }
    })
    dispatch(searchSeries(filteredSeries))
  } catch(err){
    console.log('erro', err);
  }
}

export const detailsSeriesThunk = (id) => async (dispatch) => {
  try{
    const response = await detailsSeriesMethod(id)
    const details = response.data
    console.log('resposta', details)
    dispatch(openDetailsSeries(details))
  } catch(err){
    console.log('erro', err)
  }
} 

export const detailsMoviesThunk = (id) => async (dispatch) => {
  try{
    const response = await detailsMoviesMethod(id)
    const details = response.data
    dispatch(openDetailsMovies(details))
    console.log('detalhe', details)
  } catch(err){
    console.log('erro', err)
  }
} 