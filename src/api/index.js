import axios from "axios";

const API_BASE_URL = 'http://localhost:3001';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function makeCall(endpoint, method, body = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const params = {
    method,
    url,
    data: body
  }

  return client(params).then(resp => resp).catch(err => err);
}