export default function tasks(state = { tasks: [] }, action) {
  if (action.type === 'CREATE_TASK') {
    return { tasks: state.tasks.concat(action.payload) };
  } else if (action.type === 'EDIT_TASK') {
    const { id, status } = action.payload;
    const newTasks = [...state.tasks];
    const newTask = newTasks.find(task => task.id === id);
    newTask.status = status;
    return { tasks: newTasks };
  } else if (action.type === 'FETCH_TASKS_SUCEEDED') {
    return { tasks: action.payload.tasks };
  } else if (action.type === 'CREATE_TASK_SUCEEDED') {
    const newTasks = [ ...state.tasks, action.payload.task ];
    return { tasks: newTasks };
  } else if (action.type === 'EDIT_TASK_SUCEEDED') {
    const { id } = action.payload.task;
    const newTasks = [...state.tasks];
    const task = newTasks.find(task => task.id === id);
    const taskIndex = newTasks.indexOf(task);
    newTasks[taskIndex] = action.payload.task;
    return { tasks: newTasks };
  }
  return state;
}