// Action Types
export const GET_MOVIES = 'netflix-clone/movies/GET_MOVIES';
export const GET_SERIES = 'netflix-clone/series/GET_SERIES';

// Initial State
const initialState = {
  movies: [],
  series: [],
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