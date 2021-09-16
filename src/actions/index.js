import { createTaskRequest, fetchTasksRequest } from '../api';

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

export function changeStatus({ id, status }) {
  return ({
    type: 'EDIT_TASK',
    payload: { id, status }
  });
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