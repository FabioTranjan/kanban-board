import axios from "axios";

const API_BASE_URL = 'http://localhost:3001';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function fetchTasksRequest() {
  return client.get('/tasks');
}

export function createTaskRequest(params) {
  return client.post('/tasks', params);
}