import {
  createTaskRequest,
  fetchTasksRequest,
  editTaskRequest,
  fetchProjectsRequest,
} from "../api";

export function fetchProjectsStarted(boards) {
  return { type: "FETCH_PROJECTS_STARTED", payload: { boards } };
}

export function fetchProjectsSucceeded(projects) {
  return { type: "FETCH_PROJECTS_SUCEEDED", payload: { projects } };
}

export function fetchProjectsFailed(err) {
  return { type: "FETCH_PROJECTS_FAILED", payload: err };
}

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsStarted());

    return fetchProjectsRequest()
      .then((resp) => {
        const projects = resp.data;
        dispatch(fetchProjectsSucceeded(projects));
      })
      .catch((err) => {
        console.log(err);
        fetchProjectsFailed(err);
      });
  };
}

export function createTaskSuceeded(task) {
  return {
    type: "CREATE_TASK_SUCEEDED",
    payload: { task },
  };
}

export function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    createTaskRequest({ title, description, status }).then((resp) => {
      dispatch(createTaskSuceeded(resp.data));
    });
  };
}

export function editTaskSuceeded(task) {
  return {
    type: "EDIT_TASK_SUCEEDED",
    payload: { task },
  };
}

export function editTask({ id, status }) {
  return (dispatch, getState) => {
    const task = getState().tasks.tasks.find((task) => task.id === id);
    const updatedTask = { ...task, status };

    editTaskRequest(id, updatedTask).then((resp) => {
      dispatch(editTaskSuceeded(resp.data));
    });
  };
}

export function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: { error },
  };
}

export function fetchTasksSuceeded(tasks) {
  return {
    type: "FETCH_TASKS_SUCEEDED",
    payload: { tasks },
  };
}

export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());

    fetchTasksRequest()
      .then((resp) => {
        // Set a timeout to show the loading indicator
        setTimeout(() => {
          dispatch(fetchTasksSuceeded(resp.data));
        }, 1000);
      })
      .catch((err) => {
        dispatch(fetchTasksFailed(err.message));
      });
  };
}

export function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

export function filterTasks(searchTerm) {
  return { type: "FILTER_TASKS", payload: { searchTerm } };
}

export function setCurrentProjectId(id) {
  return {
    type: "SET_CURRENT_PROJECT_ID",
    payload: { id },
  };
}
