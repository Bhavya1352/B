const express = require('express');
const router = express.Router();

// Webhook endpoint for Trello events
router.post('/', (req, res) => {
  try {
    const { action } = req.body;
    
    if (!action) {
      return res.status(200).send('OK');
    }

    const io = req.app.get('io');
    
    // Process different Trello webhook events
    switch (action.type) {
      case 'createCard':
        io.emit('cardCreated', action.data.card);
        break;
        
      case 'updateCard':
        io.emit('cardUpdated', action.data.card);
        break;
        
      case 'deleteCard':
        io.emit('cardDeleted', { id: action.data.card.id });
        break;
        
      case 'createBoard':
        io.emit('boardCreated', action.data.board);
        break;
        
      default:
        console.log('Unhandled webhook event:', action.type);
    }
    
    console.log(`📡 Webhook received: ${action.type}`);
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Webhook verification (Trello sends HEAD request)
router.head('/', (req, res) => {
  res.status(200).send('OK');
});

module.exports = router;