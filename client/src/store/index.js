import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';
import reducer from '../reducers';

let store;

export function configureStore(state: {}) {
  if (!store) {
    store = createStore(
      reducer,
      state,
      composeWithDevTools(applyMiddleware(thunk))
    );
  }

  return store;
}
