import { createStore, applyMiddleware } from 'redux';
import tasksReducer from './reducers';
import thunk from 'redux-thunk';
import logger from './middleware/logger';
import analytics from './middleware/analytics';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
  };
};

export default createStore(
  rootReducer, 
  applyMiddleware(thunk, logger, analytics)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);