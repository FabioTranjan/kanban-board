import { createStore } from 'redux';
import tasksReducer from './reducers';

export default createStore(tasksReducer);