import React, { useState } from 'react';
import { taskAPI } from '../services/api';

const AdvancedCard = ({ card, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.name);
  const [desc, setDesc] = useState(card.desc || '');
  const [priority, setPriority] = useState(card.priority || 'medium');
  const [dueDate, setDueDate] = useState(card.dueDate || '');

  const handleSave = async () => {
    try {
      await taskAPI.update(card.id, { 
        name: title, 
        desc, 
        priority, 
        dueDate 
      });
      onUpdate({ ...card, name: title, desc, priority, dueDate });
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffd93d';
      case 'low': return '#51cf66';
      default: return '#74c0fc';
    }
  };

  const getRandomAvatar = () => {
    const avatars = ['👨‍💻', '👩‍💻', '🧑‍💼', '👩‍💼', '🧑‍🎨', '👩‍🎨'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  if (isEditing) {
    return (
      <div className="advanced-card editing">
        <div className="card-edit-header">
          <input
            className="form-input card-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title"
          />
          <select 
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
        
        <textarea
          className="form-textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Card description"
          rows="3"
        />
        
        <input
          type="date"
          className="form-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        
        <div className="form-actions">
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            💾 Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
            ❌ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="advanced-card" onClick={() => setIsEditing(true)}>
      <div className="card-header">
        <div 
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(priority) }}
        />
        <div className="card-actions">
          <button 
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="card-content">
        <h4 className="card-title">{card.name}</h4>
        {card.desc && (
          <p className="card-desc">{card.desc}</p>
        )}
      </div>
      
      <div className="card-footer">
        <div className="card-meta">
          {dueDate && (
            <span className="due-date">
              📅 {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
          <span className="card-id">#{card.id.slice(-4)}</span>
        </div>
        
        <div className="card-assignees">
          <div className="assignee-avatar">
            {getRandomAvatar()}
          </div>
          {Math.random() > 0.7 && (
            <div className="assignee-avatar">
              {getRandomAvatar()}
            </div>
          )}
        </div>
      </div>
      
      <div className="card-labels">
        {priority === 'high' && <span className="label urgent">Urgent</span>}
        {card.desc && <span className="label has-desc">📝</span>}
        {dueDate && <span className="label has-date">⏰</span>}
      </div>
    </div>
  );
};

export default AdvancedCard;