import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  AvatarGroup,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import { Add, CloudUpload } from '@mui/icons-material';

const Addproject = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectAuthority: '',
    projectDescription: '',
    dueDate: '',
    uploadedFile: null
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'Jerry', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Mehrin', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Avishek', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Jafar', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProject = {
      title: formData.projectName,
      category: formData.projectDescription,
      progress: 0,
      priority: formData.projectAuthority === 'High' ? 9 : 
               formData.projectAuthority === 'Medium' ? 5 : 3,
      users: teamMembers.map(member => member.avatar),
      dueDate: formData.dueDate,
      status: 'Active'
    };

    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    setSnackbarOpen(true);
    
    setTimeout(() => {
      navigate('/Projects');
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(158, 188, 202, 1)',
        minHeight: '100vh',
        py: 4
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: '500px',
          margin: '2rem auto',
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* بقية الكود كما هو */}
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#004AAD' }}>
          Add Project
        </Typography>

        {/* Project Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Project Name
          </Typography>
          <TextField
            fullWidth
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
            size="small"
            required
          />
        </Box>

        {/* Project Priority */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Project Priority
          </Typography>
          <RadioGroup
            name="projectAuthority"
            value={formData.projectAuthority}
            onChange={handleChange}
            row
          >
            {['High', 'Medium', 'Low'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" size="small" />}
                label={option}
                sx={{ mr: 2 }}
              />
            ))}
          </RadioGroup>
        </Box>

        {/* File Upload */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Upload Files
          </Typography>
          <Box
            sx={{
              border: '1px dashed #ddd',
              p: 2,
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                borderColor: '#004AAD'
              }
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <Typography variant="body2" sx={{ color: '#666' }}>
              {formData.uploadedFile ? formData.uploadedFile.name : 'No file selected'}
            </Typography>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <IconButton size="small">
              <CloudUpload fontSize="small" color="primary" />
            </IconButton>
          </Box>
        </Box>

        {/* Project Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Project Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            size="small"
            placeholder="Describe your project..."
          />
        </Box>

        {/* Team Members */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Team Members
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              {teamMembers.map((member, index) => (
                <Tooltip key={index} title={member.name}>
                  <Avatar alt={member.name} src={member.avatar} />
                </Tooltip>
              ))}
            </AvatarGroup>
            <Tooltip title="Add team member">
              <IconButton
                size="small"
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '50%',
                  '&:hover': { backgroundColor: '#f0f0f0' }
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Due Date */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Due Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#004AAD',
            py: 1.5,
            '&:hover': { backgroundColor: '#003682' },
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Save Project
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Project saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Addproject;