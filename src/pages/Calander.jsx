import React, { useState } from 'react';

const Calandar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: new Date(2023, 10, 15, 10, 0), color: '#E1F5FE' },
    { id: 2, title: 'Client Presentation', date: new Date(2023, 10, 18, 14, 30), color: '#2196F3' },
    { id: 3, title: 'Project Review', date: new Date(2023, 10, 20, 9, 0), color: '#FF9800' },
  ]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', color: '#E1F5FE' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  // Get current month and year
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Change month
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Render days
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} style={styles.dayCell}></div>);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = dayDate.getDate() === today.getDate() && 
                      dayDate.getMonth() === today.getMonth() && 
                      dayDate.getFullYear() === today.getFullYear();
      
      const dayEvents = events.filter(event => 
        event.date.getDate() === i && 
        event.date.getMonth() === currentDate.getMonth() && 
        event.date.getFullYear() === currentDate.getFullYear()
      );

      days.push(
        <div 
          key={`day-${i}`} 
          style={{
            ...styles.dayCell,
            ...(isToday ? styles.today : {})
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{i}</div>
          {dayEvents.map(event => (
            <div 
              key={event.id} 
              style={{
                ...styles.event,
                backgroundColor: event.color
              }}
              onClick={() => handleEventClick(event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  // Handle add event
  const handleAddEvent = () => {
    setNewEvent({ title: '', date: '', time: '', color: '#E1F5FE' });
    setEditingEvent(null);
    setShowEventForm(true);
  };

  // Handle event click
  const handleEventClick = (event) => {
    const dateStr = event.date.toISOString().split('T')[0];
    const timeStr = event.date.toTimeString().substring(0, 5);
    
    setNewEvent({
      title: event.title,
      date: dateStr,
      time: timeStr,
      color: event.color
    });
    setEditingEvent(event);
    setShowEventForm(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle color select
  const handleColorSelect = (color) => {
    setNewEvent(prev => ({
      ...prev,
      color
    }));
  };

  // Handle event submit
  const handleEventSubmit = (e) => {
    e.preventDefault();
    
    const [year, month, day] = newEvent.date.split('-');
    const [hours, minutes] = newEvent.time.split(':');
    const eventDate = new Date(year, month - 1, day, hours, minutes);
    
    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, title: newEvent.title, date: eventDate, color: newEvent.color }
          : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newId = Math.max(...events.map(e => e.id), 0) + 1;
      const event = {
        id: newId,
        title: newEvent.title,
        date: eventDate,
        color: newEvent.color
      };
      setEvents([...events, event]);
      setRecentEvents([event, ...recentEvents.slice(0, 4)]);
    }
    
    setShowEventForm(false);
  };

  // Handle delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setRecentEvents(recentEvents.filter(event => event.id !== id));
  };

  // Close form
  const closeForm = () => {
    setShowEventForm(false);
  };

  // Inline CSS styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box',
      position: 'relative',
      backgroundColor: '#9EBCCA'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    monthSelector: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#03A9F4',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '10px',
      marginBottom: '20px'
    },
    dayHeader: {
      textAlign: 'center',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold'
    },
    dayCell: {
      minHeight: '100px',
      padding: '8px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      backgroundColor: 'white'
    },
    today: {
      backgroundColor: '#E1F5FE',
      fontWeight: 'bold'
    },
    event: {
      fontSize: '12px',
      padding: '4px',
      marginBottom: '4px',
      borderRadius: '3px',
      color: 'white',
      cursor: 'pointer',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    eventFormOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    eventForm: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      width: '90%',
      maxWidth: '400px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    formInput: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    colorOptions: {
      display: 'flex',
      gap: '10px',
      marginTop: '5px'
    },
    colorOption: {
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid transparent'
    },
    selectedColor: {
      border: '2px solid #333'
    },
    currentMonth: {
      fontSize: '20px',
      fontWeight: 'bold'
    },
    recentEventsBox: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    recentEventsTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333'
    },
    eventItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
      marginBottom: '8px',
      borderRadius: '4px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    eventActions: {
      display: 'flex',
      gap: '8px'
    },
    editButton: {
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '4px 8px',
      cursor: 'pointer'
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '4px 8px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.monthSelector}>
          <button style={styles.button} onClick={() => changeMonth(-1)}>Previous Month</button>
          <div style={styles.currentMonth}>{currentMonth} {currentYear}</div>
          <button style={styles.button} onClick={() => changeMonth(1)}>Next Month</button>
        </div>
        <button style={styles.button} onClick={handleAddEvent}>Add Event</button>
      </div>

      <div style={styles.calendarGrid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={styles.dayHeader}>{day}</div>
        ))}
        {renderDays()}
      </div>

      {/* Recent Events Box */}
      <div style={styles.recentEventsBox}>
        <div style={styles.recentEventsTitle}>Recently Added Events</div>
        {recentEvents.length === 0 ? (
          <div>No recent events</div>
        ) : (
          recentEvents.map(event => (
            <div key={event.id} style={styles.eventItem}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {event.date.toLocaleDateString()} - {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <div style={styles.eventActions}>
                <button 
                  style={styles.editButton}
                  onClick={() => handleEventClick(event)}
                >
                  Edit
                </button>
                <button 
                  style={styles.deleteButton}
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Event Form */}
      {showEventForm && (
        <div style={styles.eventFormOverlay} onClick={closeForm}>
          <div style={styles.eventForm} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={handleEventSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Event Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Time:</label>
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Event Color:</label>
                <div style={styles.colorOptions}>
                  {['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6'].map(color => (
                    <div
                      key={color}
                      style={{
                        ...styles.colorOption,
                        backgroundColor: color,
                        ...(newEvent.color === color ? styles.selectedColor : {})
                      }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  style={{...styles.button, backgroundColor: '#f44336'}}
                  onClick={() => setShowEventForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.button}>
                  {editingEvent ? 'Save Changes' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calandar;