import { createStore, applyMiddleware } from 'redux';
import tasksReducer from './reducers';
import thunk from 'redux-thunk';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
  };
};

export default createStore(
  rootReducer, 
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);