import React, { useState, useEffect } from 'react';
import List from './List';
import LoadingSpinner from './LoadingSpinner';
import { boardAPI } from '../services/api';
import { useSocket } from '../hooks/useSocket';

const Board = ({ boardId, sidebarOpen, setSidebarOpen }) => {
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isConnected, socketService } = useSocket();

  useEffect(() => {
    loadBoard();
  }, [boardId]);

  useEffect(() => {
    // Subscribe to real-time events
    socketService.subscribe('cardCreated', handleCardCreated);
    socketService.subscribe('cardUpdated', handleCardUpdated);
    socketService.subscribe('cardDeleted', handleCardDeleted);

    return () => {
      socketService.unsubscribe('cardCreated', handleCardCreated);
      socketService.unsubscribe('cardUpdated', handleCardUpdated);
      socketService.unsubscribe('cardDeleted', handleCardDeleted);
    };
  }, []);

  const loadBoard = async () => {
    try {
      const response = await boardAPI.get(boardId);
      const boardData = response.data;
      
      setBoard(boardData);
      setLists(boardData.lists || []);
      setCards(boardData.cards || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load board:', error);
      setLoading(false);
    }
  };

  const handleCardCreated = (card) => {
    setCards(prev => [...prev, card]);
  };

  const handleCardUpdated = (updatedCard) => {
    setCards(prev => prev.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    ));
  };

  const handleCardDeleted = ({ id }) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  if (loading) {
    return (
      <div className="board">
        <LoadingSpinner message="Loading your board..." />
      </div>
    );
  }

  if (!board) {
    return (
      <div className="board">
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
          Board not found
        </div>
      </div>
    );
  }

  return (
    <div className="board">
      <div className="board-header">
        <h1 className="board-title">{board.name}</h1>
        <div className={`status-indicator ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>

      <div className="lists-container">
        {lists.map(list => (
          <List
            key={list.id}
            list={list}
            cards={cards}
            onCardUpdate={handleCardUpdated}
            onCardDelete={handleCardDeleted}
            onCardCreate={handleCardCreated}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;