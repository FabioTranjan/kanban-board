export function getFilteredTasks(tasks, searchTerm) {
  return tasks.filter(task => {
    return task.title.match(new RegExp(searchTerm, 'i'));
  });
}
