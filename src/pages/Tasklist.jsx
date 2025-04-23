import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Tasklist = () => {
  const [tasks, setTasks] = useState({
    todo: ['task1', 'task2'],
    inProgress: ['task3'],
    done: ['task4'],
    workZone: ['task5']
  });

  const [newTasks, setNewTasks] = useState({
    todo: '',
    inProgress: '',
    done: '',
    workZone: ''
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const handleAddTask = (section) => {
    if (newTasks[section].trim()) {
      setTasks({
        ...tasks,
        [section]: [...tasks[section], newTasks[section]]
      });
      setNewTasks({
        ...newTasks,
        [section]: ''
      });
    }
  };

  const handleDragStart = (e, task, section) => {
    setDraggedItem({ task, section });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetSection) => {
    e.preventDefault();
    if (draggedItem) {
      // Remove from original section
      const updatedSourceTasks = tasks[draggedItem.section].filter(
        task => task !== draggedItem.task
      );
      
      // Add to target section
      const updatedTargetTasks = [...tasks[targetSection], draggedItem.task];
      
      setTasks({
        ...tasks,
        [draggedItem.section]: updatedSourceTasks,
        [targetSection]: updatedTargetTasks
      });
      
      setDraggedItem(null);
    }
  };

  // تعريف أنماط CSS ككائنات JavaScript
  const styles = {
    pageContainer: {
      backgroundColor: '#9EBCCA',
      minHeight: '100vh',
      padding: '20px'
    },
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '450px', // Increased from 300px
      margin: '20px auto',
      padding: '30px', // Increased padding
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    timeDisplay: {
      textAlign: 'right',
      fontSize: '14px',
      color: '#666',
      marginBottom: '15px'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '25px',
      fontSize: '22px',
      fontWeight: '600'
    },
    sectionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px' // Increased gap between sections
    },
    taskSection: {
      backgroundColor: 'white',
      padding: '20px', // Increased padding
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
    },
    sectionTitle: {
      fontSize: '16px',
      color: '#444',
      marginTop: '0',
      marginBottom: '15px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: '1px'
    },
    taskItems: {
      minHeight: '60px',
      marginLeft: '10px'
    },
    taskItem: {
      backgroundColor: '#91A8C687',
      padding: '12px 15px', // Slightly larger padding
      marginBottom: '12px', // Slightly more space between items
      borderRadius: '6px',
      fontSize: '14px',
      color: '#333',
      cursor: 'grab',
      userSelect: 'none'
    },
    timer: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '18px',
      color: '#333',
      fontWeight: 'bold'
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '12px' // Slightly more space
    },
    taskInput: {
      flex: '1',
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ddd',
      backgroundColor: '#91A8C687',
      outline: 'none',
      marginRight: '8px'
    },
    addButton: {
      width: '32px', // Slightly larger
      height: '32px', // Slightly larger
      borderRadius: '50%',
      backgroundColor: '#004AAD',
      color: 'white',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.timeDisplay}>9:41</div>
        
        <h1 style={styles.title}>Task list</h1>
        
        <div style={styles.sectionsContainer}>
          {/* TO DO Section */}
          <div 
            style={styles.taskSection}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'todo')}
          >
            <h2 style={styles.sectionTitle}>TO DO</h2>
            <div style={styles.taskItems}>
              {tasks.todo.map((task, index) => (
                <div 
                  key={`todo-${index}`} 
                  style={styles.taskItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, 'todo')}
                >
                  {task}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newTasks.todo}
                onChange={(e) => setNewTasks({...newTasks, todo: e.target.value})}
                placeholder="Add new task"
                style={styles.taskInput}
              />
              <button 
                style={styles.addButton}
                onClick={() => handleAddTask('todo')}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
          
          {/* In Progress Section */}
          <div 
            style={styles.taskSection}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'inProgress')}
          >
            <h2 style={styles.sectionTitle}>In progress</h2>
            <div style={styles.taskItems}>
              {tasks.inProgress.map((task, index) => (
                <div 
                  key={`progress-${index}`} 
                  style={styles.taskItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, 'inProgress')}
                >
                  {task}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newTasks.inProgress}
                onChange={(e) => setNewTasks({...newTasks, inProgress: e.target.value})}
                placeholder="Add new task"
                style={styles.taskInput}
              />
              <button 
                style={styles.addButton}
                onClick={() => handleAddTask('inProgress')}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
          
          {/* Done Section */}
          <div 
            style={styles.taskSection}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'done')}
          >
            <h2 style={styles.sectionTitle}>done</h2>
            <div style={styles.taskItems}>
              {tasks.done.map((task, index) => (
                <div 
                  key={`done-${index}`} 
                  style={styles.taskItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, 'done')}
                >
                  {task}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newTasks.done}
                onChange={(e) => setNewTasks({...newTasks, done: e.target.value})}
                placeholder="Add new task"
                style={styles.taskInput}
              />
              <button 
                style={styles.addButton}
                onClick={() => handleAddTask('done')}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
          
          {/* Work Zone Section */}
          <div 
            style={styles.taskSection}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'workZone')}
          >
            <h2 style={styles.sectionTitle}>work zone</h2>
            <div style={styles.taskItems}>
              {tasks.workZone.map((task, index) => (
                <div 
                  key={`workzone-${index}`} 
                  style={styles.taskItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, 'workZone')}
                >
                  {task}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newTasks.workZone}
                onChange={(e) => setNewTasks({...newTasks, workZone: e.target.value})}
                placeholder="Add new task"
                style={styles.taskInput}
              />
              <button 
                style={styles.addButton}
                onClick={() => handleAddTask('workZone')}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        </div>
        
        <div style={styles.timer}>Timer 00:00</div>
      </div>
    </div>
  );
};

export default Tasklist;