import React, { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('activity');

  const activities = [
    { id: 1, user: '👨💻 John', action: 'added card "Fix bug"', time: '2 min ago' },
    { id: 2, user: '👩💻 Sarah', action: 'moved card to Done', time: '5 min ago' },
    { id: 3, user: '🧑💼 Mike', action: 'commented on card', time: '10 min ago' },
    { id: 4, user: '👩💼 Lisa', action: 'created new list', time: '15 min ago' },
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: '👨💻', role: 'Developer', status: 'online' },
    { id: 2, name: 'Sarah Smith', avatar: '👩💻', role: 'Designer', status: 'online' },
    { id: 3, name: 'Mike Johnson', avatar: '🧑💼', role: 'Manager', status: 'away' },
    { id: 4, name: 'Lisa Brown', avatar: '👩💼', role: 'QA', status: 'offline' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>📊 Project Dashboard</h3>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <div className="sidebar-tabs">
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            🔔 Activity
          </button>
          <button 
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            👥 Team
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        <div className="sidebar-content">
          {activeTab === 'activity' && (
            <div className="activity-feed">
              <h4>Recent Activity</h4>
              {activities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-content">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-action">{activity.action}</span>
                  </div>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="team-section">
              <h4>Team Members</h4>
              {teamMembers.map(member => (
                <div key={member.id} className="team-member">
                  <div className="member-info">
                    <span className="member-avatar">{member.avatar}</span>
                    <div className="member-details">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                  <div className={`member-status ${member.status}`}>
                    {member.status === 'online' ? '🟢' : member.status === 'away' ? '🟡' : '⚫'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <h4>Project Analytics</h4>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="analytics-number">24</div>
                  <div className="analytics-label">Total Cards</div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-number">8</div>
                  <div className="analytics-label">Completed</div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-number">12</div>
                  <div className="analytics-label">In Progress</div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-number">4</div>
                  <div className="analytics-label">Pending</div>
                </div>
              </div>
              
              <div className="progress-section">
                <h5>Project Progress</h5>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '67%' }}></div>
                </div>
                <span className="progress-text">67% Complete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;