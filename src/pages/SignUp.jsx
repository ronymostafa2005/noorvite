import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import '../styles/SignUp.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    profile_picture: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(f => ({ ...f, profile_picture: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim())  newErrors.last_name  = 'Last name is required';
    if (!formData.email.includes('@')) newErrors.email    = 'Valid email is required';
    if (formData.password.length < 6)  newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k,v]) => {
        if (v != null) data.append(k, v);
      });
      await register(data);
      navigate('/signin');
    } catch (err) {
      setErrors({ server: err.message || 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-card">
        <div className="stripe stripe-top" />
        <div className="content-wrapper">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Please enter your information and create your account
          </p>

          {errors.server && <p className="error-message">{errors.server}</p>}

          <form onSubmit={handleSubmit} className="signup-form" encType="multipart/form-data">
            <input
              type="text"
              name="first_name"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your mail"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">student</option>
              <option value="instructor">instructor</option>
            </select>

            <div className="profile-upload">
              <div
                className="preview-container"
                onClick={() => fileInputRef.current.click()}
              >
                {previewImage
                  ? <img src={previewImage} alt="Preview" />
                  : <span className="upload-placeholder">+</span>
                }
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account…' : 'sign up'}
            </button>
          </form>

          <div className="signin-link">
            Have an Account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
