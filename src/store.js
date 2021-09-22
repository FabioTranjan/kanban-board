import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import tasksReducer from './reducers';
import thunk from 'redux-thunk';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
  };
};

export default createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);