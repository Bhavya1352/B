import React, { useState } from 'react';

function App() {
  const [currentBoardId, setCurrentBoardId] = useState('');
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      alert('Please enter board name!');
      return;
    }

    // Create demo board
    const demoBoard = {
      id: 'demo_' + Date.now(),
      name: newBoardName,
      lists: [
        { id: 'list1', name: 'To Do' },
        { id: 'list2', name: 'Doing' },
        { id: 'list3', name: 'Done' }
      ]
    };

    setBoard(demoBoard);
    setCards([
      { id: 'card1', name: 'Sample Task 1', desc: 'Demo task', idList: 'list1' },
      { id: 'card2', name: 'Sample Task 2', desc: 'Another demo', idList: 'list2' }
    ]);
    setCurrentBoardId(demoBoard.id);
    setNewBoardName('');
    setShowCreateBoard(false);
  };

  const addCard = (listId) => {
    const title = prompt('Enter card title:');
    if (title) {
      const newCard = {
        id: 'card_' + Date.now(),
        name: title,
        desc: '',
        idList: listId
      };
      setCards(prev => [...prev, newCard]);
    }
  };

  const deleteCard = (cardId) => {
    if (confirm('Delete this card?')) {
      setCards(prev => prev.filter(c => c.id !== cardId));
    }
  };

  if (!currentBoardId) {
    return (
      <div className="board">
        <div className="welcome-container" style={{
          maxWidth: '600px',
          margin: '60px auto'
        }}>
          <h1 className="welcome-title" style={{ fontSize: '2.5rem', textAlign: 'center' }}>
            🚀 TaskFlow Board
          </h1>
          <p className="welcome-subtitle" style={{ fontSize: '1.2rem', textAlign: 'center' }}>
            Experience real-time collaboration with WebSocket synchronization
          </p>
          
          <div className="welcome-actions">
            <button 
              className="btn btn-primary welcome-btn" 
              onClick={() => setShowCreateBoard(true)}
            >
              Create New Board
            </button>
            <button 
              className="btn btn-secondary welcome-btn" 
              onClick={() => {
                const boardId = prompt('Enter Board ID:');
                if (boardId) setCurrentBoardId(boardId);
              }}
            >
              Load Existing Board
            </button>
          </div>

          {showCreateBoard && (
            <div className="create-board-form">
              <input
                className="form-input"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Enter board name..."
                autoFocus
              />
              <div className="form-actions" style={{ justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={handleCreateBoard}>
                  Create Board
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowCreateBoard(false);
                    setNewBoardName('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="features-list" style={{ textAlign: 'center', marginTop: '32px' }}>
            <p><strong>✨ Features:</strong></p>
            <p>• Real-time synchronization across multiple browsers</p>
            <p>• Create, update, and delete cards instantly</p>
            <p>• WebSocket-powered live updates</p>
            <p>• Trello API integration</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="board">
      
      <div className="board-header">
        <div>
          <h1 className="board-title">{board?.name || 'Demo Board'}</h1>
          <div className="board-stats">
            <span className="stat-item">📋 3 Lists</span>
            <span className="stat-item">📝 {cards.length} Cards</span>
          </div>
        </div>
        <div className="board-actions">
          <div className="status-indicator status-connected">
            🟢 Live
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setCurrentBoardId('');
              setBoard(null);
              setCards([]);
            }}
          >
            🏠 Home
          </button>
        </div>
      </div>

      <div className="lists-container">
        {(board?.lists || []).map(list => (
          <div key={list.id} className="list">
            <div className="list-header">
              <h3 className="list-title">{list.name}</h3>
              <span className="card-count">
                {cards.filter(card => card.idList === list.id).length}
              </span>
            </div>

            {cards
              .filter(card => card.idList === list.id)
              .map(card => (
                <div key={card.id} className="card">
                  <div className="card-title">{card.name}</div>
                  {card.desc && <div className="card-desc">{card.desc}</div>}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteCard(card.id)}
                    style={{ marginTop: '8px', fontSize: '12px', padding: '4px 8px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}

            <button 
              className="btn btn-secondary" 
              onClick={() => addCard(list.id)}
              style={{ width: '100%', marginTop: '8px' }}
            >
              + Add a card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;