import { createSelector } from 'reselect';

const getTasks = state => state.tasks.tasks;
const getSearchTerm = state => state.tasks.searchTerm;

export const getFilteredTasks = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')))
  }
);
