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
    return { tasks: action.payload.tasks};
  }
  return state;
}