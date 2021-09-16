import { fetchTasksRequest } from '../api';

let _id = 1;
export function uniqueId() {
  return _id++;
}

export function createTask({ title, description }) {
  return ({
    type: 'CREATE_TASK',
    payload: { id: uniqueId(), title, description, status: 'Unstarted' }
  });
}

export function changeStatus({ id, status }) {
  return ({
    type: 'EDIT_TASK',
    payload: { id, status }
  });
}

export function fetchTasksSucceeded(tasks) {
  console.log(tasks);
  return ({
    type: 'FETCH_TASKS_SUCEEDED',
    payload: { tasks }
  })
}

export function fetchTasks() {
  return dispatch => {
    fetchTasksRequest() 
      .then(resp => {
        dispatch(fetchTasksSucceeded(resp.data));
      })
  }
}