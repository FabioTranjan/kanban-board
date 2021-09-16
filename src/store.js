import { createStore, applyMiddleware } from 'redux';
import tasksReducer from './reducers';
import thunk from 'redux-thunk';

export default createStore(
  tasksReducer,
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);