import { createSelector } from 'reselect';
import { TASK_STATUSES } from '../constants';

const getTasks = state => state.tasks.tasks;
const getSearchTerm = state => state.tasks.searchTerm;

export const getFilteredTasks = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')))
  }
);

export const getGroupedTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    let groupedTasks = {};
    TASK_STATUSES.forEach(status => {
      groupedTasks = { ...groupedTasks, [status]: tasks.filter(task => task.status === status)};
    });
    return groupedTasks;
  }
);
