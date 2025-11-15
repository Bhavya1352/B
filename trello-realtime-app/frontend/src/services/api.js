import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

export const boardAPI = {
  create: (data) => api.post('/boards', data),
  get: (boardId) => api.get(`/boards/${boardId}`),
};

export const taskAPI = {
  create: (data) => api.post('/tasks', data),
  update: (cardId, data) => api.put(`/tasks/${cardId}`, data),
  delete: (cardId) => api.delete(`/tasks/${cardId}`),
};

export default api;