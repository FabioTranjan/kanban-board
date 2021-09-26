import { normalize, schema } from "normalizr";
import {
  createTaskRequest,
  fetchTasksRequest,
  editTaskRequest,
  fetchProjectsRequest,
} from "../api";

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", {
  tasks: [taskSchema],
});

function receiveEntities(entities) {
  return {
    type: 'RECEIVE_ENTITIES',
    payload: entities,
  };
}

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
        const normalizedData = normalize(projects, [projectSchema]);
        dispatch(receiveEntities(normalizedData));

        if (!getState().page.currentProjectId) {
          const defaultProjectId = projects[0].id;
          dispatch(setCurrentProjectId(defaultProjectId));
        }
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

export function createTask({
  title,
  description,
  projectId,
  status = "Unstarted",
}) {
  return (dispatch) => {
    createTaskRequest({ title, description, status, projectId }).then(
      (resp) => {
        dispatch(createTaskSuceeded(resp.data));
      }
    );
  };
}

export function editTaskSuceeded(task) {
  return {
    type: "EDIT_TASK_SUCEEDED",
    payload: { task },
  };
}

export function editTask({ id, projectId, status }) {
  return (dispatch, getState) => {
    const project = getState().projects.items.find(
      (project) => project.id === projectId
    );
    const task = project.tasks.find((task) => task.id === id);
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
