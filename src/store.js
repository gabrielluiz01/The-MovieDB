// Libs
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';

import thunkMiddleware from 'redux-thunk';

// Reducers
import Content from './dataflow/modules/app-module';

const reducers = combineReducers({
  content: Content,
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
  if (module.hot) {
    module.hot.accept(reducers, () => {
      store.replaceReducer(reducers);
    })
  }
  return store;
}

export default configureStore({});