import { createTaskRequest, editTaskRequest } from '../api';
import { CALL_API } from '../middleware/api';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCEEDED = 'FETCH_TASKS_SUCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export function fetchTasks() {
  return {
    [CALL_API]: {
      types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCEEDED, FETCH_TASKS_FAILED],
      endpoint: '/tasks',
    }
  };
}

export function createTaskSuceeded(task) {
  return ({
    type: 'CREATE_TASK_SUCEEDED',
    payload: { task },
    meta: {
      analytics: {
        event: 'create_task',
        data: {
          id: task.id
        }
      }
    }
  });
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
    const task = getState().tasks.tasks.find(task => task.id === id);
    const updatedTask = { ...task, status };

    editTaskRequest(id, updatedTask)
      .then(resp => {
        dispatch(editTaskSuceeded(resp.data));
      })
  }
}
