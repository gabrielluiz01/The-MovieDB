// Action Types
export const GET_MOVIES = 'netflix-clone/movies/GET_MOVIES';
export const GET_SERIES = 'netflix-clone/series/GET_SERIES';
export const FILTERED_MOVIES = 'netflix-clone/movies/FILTERED_MOVIES';
export const FILTERED_SERIES = 'netflix-clone/series/FILTERED_SERIES';
export const OPEN_DETAILS_SERIES = 'netflix-clone/series/OPEN_DETAILS_SERIES';
export const OPEN_DETAILS_MOVIES = 'netflix-clone/movies/OPEN_DETAILS_MOVIES';
export const GET_VIDEOS_MOVIES = 'netflix-clone/movies/GET_VIDEOS_MOVIES';
export const GET_IMAGES_MOVIES = 'netflix-clone/movies/GET_IMAGES_MOVIES';
export const GET_SEASONS = 'netflix-clone/series/GET_SEASONS';
export const GET_CAST_MOVIES = 'netflix-clone/movies/GET_CAST_MOVIES'
export const SAVE_ID_SERIES = 'netflix-clone/movies/SAVE_ID_SERIES';
export const GET_EPISODES = 'netflix-clone/series/GET_EPISODES';
export const CLEAR = 'netflix-clone/app/CLEAR';

// Initial State
const initialState = {
  movies: [],
  series: [],
  filteredMovies: [],
  filteredSeries: [],
  detailsSeries: [],
  detailsMovies: [],
  moviesVideos: [],
  imagesMovies: [],
  seasons: [],
  castMovies: [],
  idSeries: '',
  episodes: [],
}

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.info
      }
    case GET_SERIES:
      return {
        ...state,
        series: action.info
      }
      case FILTERED_MOVIES:
        return{
          ...state,
          filteredMovies: action.info
        }
      case FILTERED_SERIES:
        return{
          ...state,
          filteredSeries: action.info
        }
      case OPEN_DETAILS_SERIES:
        return{
          ...state,
          detailsSeries: state.detailsSeries.concat(action.info),
        }
      case OPEN_DETAILS_MOVIES:
        return{
          ...state,
          detailsMovies: state.detailsMovies.concat(action.info),
        }
      case GET_VIDEOS_MOVIES:
        return {
          ...state,
          moviesVideos: action.info
        }
      case GET_IMAGES_MOVIES:
      return {
        ...state,
        imagesMovies: state.imagesMovies.concat(action.info),
      }
      case GET_SEASONS:
      return {
        ...state,
        seasons: action.info,
        }
      case GET_CAST_MOVIES:
        return{
          ...state,
          castMovies: state.castMovies.concat(action.info),
        }
      case SAVE_ID_SERIES:
        return{
          ...state,
          id: action.info
        }
      case GET_EPISODES:
        return{
          ...state,
          episodes: action.info,
        }
      case CLEAR:
        return{
          ...state,
          detailsSeries: [],
          detailsMovies: [],
          imagesMovies: [],
        }
    default:
      return state;
  }
}

// Action Creators
export const getMovies = (info) => ({
  type: GET_MOVIES,
  info,
});

export const getSeries = (info) => ({
  type: GET_SERIES,
  info,
});

export const searchMovies = (info) => ({
  type: FILTERED_MOVIES,
  info
});

export const searchSeries = (info) => ({
  type: FILTERED_SERIES,
  info
});

export const openDetailsSeries = (info) => ({
  type: OPEN_DETAILS_SERIES,
  info
});

export const openDetailsMovies = (info) => ({
  type: OPEN_DETAILS_MOVIES,
  info
});

export const getVideosMovies = (info) => ({
  type: GET_VIDEOS_MOVIES,
  info
});

export const getImagesMovies = (info) => ({
  type: GET_IMAGES_MOVIES,
  info
});

export const getSeasons = (info) => ({
  type: GET_SEASONS,
  info
});

export const getCastMovies = (info) => ({
  type: GET_CAST_MOVIES,
  info
});

export const saveId = (info)  => ({
  type: SAVE_ID_SERIES,
  info
});

export const getEpisodes = (info) => ({
  type: GET_EPISODES,
  info
});

export const clear = (info) => ({
  type: CLEAR,
  info
});