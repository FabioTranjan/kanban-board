import { createTaskRequest, fetchTasksRequest, editTaskRequest } from '../api';

export function createTaskSuceeded(task) {
  return ({
    type: 'CREATE_TASK_SUCEEDED',
    payload: { task }
  })
}

export function createTask({ title, description, status = 'Unstarted' }) {
  return dispatch => {
    createTaskRequest({ title, description, status })
      .then(resp => {
        dispatch(createTaskSuceeded(resp.data));
      })
  }
}

export function editTaskSuceeded(task) {
  return ({
    type: 'EDIT_TASK_SUCEEDED',
    payload: { task }
  })
}

export function editTask({ id, status }) {
  return (dispatch, getState) => {
    console.log(getState());
    const task = getState().tasks.find(task => task.id === id);
    const updatedTask = { ...task, status };

    editTaskRequest(id, updatedTask)
      .then(resp => {
        dispatch(editTaskSuceeded(resp.data));
      })
  }
}

export function fetchTasksSuceeded(tasks) {
  return ({
    type: 'FETCH_TASKS_SUCEEDED',
    payload: { tasks }
  })
}

export function fetchTasks() {
  return dispatch => {
    fetchTasksRequest() 
      .then(resp => {
        dispatch(fetchTasksSuceeded(resp.data));
      })
  }
}