import axios from "axios";

const API_BASE_URL = 'http://localhost:3001';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function fetchProjectsRequest() {
  return client.get('/projects?_embed=tasks');
}

export function fetchTasksRequest() {
  return client.get('/tasks');
}

export function createTaskRequest(params) {
  return client.post('/tasks', params);
}

export function editTaskRequest(id, params) {
  return client.put(`/tasks/${id}`, params);
}
