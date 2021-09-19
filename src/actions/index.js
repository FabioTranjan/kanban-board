import { CALL_API } from '../middleware/api';

export const TASKS_ENDPOINT = '/tasks';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export const CREATE_TASKS_STARTED = 'CREATE_TASKS_STARTED';
export const CREATE_TASKS_SUCCEEDED = 'CREATE_TASKS_SUCCEEDED';
export const CREATE_TASKS_FAILED = 'CREATE_TASKS_FAILED';

export const EDIT_TASKS_STARTED = 'EDIT_TASKS_STARTED';
export const EDIT_TASKS_SUCCEEDED = 'EDIT_TASKS_SUCCEEDED';
export const EDIT_TASKS_FAILED = 'EDIT_TASKS_FAILED';

export function fetchTasks() {
  return {
    [CALL_API]: {
      types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
      endpoint: TASKS_ENDPOINT,
      method: 'GET'
    }
  };
}

export function createTask({ title, description, status = 'Unstarted' }) {
  return {
    [CALL_API]: {
      types: [CREATE_TASKS_STARTED, CREATE_TASKS_SUCCEEDED, CREATE_TASKS_FAILED],
      endpoint: TASKS_ENDPOINT,
      method: 'POST',
      params: { title, description, status }
    }
  };
}

export function editTask({ id, status }) {
  const editEndpoint = `${TASKS_ENDPOINT}/${id}`;
  return {
    [CALL_API]: {
      types: [EDIT_TASKS_STARTED, EDIT_TASKS_SUCCEEDED, EDIT_TASKS_FAILED],
      endpoint: editEndpoint,
      method: 'PUT',
      params: { id, status }
    }
  };
}
