// Action Types
export const GET_MOVIES = 'netflix-clone/movies/GET_MOVIES';
export const GET_SERIES = 'netflix-clone/series/GET_SERIES';
export const FILTERED_MOVIES = 'netflix-clone/movies/FILTERED_MOVIES';
export const FILTERED_SERIES = 'netflix-clone/series/FILTERED_SERIES';
export const OPEN_DETAILS_SERIES = 'netflix-clone/series/OPEN_DETAILS_SERIES'
export const OPEN_DETAILS_MOVIES = 'netflix-clone/movies/OPEN_DETAILS_MOVIES'

// Initial State
const initialState = {
  movies: [],
  series: [],
  filteredMovies: [],
  filteredSeries: [],
  detailsSeries: [],
  detailsMovies: [],
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