import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";


const progress = 65;
const progressColors = {
  todo: "#a0d468",
  inProgress: "#f6bb42",
  completed: "#4a90e2",
};
const tasks = [
  { title: "Completed", count: 18, status: "18 Task Completed" },
  { title: "In Progress", count: 2, status: "1 started" },
  { title: "To Do", count: 2, status: "1 Upcoming" },
];

const ProgressPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#9EBCCA", // تم تغيير لون الخلفية هنا
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* العنوان */}
      <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Your Progress
      </h2>

      {/* الدائرة */}
      <div style={{ width: "180px", height: "180px", marginBottom: "20px" }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}% Completed`}
          styles={buildStyles({
            textSize: "14px",
            pathTransitionDuration: 0.5,
            pathColor: progressColors.completed,
            trailColor: "#e0e0e0",
            textColor: "#333",
          })}
        />
      </div>

      {/* دليل الألوان */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        {Object.entries(progressColors).map(([key, color]) => (
          <div key={key} style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: color,
                borderRadius: "50%",
                marginRight: "5px",
              }}
            ></span>
            <span style={{ fontSize: "14px", color: "#333" }}>{key.replace(/([A-Z])/g, " $1")}</span>
          </div>
        ))}
      </div>

      {/* قائمة المهام */}
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#666", marginBottom: "10px" }}>
          Monthly
        </h3>

        {tasks.map((task, index) => (
          <motion.div key={index} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <div
              style={{
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
              }}
            >
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>{task.title}</h4>
                <p style={{ fontSize: "12px", color: "#666" }}>{task.count} Tasks • {task.status}</p>
              </div>
              <span style={{ fontSize: "20px", color: "#888" }}>...</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;