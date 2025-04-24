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
import axios from 'axios';

const Addproject = () => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    description: '',
    deadline: '',
    category_name: '',
    uploadedFile: null
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/projects/', {
        title: formData.title,
        category_name: formData.category_name,
        priority: formData.priority,
        deadline: formData.deadline,
        description: formData.description
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSnackbarMessage('Project created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      setTimeout(() => {
        navigate('/Projects');
      }, 1500);
    } catch (error) {
      console.error('Failed to create project:', error);
      setSnackbarMessage(error.response?.data?.message || 'Failed to create project');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project name"
            size="small"
            required
          />
        </Box>

        {/* Category Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Category
          </Typography>
          <TextField
            fullWidth
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            placeholder="Enter category name"
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
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            row
          >
            {['high', 'medium', 'low'].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio color="primary" size="small" />}
                label={option.charAt(0).toUpperCase() + option.slice(1)}
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="small"
            placeholder="Describe your project..."
          />
        </Box>

        {/* Due Date */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Due Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
            required
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Addproject;
