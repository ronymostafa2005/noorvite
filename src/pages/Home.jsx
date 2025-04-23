// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInProgressTasks } from '../services/taskService';
import MenuOverlay from './MenuOverlay'
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks]       = useState([]);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dynamic date
  const today   = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const day     = today.getDate();

  // Always display minutes ago
  const minutesAgo = dateStr => {
    const deltaMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.max(1, Math.floor(deltaMs / 60000));
    return `${mins} min ago`;
  };

  useEffect(() => {
    setLoading(true);
    getInProgressTasks()
      .then(setTasks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <button className="icon-button" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <div className="date-display">
          <span className="weekday">{weekday},</span>{' '}
          <span className="day">{day}</span>
        </div>
        <button className="icon-button" onClick={() => navigate('/notifications')}>
          🔔
        </button>
      </header>

      <section className="task-section">
        <h2 className="section-title">In Progress</h2>

        {loading && <p>Loading tasks…</p>}
        {error   && <p className="error-message">{error}</p>}

        <ul className="task-list">
          {tasks.map(t => (
            <li key={t.id} className="task-item">
              {/* Category / project name */}
              <div className="task-project">
                {/* {t.category_name || '—'} */}
              </div>

              {/* Task title */}
              <div className="task-title">{t.title}</div>

              {/* Optional description */}
              {t.description && (
                <div className="task-description">{t.description}</div>
              )}

              {/* Minutes ago */}
              <div className="task-time">
                {/* {minutesAgo(t.createdAt)} */}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
