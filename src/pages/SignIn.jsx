import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/SignIn.css';

export default function SignIn() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { token } = await login({ email, password });
      localStorage.setItem('token', token);
      navigate('/Home');       // go to Home (instead of /dashboard)
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page signin-page">
      <div className="auth-card">
        <div className="stripe stripe-top" />
        <div className="content-wrapper">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Please enter your email address and password to sign in
          </p>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="signin-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in…' : 'sign in'}
            </button>
          </form>

          <div className="signup-footer">
            Create Account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
