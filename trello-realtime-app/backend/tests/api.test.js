const request = require('supertest');
const { app } = require('../server');

describe('Trello API Endpoints', () => {
  let boardId, listId, cardId;

  beforeAll(async () => {
    // Setup test data
    const boardResponse = await request(app)
      .post('/api/boards')
      .send({ name: 'Test Board', defaultLists: true });
    
    boardId = boardResponse.body.id;
    
    const boardData = await request(app)
      .get(`/api/boards/${boardId}`);
    
    listId = boardData.body.lists[0].id;
  });

  test('POST /api/boards - Create Board', async () => {
    const response = await request(app)
      .post('/api/boards')
      .send({ name: 'Test Board 2', defaultLists: true });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Board 2');
  });

  test('POST /api/tasks - Add Task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        boardId,
        listId,
        name: 'Test Task',
        desc: 'Test Description'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Task');
    cardId = response.body.id;
  });

  test('PUT /api/tasks/:cardId - Update Task', async () => {
    const response = await request(app)
      .put(`/api/tasks/${cardId}`)
      .send({
        name: 'Updated Task',
        desc: 'Updated Description'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Task');
  });

  test('DELETE /api/tasks/:cardId - Delete Task', async () => {
    const response = await request(app)
      .delete(`/api/tasks/${cardId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});