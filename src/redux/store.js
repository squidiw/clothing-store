import { createStore, applyMiddleware } from 'redux';

// USED FOR DEBUGGING REDUX CODE
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
