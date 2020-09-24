import api from '../../api';
import { 
  getMovies, 
  getSeries, 
  searchMovies, 
  searchSeries, 
  openDetailsSeries,
  openDetailsMovies, 
  getVideosMovies, 
  getImagesMovies, 
  getSeasons, 
  getCastMovies,
  getEpisodes,
} from '../modules/app-module';
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

  const getVideoMoviesMethod = (id) =>
  api({
    method: 'get',
    url: `/movie/${id}/videos?api_key=${api_key}&language=en-US`,
  })

  const getImagesMoviesMethod = (id) => 
  api({
    method: 'get',
    url:`/movie/${id}/images?api_key=${api_key}`,
  })  

  const getSeasonMethod = (id) =>
  api({
    method: 'get',
    url: `/tv/${id}?api_key=${api_key}`,
  })

  const getEpisodesMethod = (item) =>
  api({
    method: 'get',
    url:`/tv/${item.serieId}/season/${item.season}?api_key=${api_key}`
  })

  const getCastMoviesMethod = (id) => 
  api({
    method: 'get',
    url: `/movie/${id}/credits?api_key=${api_key}`,
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
        backdrop_path: `https://image.tmdb.org/t/p/w500${data.backdrop_poster}`,
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
  } catch(err){
    console.log('erro', err)
  }
} 

export const getVideoMoviesThunk = (id) => async (dispatch) => {
  try {
    const response = await getVideoMoviesMethod(id)
    const videos = response.data.results[0]
    console.log('reponse videos', videos)
    dispatch(getVideosMovies(videos))
  } catch (err) {
    console.log('err', err);
  }
}

export const getImagesMoviesThunk = (id) => async (dispatch) => {
  try {
    const response = await getImagesMoviesMethod(id)
    const images = response.data.backdrops
    dispatch(getImagesMovies(images))
  } catch (err) {
    console.log('erro', err)
  }
}

export const getSeasonThunk = (id) => async (dispatch) => {
  try {
    const response = await getSeasonMethod(id)
    const seasons = response.data.seasons
    console.log('temporadas', seasons)
    dispatch(getSeasons(seasons))
  } catch (err) {
    console.log('error', err)
  }
}

export const getEpisodesThunk = (item) => async (dispatch) =>{
  console.log('item', item.seasonId, item.seasonNumber)
  try{
    const response = await getEpisodesMethod(item)
    const episodes = response.data.episodes
    console.log(episodes)
    dispatch(getEpisodes(episodes))
  }catch(err){
    console.log('err', err)
  }
}

export const getCastMoviesThunk = (id) => async (dispatch) => {
  try{
    const response = await getCastMoviesMethod(id)
    const cast = response.data.cast
    console.log('response', cast)
    dispatch(getCastMovies(cast));
  } catch(err){
    console.log('error', err)
  }
}