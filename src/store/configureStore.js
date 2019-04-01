import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export default preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      apiMiddleware,
      loggerMiddleware
    )
  )
}
