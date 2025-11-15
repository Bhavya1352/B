# 🎥 Demo Script for Trello Real-time Board

## Demo Flow (3-5 minutes)

### Setup (30 seconds)
1. Show project structure in VS Code
2. Highlight backend and frontend separation
3. Show .env configuration (without revealing keys)

### Backend Demo (1 minute)
```bash
# Terminal 1: Start backend
cd backend
npm run dev
# Show server starting with WebSocket ready message
```

### Frontend Demo (1 minute)
```bash
# Terminal 2: Start frontend  
cd frontend
npm run dev
# Show React app loading at localhost:3000
```

### Real-time Sync Demo (2 minutes)

#### Step 1: Open Two Browser Windows
- Window 1: `http://localhost:3000`
- Window 2: `http://localhost:3000` (incognito/different browser)
- Show connection status indicator (green dot)

#### Step 2: Create Board
- In Window 1: Click "Create New Board"
- Enter name: "Live Demo Board"
- Show board creation in both windows instantly

#### Step 3: Add Cards
- In Window 1: Add card "Task 1" to "To Do" list
- Show card appearing in Window 2 immediately
- In Window 2: Add card "Task 2" to "Doing" list  
- Show card appearing in Window 1 immediately

#### Step 4: Update Cards
- In Window 1: Click and edit "Task 1" → "Updated Task 1"
- Show update reflecting in Window 2 in real-time
- In Window 2: Edit "Task 2" description
- Show update in Window 1

#### Step 5: Delete Cards
- In Window 1: Delete "Updated Task 1"
- Show deletion in Window 2 instantly

### API Testing Demo (1 minute)

#### Postman Collection
```bash
# Import postman-collection.json
# Run the collection to test all 4 endpoints:
# 1. POST /api/boards
# 2. POST /api/tasks  
# 3. PUT /api/tasks/:cardId
# 4. DELETE /api/tasks/:cardId
```

#### Show Network Tab
- Demonstrate WebSocket connection in browser dev tools
- Show real-time events being received

### Technical Highlights (30 seconds)
- **Backend**: Node.js/Express + Socket.IO + Trello API
- **Frontend**: React + Vite + Socket.IO client
- **Real-time**: WebSocket events + Trello webhooks
- **APIs**: All 4 required endpoints implemented
- **Testing**: Postman collection + Jest tests

## Key Points to Emphasize

✅ **Real-time synchronization** across multiple clients
✅ **Four required API endpoints** all working
✅ **Trello API integration** for persistent storage  
✅ **WebSocket implementation** for live updates
✅ **Modern tech stack** (React, Node.js, Socket.IO)
✅ **Clean code structure** with separation of concerns
✅ **Comprehensive documentation** and setup instructions
✅ **Testing suite** with Postman collection

## Troubleshooting During Demo

### If WebSocket disconnects:
- Show reconnection handling
- Demonstrate graceful degradation

### If API calls fail:
- Show error handling in UI
- Demonstrate user-friendly error messages

### If Trello webhook delays:
- Explain webhook vs polling approach
- Show direct API updates still work

## Demo Conclusion

"This project demonstrates:
- Full-stack development skills
- Real-time web application architecture  
- API integration and webhook handling
- Modern React development practices
- Professional code organization and documentation

Ready for production deployment and further feature development."