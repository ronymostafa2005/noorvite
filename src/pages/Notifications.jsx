import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notifications.css';

export default function Notifications() {
  const navigate = useNavigate();

  // Dummy notifications
  const notes = [
    { text: 'Mohamed invite you of project', type: 'invite' },
    { text: 'Task PRD of due date today', type: 'info' },
    { text: 'You study today of 10 hours take Rest', type: 'info' },
    { text: 'You assign new task for you for project 05', type: 'info' },
    { text: 'You have 10 task study now', type: 'info' },
    { text: 'You have 50 project Study now', type: 'info' },
  ];

  return (
    <div className="notifications-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>
      <h1 className="notifications-title">Notifications</h1>

      <ul className="notifications-list">
        {notes.map((n, i) => (
          <li key={i} className="notification-item">
            <div className="notification-text">
              {n.text}
            </div>
            {n.type === 'invite' && (
              <div className="invite-actions">
                <button className="accept">Accept ✔️</button>
                <button className="reject">Reject ❌</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
