import React, { useState } from 'react';
import { taskAPI } from '../services/api';

const Card = ({ card, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.name);
  const [desc, setDesc] = useState(card.desc || '');

  const handleSave = async () => {
    try {
      await taskAPI.update(card.id, { name: title, desc });
      onUpdate({ ...card, name: title, desc });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this card?')) {
      try {
        await taskAPI.delete(card.id);
        onDelete(card.id);
      } catch (error) {
        console.error('Failed to delete card:', error);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="card">
        <input
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card title"
        />
        <textarea
          className="form-textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Card description"
        />
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" onClick={() => setIsEditing(true)}>
      <div className="card-title">{card.name}</div>
      {card.desc && <div className="card-desc">{card.desc}</div>}
      <button 
        className="btn btn-danger" 
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        style={{ marginTop: '8px', fontSize: '12px', padding: '4px 8px' }}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;