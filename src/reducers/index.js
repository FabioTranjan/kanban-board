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
  searchTerm: "",
};

export function pageReducer(state = initialPageState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return { ...state, currentProjectId: action.payload.id };
    }
    case "FILTER_TASKS": {
      return { ...state, searchTerm: action.searchTerm };
    }
    default: {
      return state;
    }
  }
}

export function projectsReducer(state = initialProjectsState, action) {
  switch (action.type) {
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
      const projectIndex = state.items.findIndex(
        (project) => project.id === task.projectId
      );

      const newProjects = [...state.items];
      const newProject = newProjects[projectIndex];

      newProjects[projectIndex] = {
        ...newProject,
        tasks: newProject.tasks.concat(task),
      };

      return {
        ...state,
        items: newProjects,
      };
    }
    case "EDIT_TASK_SUCEEDED": {
      const { task } = action.payload;
      const projectIndex = state.items.findIndex(
        (project) => project.id === task.projectId
      );

      const newProjects = [...state.items];
      const project = newProjects[projectIndex];
      const newTasks = [...project.tasks];
      const taskIndex = newTasks.findIndex((t) => t.id === task.id);
      newTasks[taskIndex] = task;
      newProjects[projectIndex].tasks = newTasks;

      return {
        ...state,
        items: newProjects,
      };
    }
    default: {
      return state;
    }
  }
}

export function tasksReducer(state = initialTasksState, action) {
  switch (action.type) {
    case "FILTER_TASKS": {
      return { ...state, searchTerm: action.payload.searchTerm };
    }
    default: {
      return state;
    }
  }
}
