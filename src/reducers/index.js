const initialTasksState = {
  items: {},
  isLoading: false,
  error: null,
};

const initialProjectsState = {
  items: {},
  isLoading: false,
  error: null,
};

const initialPageState = {
  currentProjectId: null,
  searchTerm: "",
};

export function pageReducer(state = initialPageState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return { ...state, currentProjectId: action.payload.id };
    }
    case "FILTER_TASKS": {
      return { ...state, searchTerm: action.payload.searchTerm };
    }
    default: {
      return state;
    }
  }
}

export function projectsReducer(state = initialProjectsState, action) {
  switch (action.type) {
    case "RECEIVE_ENTITIES": {
      const { entities } = action.payload;
      if (entities && entities.projects) {
        return {
          ...state,
          isLoading: false,
          items: entities.projects,
        };
      }
      return state;
    }
    case "FETCH_PROJECTS_STARTED": {
      return { ...state, isLoading: true };
    }
    case "FETCH_PROJECTS_SUCEEDED": {
      return { ...state, isLoading: false, items: action.payload.projects };
    }
    case "FETCH_PROJECTS_FAILED": {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case "CREATE_TASK_SUCEEDED": {
      const { task } = action.payload;
      const project = state.items[task.projectId];

      const newProjects = { ...state.items };
      const newTasks = [...project.tasks, task.id];
      newProjects[task.projectId] = { ...project, tasks: newTasks };

      return { ...state, items: newProjects };
    }
    default: {
      return state;
    }
  }
}

export function tasksReducer(state = initialTasksState, action) {
  switch (action.type) {
    case "CREATE_TASK_SUCEEDED": {
      const { task } = action.payload;
      const nextTasks = {
        ...state.items,
        [task.id]: task,
      };

      return {
        ...state,
        items: nextTasks,
      };
    }
    case "EDIT_TASK_SUCEEDED": {
      const { task } = action.payload;

      const newTasks = { ...state.items };
      newTasks[task.id] = task;

      return {
        ...state,
        items: newTasks,
      };
    }
    case "RECEIVE_ENTITIES": {
      const { entities } = action.payload;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks,
        };
      }
      return state;
    }
    case "TIMER_INCREMENT": {
      const nextTasks = Object.keys(state.items).map((taskId) => {
        const task = state.items[taskId];
        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });
      return { ...state, tasks: nextTasks };
    }
    default: {
      return state;
    }
  }
}
