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
    case 'FETCH_TASKS_SUCEEDED': {
      return { ...state, isLoading: false, tasks: action.payload };
    }
    case 'FETCH_TASKS_FAILED': {
      return { ...state, isLoading: false, error: action.payload.error };
    }
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
    default: {
      return state;
    }
  }
}