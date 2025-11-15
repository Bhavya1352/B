import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AdvancedCard from './AdvancedCard';
import { boardAPI, taskAPI } from '../services/api';
import { useSocket } from '../hooks/useSocket';
import LoadingSpinner from './LoadingSpinner';
import Toast from './Toast';

const DragDropBoard = ({ boardId }) => {
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { isConnected, socketService } = useSocket();

  useEffect(() => {
    loadBoard();
  }, [boardId]);

  useEffect(() => {
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
      showToast('Board loaded successfully!', 'success');
    } catch (error) {
      console.error('Failed to load board:', error);
      setLoading(false);
      showToast('Failed to load board', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, id: Date.now() });
  };

  const handleCardCreated = (card) => {
    setCards(prev => [...prev, card]);
    showToast('Card created!', 'success');
  };

  const handleCardUpdated = (updatedCard) => {
    setCards(prev => prev.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    ));
    showToast('Card updated!', 'info');
  };

  const handleCardDeleted = ({ id }) => {
    setCards(prev => prev.filter(card => card.id !== id));
    showToast('Card deleted!', 'error');
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update card position
    const card = cards.find(c => c.id === draggableId);
    if (card && destination.droppableId !== source.droppableId) {
      try {
        await taskAPI.update(draggableId, { idList: destination.droppableId });
        showToast('Card moved!', 'success');
      } catch (error) {
        showToast('Failed to move card', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="board">
        <LoadingSpinner message="Loading your advanced board..." />
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
        <div>
          <h1 className="board-title">{board.name}</h1>
          <div className="board-stats">
            <span className="stat-item">
              📋 {lists.length} Lists
            </span>
            <span className="stat-item">
              📝 {cards.length} Cards
            </span>
            <span className="stat-item">
              👥 {Math.floor(Math.random() * 5) + 1} Members
            </span>
          </div>
        </div>
        <div className="board-actions">
          <div className={`status-indicator ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
            {isConnected ? '🟢 Live' : '🔴 Offline'}
          </div>
          <button className="btn btn-primary">
            ⚙️ Settings
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lists-container">
          {lists.map((list, index) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`advanced-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                >
                  <div className="list-header">
                    <h3 className="list-title">{list.name}</h3>
                    <div className="list-actions">
                      <span className="card-count">
                        {cards.filter(card => card.idList === list.id).length}
                      </span>
                      <button className="list-menu-btn">⋯</button>
                    </div>
                  </div>

                  <div className="cards-container">
                    {cards
                      .filter(card => card.idList === list.id)
                      .map((card, cardIndex) => (
                        <Draggable key={card.id} draggableId={card.id} index={cardIndex}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`draggable-card ${snapshot.isDragging ? 'dragging' : ''}`}
                            >
                              <AdvancedCard
                                card={card}
                                onUpdate={handleCardUpdated}
                                onDelete={handleCardDeleted}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>

                  <AddCardButton listId={list.id} onCardCreate={handleCardCreated} />
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

const AddCardButton = ({ listId, onCardCreate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      const response = await taskAPI.create({
        listId,
        name: title,
        desc
      });
      
      onCardCreate(response.data);
      setTitle('');
      setDesc('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  if (isAdding) {
    return (
      <div className="add-card-form">
        <input
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter card title..."
          autoFocus
        />
        <textarea
          className="form-textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Add description..."
          rows="3"
        />
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleAdd}>
            ✅ Add Card
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setIsAdding(false);
              setTitle('');
              setDesc('');
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      className="add-card-btn" 
      onClick={() => setIsAdding(true)}
    >
      ➕ Add a card
    </button>
  );
};

export default DragDropBoard;