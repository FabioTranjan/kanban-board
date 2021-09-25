const initialTasksState = {
  isLoading: false,
  error: null,
};

const initialProjectsState = {
  items: [],
  isLoading: false,
  error: null,
};

const initialPageState = {
  currentProjectId: null,
  searchTerm: '',
};

export function pageReducer(state = initialPageState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT_ID': {
      return { ...state, currentProjectId: action.payload.id };
    }
    case 'FILTER_TASKS': {
      return { ...state, searchTerm: action.searchTerm };
    }
    default: {
      return state;
    }
  };
}

export function projectsReducer(state = initialProjectsState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_STARTED': {
      return { ...state, isLoading: true };
    }
    case 'FETCH_PROJECTS_SUCEEDED': {
      return { ...state, isLoading: false, items: action.payload.projects };
    }
    case 'FETCH_PROJECTS_FAILED': {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default: {
      return state;
    }
  }
}

export function tasksReducer(state = initialTasksState, action) {
  switch (action.type) {
    case 'CREATE_TASK_SUCEEDED': {
      const newTasks = [ ...state.tasks, action.payload.task ];
      return { ...state, tasks: newTasks };
    }
    case 'EDIT_TASK_SUCEEDED': {
      const { id } = action.payload.task;
      const newTasks = [...state.tasks];
      const task = newTasks.find(task => task.id === id);
      const taskIndex = newTasks.indexOf(task);
      newTasks[taskIndex] = action.payload.task;
      return { ...state, tasks: newTasks };
    }
    case 'FILTER_TASKS': {
      return { ...state, searchTerm: action.payload.searchTerm };
    }
    default: {
      return state;
    }
  }
}