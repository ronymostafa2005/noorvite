import React from 'react';
import '../styles/MenuOverlay.css';

export default function MenuOverlay({ onClose }) {
  const items = [
    { label: 'Project', path: '/project' },
    { label: 'Tasklist', path: '/Tasklist' },
    { label: 'Progress', path: '/progress' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'Profile', path: '/Profile' },
  ];

  return (
    <div className="menu-overlay">
      <div className="menu-card">
        <button className="close-button" onClick={onClose} aria-label="Close menu">
          ×
        </button>
        <ul className="menu-list">
          {items.map((it, i) => (
            <li key={i}>
              <a href={it.path} className="menu-link">{it.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
