const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
}

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS_STARTED': {
      return { ...state, isLoading: true };
    }
    case 'FETCH_TASKS_SUCCEEDED': {
      return { ...state, isLoading: false, tasks: action.payload };
    }
    case 'FETCH_TASKS_FAILED': {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case 'CREATE_TASKS_SUCCEEDED': {
      const newTasks = [ ...state.tasks, action.payload ];
      return { ...state, tasks: newTasks };
    }
    case 'EDIT_TASKS_SUCCEEDED': {
      const { id } = action.payload;
      const newTasks = [...state.tasks];
      const task = newTasks.find(task => task.id === id);
      const taskIndex = newTasks.indexOf(task);
      newTasks[taskIndex] = action.payload;
      return { ...state, tasks: newTasks };
    }
    default: {
      return state;
    }
  }
}