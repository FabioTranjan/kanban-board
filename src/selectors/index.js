import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const getSearchTerm = (state) => state.page.searchTerm;

const getTasksByProjectId = (state) => {
  if (!state.page.currentProjectId) {
    return [];
  }

  const currentProject = state.projects.items.find(
    (project) => project.id === state.page.currentProjectId
  );

  return currentProject.tasks;
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
