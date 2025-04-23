import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // يمكنك إضافة أي منطق للخروج هنا قبل التوجيه
    navigate("/"); // التوجيه إلى الصفحة الرئيسية
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {showSettings ? (
          <SettingsCard 
            onClose={() => setShowSettings(false)} 
            onLogout={handleLogout}
          />
        ) : (
          <ProfileCard 
            onEdit={() => setShowSettings(true)} 
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

const ProfileCard = ({ onEdit, onLogout }) => (
  <div style={styles.card}>
    <div style={styles.profileContainer}>
      <Avatar sx={{ width: 80, height: 80, bgcolor: "#007BFF", fontSize: "28px" }}>A</Avatar>
      <h2 style={styles.profileName}>Ahmed</h2>
      <p style={styles.username}>@Ahmed</p>
      <button style={styles.editButton} onClick={onEdit}>Edit</button>
    </div>
    <StatsSection />
    <button style={styles.settingsButton} onClick={onEdit}>
      <span>Settings</span> <AiFillSetting size={18} />
    </button>
    <button 
      style={{ ...styles.button, backgroundColor: "#f44336", marginTop: "10px" }} 
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
);

const SettingsCard = ({ onClose, onLogout }) => (
  <div style={styles.card}>
    <h2 style={styles.title}>Settings</h2>
    <div style={styles.settingsContainer}>
      {[
        { label: "Permission", checked: true },
        { label: "Push Notification", checked: false },
      ].map((item, index) => (
        <SettingOption key={index} label={item.label} checked={item.checked} />
      ))}
      <button style={styles.ghostButton}>About Application</button>
    </div>
    <button style={styles.button} onClick={onClose}>Back</button>
    <button 
      style={{ ...styles.button, backgroundColor: "#f44336", marginTop: "10px" }} 
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
);

const StatsSection = () => (
  <div style={styles.statsContainer}>
    {[
      { number: 5, label: "On Going" },
      { number: 25, label: "Total Complete" },
    ].map((stat, index) => (
      <div key={index} style={styles.stat}>
        <p style={styles.statNumber}>{stat.number}</p>
        <p style={styles.statLabel}>{stat.label}</p>
      </div>
    ))}
  </div>
);

const SettingOption = ({ label, checked }) => (
  <div style={styles.settingOption}>
    <span>{label}</span>
    <input type="checkbox" defaultChecked={checked} />
  </div>
);

const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    minHeight: "100vh", 
    backgroundColor: "#9EBCCA", // تم تغيير لون الخلفية هنا
    padding: "16px" 
  },
  wrapper: { width: "100%", maxWidth: "600px" },
  card: { width: "100%", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "16px", padding: "20px", textAlign: "center" },
  title: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px" },
  profileContainer: { display: "flex", flexDirection: "column", alignItems: "center" },
  profileName: { fontSize: "22px", fontWeight: "bold", marginTop: "10px" },
  username: { color: "#777", fontSize: "16px" },
  editButton: { marginTop: "10px", padding: "8px 14px", fontSize: "16px", backgroundColor: "#E4E7ED", border: "none", borderRadius: "8px", cursor: "pointer" },
  statsContainer: { display: "flex", justifyContent: "space-around", marginTop: "20px", color: "#555" },
  stat: { textAlign: "center" },
  statNumber: { fontSize: "20px", fontWeight: "bold" },
  statLabel: { fontSize: "14px" },
  settingsButton: { marginTop: "20px", width: "100%", padding: "12px", border: "1px solid #E4E7ED", borderRadius: "10px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "16px", cursor: "pointer" },
  settingsContainer: { marginTop: "10px" },
  settingOption: { display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #E4E7ED" },
  button: { marginTop: "10px", padding: "12px", width: "100%", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" },
  ghostButton: { marginTop: "10px", padding: "12px", width: "100%", backgroundColor: "transparent", color: "#007BFF", border: "none", textAlign: "left", cursor: "pointer", fontSize: "16px" },
};

export default Profile;