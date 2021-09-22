import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tasksReducer from '../reducers';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
  };
};

export default createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);