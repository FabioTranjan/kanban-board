import { makeCall } from '../api';

export const CALL_API = 'CALL_API';

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API];
  if (typeof callApi === 'undefined') {
    return next(action);
  }

  const { types, endpoint, method, params } = callApi;

  const [startType, successType, failureType] = types;

  next({ type: startType });

  let body = { ...params };
  if (method === 'PUT') {
    const task = store.getState().tasks.tasks.find(task => task.id === params.id);
    body = { ...task, ...body };
  }

  return makeCall(endpoint, method, body).then(
    response =>
      next({
        type: successType,
        payload: response.data,
      }),
    error =>
      next({
        type: failureType,
        error: error.message,
      }),
  );
};

export default apiMiddleware;