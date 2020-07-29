// Libs
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';

import thunkMiddleware from 'redux-thunk';

// Reducers
import Movies from './dataflow/modules/app-module';
import Series from './dataflow/modules/app-module';

const reducers = combineReducers({
  movies: Movies,
  series: Series,
});

const rootReducer = (state, action) => {
  if (action.meta && action.meta.logout) {
    state = undefined;
  }
  return reducers(state, action)
}

const configureStore = (initialState) => {
  const bundle = compose(applyMiddleware(
    thunkMiddleware,
  ));
  const createStoreWithMiddleware = bundle(createStore);
  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );
  return store;
}

export default configureStore({});