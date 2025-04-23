import { useState } from "react";
import { FiArrowLeft, FiDownload, FiPlus, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Viewtask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: "PRD",
    description: "PRD",
    probability: "Medium",
    files: ["gantchart.pdf"],
    team: [
      { name: "Jerry", img: "https://randomuser.me/api/portraits/men/1.jpg" },
      { name: "Methin", img: "https://randomuser.me/api/portraits/men/2.jpg" },
      { name: "Avishek", img: "https://randomuser.me/api/portraits/men/3.jpg" },
      { name: "Jofor", img: "https://randomuser.me/api/portraits/men/4.jpg" },
    ],
    dueDate: "November 01, 2025",
    dueTime: "11:30pm",
    reminder: "30m",
  });

  const handleFileUpload = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setTask((prevTask) => ({
        ...prevTask,
        files: [...prevTask.files, newFile.name],
      }));
    }
  };

  const handleProbabilityChange = (event) => {
    setTask((prevTask) => ({
      ...prevTask,
      probability: event.target.value,
    }));
  };

  return (
    <div style={styles.container}>
      <FiArrowLeft style={styles.backIcon} onClick={() => navigate("/projects")} />
      <h2 style={styles.title}>View Task</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Task Name</label>
        <input type="text" value={task.name} readOnly style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Task Description</label>
        <input type="text" value={task.description} readOnly style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Task Probability</label>
        <select value={task.probability} onChange={handleProbabilityChange} style={styles.input}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Upload Files</label>
        {task.files.map((file, index) => (
          <div key={index} style={styles.fileItem}>
            {file} <FiDownload style={styles.icon} />
          </div>
        ))}
        <input type="file" onChange={handleFileUpload} style={styles.fileInput} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Team Members</label>
        <div style={styles.teamContainer}>
          {task.team.map((member, index) => (
            <img key={index} src={member.img} alt={member.name} style={styles.teamMember} />
          ))}
          <button style={styles.addButton}>
            <FiPlus style={styles.icon} />
          </button>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Due Date</label>
        <input type="text" value={task.dueDate} readOnly style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Due Time</label>
        <input type="text" value={task.dueTime} readOnly style={styles.input} />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Reminder</label>
        <input type="text" value={task.reminder} readOnly style={styles.input} />
      </div>

      <button style={styles.saveButton}>edit</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  backIcon: {
    fontSize: "24px",
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f8f8f8",
  },
  fileInput: {
    marginTop: "10px",
  },
  icon: {
    color: "#007bff",
    cursor: "pointer",
  },
  teamContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  teamMember: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
  },
  addButton: {
    width: "45px",
    height: "45px",
    backgroundColor: "#eee",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  saveButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#004AAD",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default Viewtask;
