import React, { useState } from 'react';
import Card from './Card';
import { taskAPI } from '../services/api';

const List = ({ list, cards, onCardUpdate, onCardDelete, onCardCreate }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      const response = await taskAPI.create({
        listId: list.id,
        name: newCardTitle,
        desc: newCardDesc
      });
      
      onCardCreate(response.data);
      setNewCardTitle('');
      setNewCardDesc('');
      setShowAddCard(false);
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  const listCards = cards.filter(card => card.idList === list.id);

  return (
    <div className="list">
      <div className="list-header">
        <h3 className="list-title">{list.name}</h3>
        <span className="card-count">
          {listCards.length} cards
        </span>
      </div>

      {listCards.map(card => (
        <Card
          key={card.id}
          card={card}
          onUpdate={onCardUpdate}
          onDelete={onCardDelete}
        />
      ))}

      {showAddCard ? (
        <div className="add-card-form">
          <input
            className="form-input"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter card title..."
            autoFocus
          />
          <textarea
            className="form-textarea"
            value={newCardDesc}
            onChange={(e) => setNewCardDesc(e.target.value)}
            placeholder="Enter description (optional)..."
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleAddCard}>
              Add Card
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setShowAddCard(false);
                setNewCardTitle('');
                setNewCardDesc('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="btn btn-secondary" 
          onClick={() => setShowAddCard(true)}
          style={{ width: '100%', marginTop: '8px' }}
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default List;