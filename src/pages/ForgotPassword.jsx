import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/authService';
import '../styles/ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    try {
      await forgotPassword({ email });
      // you could show a success message or directly navigate:
      navigate('/reset-password');
    } catch (err) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      {/* Back arrow */}
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      {/* Title */}
      <h1 className="forgot-title">Forget password</h1>

      {/* Instruction text */}
      <p className="forgot-instruction">
        Please enter your email address. You will receive a link to create a new password via email.
      </p>

      {/* Form */}
      <form className="forgot-form" onSubmit={handleSubmit}>
        <label htmlFor="email">MAIL</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="forgot-button"
          disabled={isLoading}
        >
          {isLoading ? 'Sending…' : 'Send'}
        </button>
      </form>
    </div>
  );
}
