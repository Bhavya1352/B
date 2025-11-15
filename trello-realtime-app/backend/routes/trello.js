const express = require('express');
const router = express.Router();
const trelloService = require('../services/trelloService');

// 1. Create new board
router.post('/boards', async (req, res) => {
  console.log('📋 Board creation request received');
  console.log('Request body:', req.body);
  
  try {
    const { name, defaultLists = true } = req.body;
    
    if (!name) {
      console.log('❌ No board name provided');
      return res.status(400).json({ error: 'Board name is required' });
    }

    console.log('✅ Creating board:', name);
    const board = await trelloService.createBoard(name, defaultLists);
    console.log('✅ Board created successfully:', board.id);
    
    // Broadcast to all connected clients
    req.app.get('io').emit('boardCreated', board);
    
    res.status(201).json(board);
  } catch (error) {
    console.error('❌ Create board error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create board' });
  }
});

// 2. Create new task (card)
router.post('/tasks', async (req, res) => {
  try {
    const { boardId, listId, name, desc } = req.body;
    
    if (!listId || !name) {
      return res.status(400).json({ error: 'listId and name are required' });
    }

    const card = await trelloService.createCard(boardId, listId, name, desc);
    
    // Broadcast to all connected clients
    req.app.get('io').emit('cardCreated', card);
    
    res.status(201).json(card);
  } catch (error) {
    console.error('Create task error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// 3. Update existing task (card)
router.put('/tasks/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    const updates = req.body;
    
    const updatedCard = await trelloService.updateCard(cardId, updates);
    
    // Broadcast to all connected clients
    req.app.get('io').emit('cardUpdated', updatedCard);
    
    res.json(updatedCard);
  } catch (error) {
    console.error('Update task error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// 4. Delete task (card)
router.delete('/tasks/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    
    const result = await trelloService.deleteCard(cardId);
    
    // Broadcast to all connected clients
    req.app.get('io').emit('cardDeleted', { id: cardId });
    
    res.json({ message: 'Task deleted successfully', result });
  } catch (error) {
    console.error('Delete task error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Get board data
router.get('/boards/:boardId', async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await trelloService.getBoard(boardId);
    res.json(board);
  } catch (error) {
    console.error('Get board error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

module.exports = router;