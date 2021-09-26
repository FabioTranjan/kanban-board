import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

export const getProjects = (state) => {
  return Object.keys(state.projects.items).map((id) => {
    return state.projects.items[id];
  });
};

export const getSearchTerm = (state) => state.page.searchTerm;

export const getTasksByProjectId = (state) => {
  const { currentProjectId } = state.page;

  if (!currentProjectId || !state.projects.items[currentProjectId]) return [];

  const taskIds = state.projects.items[currentProjectId].tasks;
  return taskIds.map((id) => state.tasks.items[id]);
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter((task) =>
      task.title.match(new RegExp(searchTerm, "i"))
    );
  }
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    let groupedTasks = {};
    TASK_STATUSES.forEach((status) => {
      groupedTasks = {
        ...groupedTasks,
        [status]: tasks.filter((task) => task.status === status),
      };
    });
    return groupedTasks;
  }
);
