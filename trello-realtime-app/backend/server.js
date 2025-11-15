require('dotenv').config({ path: './.env' });

// Fallback values if .env not loaded
if (!process.env.TRELLO_API_KEY) {
  process.env.TRELLO_API_KEY = 'test123';
  process.env.TRELLO_API_TOKEN = 'test456';
  process.env.PORT = '3001';
  process.env.WEBHOOK_URL = 'https://test.com/webhook';
  console.log('Using fallback environment variables');
}

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

const trelloRoutes = require('./routes/trello');
const webhookRoutes = require('./routes/webhook');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Make io accessible to routes
app.set('io', io);

// Routes
app.use('/api', trelloRoutes);
app.use('/webhook', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Debug environment variables
console.log('Environment variables loaded:');
console.log('TRELLO_API_KEY:', process.env.TRELLO_API_KEY);
console.log('TRELLO_API_TOKEN:', process.env.TRELLO_API_TOKEN);
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for real-time updates`);
});

module.exports = { app, io };