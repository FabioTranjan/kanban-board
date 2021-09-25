import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { tasksReducer, projectsReducer, pageReducer } from "../reducers";

const rootReducer = (state = {}, action) => {
  return {
    page: pageReducer(state.page, action),
    tasks: tasksReducer(state.tasks, action),
    projects: projectsReducer(state.projects, action),
  };
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
