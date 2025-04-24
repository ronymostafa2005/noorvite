import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Card,
  AvatarGroup,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Avatar, Button } from '@mui/material';
import {
  ArrowBack,
  Delete,
  Edit,
  EmojiEvents,
  Add,
  Visibility,
  Comment,
  Close
} from "@mui/icons-material";


import api from '../services/api'; 

const ProjectCard = ({ 
  project, 
  navigate, 
  handleDelete,
  handleAddComment,
  showCommentBox,
  setShowCommentBox,
  commentText,
  setCommentText,
  currentProjectId,
  setCurrentProjectId
}) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
      p: 2,
      borderRadius: 2,
      boxShadow: 3,
      border: "1px solid #90caf9",
      bgcolor: "white",
      width: "100%",
      maxWidth: "500px",
    }}
  >
    <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
      <Typography variant="body1" fontWeight="bold">{project.title}</Typography>
      <Typography variant="caption" color="gray">{project.category_name}</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <AvatarGroup max={2} sx={{ mr: 1 }}>
          {/* Replace with actual team members when available */}
          <Avatar sx={{ width: 24, height: 24 }} />
        </AvatarGroup>
        <Box
          sx={{
            width: "100px",
            height: 8,
            bgcolor: "#ddd",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{ 
              width: `${project.status === 'completed' ? 100 : 
                     project.status === 'in_progress' ? 50 : 0}%`, 
              height: "100%", 
              bgcolor: "#004aad" 
            }}
          />
        </Box>
      </Box>
      
      {/* Comments Section */}
      {showCommentBox && currentProjectId === project.id && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button 
            variant="contained" 
            size="small"
            onClick={() => {
              handleAddComment(project.id, commentText);
              setCommentText("");
              setShowCommentBox(false);
            }}
            sx={{ mr: 1, bgcolor: "#004aad" }}
          >
            Add
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => {
              setShowCommentBox(false);
              setCommentText("");
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
      
      {/* Display Comments - Would need backend support */}
      {project.comments && project.comments.length > 0 && (
        <Box sx={{ mt: 2, borderTop: '1px solid #eee', pt: 1 }}>
          {project.comments.map((comment, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>{comment}</Typography>
              <IconButton size="small">
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          bgcolor: "#e0ffe0",
          px: 1.5,
          py: 0.5,
          borderRadius: 10,
          fontSize: 12,
        }}
      >
        {project.priority}
      </Typography>
      <IconButton color="primary" onClick={() => navigate(`/EditingPage/${project.id}`)}>
        <Edit />
      </IconButton>
      <IconButton color="primary" onClick={() => navigate(`/GamificationPage`)}>
        <EmojiEvents sx={{ color: "#004aad" }} />
      </IconButton>
      <IconButton 
        color="primary" 
        onClick={() => {
          setCurrentProjectId(project.id);
          setShowCommentBox(true);
        }}
      >
        <Comment sx={{ color: "#004aad" }} />
      </IconButton>
      <IconButton color="primary" onClick={() => navigate(`/projectdetails/${project.id}`)}>
        <Visibility sx={{ color: "#004aad" }} />
      </IconButton>
      <IconButton color="error" onClick={() => handleDelete(project.id)}>
        <Delete />
      </IconButton>
    </Box>
  </Card>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get('/projects/');
      
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setProjects([]);
    }
  };

  const handleDelete = (projectId) => {
    setProjectToDelete(projectId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/projects/${projectToDelete}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleAddComment = async (projectId, comment) => {
    if (!comment.trim()) return;
    
    try {
      // This would need a proper API endpoint for comments
      // For now, we'll just simulate it
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: [...(p.comments || []), comment]
          };
        }
        return p;
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleAddProject = () => {
    navigate('/addproject');
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "rgba(158, 188, 202, 1)", p: 3 }}>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "rgba(0, 32, 85, 1)",
            color: "white",
            borderRadius: 2,
            p: 2
          }
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>
            Are you sure you want to remove this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)}
            sx={{ color: "white" }}
          >
            No
          </Button>
          <Button 
            onClick={confirmDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton color="primary" sx={{ mr: 1 }} onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" sx={{ flex: 1, textAlign: "center" }}>
          My Projects
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              navigate={navigate}
              handleDelete={handleDelete}
              handleAddComment={handleAddComment}
              showCommentBox={showCommentBox}
              setShowCommentBox={setShowCommentBox}
              commentText={commentText}
              setCommentText={setCommentText}
              currentProjectId={currentProjectId}
              setCurrentProjectId={setCurrentProjectId}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, color: 'text.secondary' }}>
            No projects found. Create your first project!
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProject}
          sx={{
            bgcolor: "#004aad",
            color: "white",
            borderRadius: 2,
            px: 3,
            py: 1,
            "&:hover": { bgcolor: "#003a8c" },
          }}
        >
          Add Project
        </Button>
      </Box>
    </Box>
  );
}
