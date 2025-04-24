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
  DialogTitle,
  Avatar,
  Button
} from "@mui/material";
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

const ProjectCard = ({ project, navigate, onDelete, loadProjects }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    const comment = commentText.trim();
    if (!comment) return;
    const saved = JSON.parse(localStorage.getItem('projects')) || [];
    const updated = saved.map(p =>
      p.id === project.id
        ? { ...p, comments: [...(p.comments || []), comment] }
        : p
    );
    localStorage.setItem('projects', JSON.stringify(updated));
    loadProjects();
    setShowCommentBox(false);
    setCommentText("");
  };

  const handleDeleteComment = (idx) => {
    const saved = JSON.parse(localStorage.getItem('projects')) || [];
    const updated = saved.map(p =>
      p.id === project.id
        ? { ...p, comments: p.comments.filter((_, i) => i !== idx) }
        : p
    );
    localStorage.setItem('projects', JSON.stringify(updated));
    loadProjects();
  };

  return (
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
        <Typography variant="caption" color="gray">{project.category}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <AvatarGroup max={2} sx={{ mr: 1 }}>
            {project.users.map((u, i) => (
              <Avatar key={i} src={u} sx={{ width: 24, height: 24 }} />
            ))}
          </AvatarGroup>
          <Box sx={{ width: "100px", height: 8, bgcolor: "#ddd", borderRadius: 4, overflow: "hidden" }}>
            <Box sx={{ width: `${project.progress}%`, height: "100%", bgcolor: "#004aad" }} />
          </Box>
        </Box>

        {showCommentBox && (
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
              size="small"
              variant="contained"
              sx={{ mr: 1, bgcolor: "#004aad" }}
              onClick={handleAddComment}
            >
              Add
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setShowCommentBox(false);
                setCommentText("");
              }}
            >
              Cancel
            </Button>
          </Box>
        )}

        {project.comments?.length > 0 && (
          <Box sx={{ mt: 2, borderTop: '1px solid #eee', pt: 1 }}>
            {project.comments.map((c, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ flexGrow: 1 }}>{c}</Typography>
                <IconButton size="small" onClick={() => handleDeleteComment(i)}>
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
          sx={{ bgcolor: "#e0ffe0", px: 1.5, py: 0.5, borderRadius: 10, fontSize: 12 }}
        >
          {project.priority}
        </Typography>
        <IconButton color="primary" onClick={() => navigate("/EditingPage")}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => navigate("/GamificationPage")}>
          <EmojiEvents sx={{ color: "#004aad" }} />
        </IconButton>
        <IconButton color="primary" onClick={() => setShowCommentBox(true)}>
          <Comment sx={{ color: "#004aad" }} />
        </IconButton>
        <IconButton color="primary" onClick={() => navigate("/projectdetails")}>
          <Visibility sx={{ color: "#004aad" }} />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(project.id)}>
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('projects')) || [];
      setProjects(saved);
    } catch {
      setProjects([]);
    }
  };

  const handleDelete = (id) => {
    setToDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const updated = projects.filter(p => p.id !== toDeleteId);
    localStorage.setItem('projects', JSON.stringify(updated));
    setProjects(updated);
    setDeleteConfirmOpen(false);
    setToDeleteId(null);
  };

  const handleAddProject = () => {
    navigate('/addproject');
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "rgba(158, 188, 202, 1)", p: 3 }}>
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
          <DialogContentText>
            هل أنت متأكد أنك عايزة تحذفي المشروع ده؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: "white" }}>
            لا
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            نعم
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" sx={{ flex: 1, textAlign: "center" }}>
          My Projects
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {projects.length > 0 ? (
          projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              navigate={navigate}
              onDelete={handleDelete}
              loadProjects={loadProjects}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, color: 'text.secondary' }}>
            No projects found. Create your first project!
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
