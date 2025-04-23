import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import '../styles/ResetPassword.css';

export default function ResetPassword() {
  const [code, setCode] = useState('');
  const [newPass, setNewPass] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!code.trim() || newPass.length < 6) {
      setError('Please enter valid code and password (min 6 chars).');
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(code, newPass);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-page">
      {/* Back arrow */}
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      {/* Screen title */}
      <h1 className="reset-title">reset password</h1>

      {/* Reset form */}
      <form className="reset-form" onSubmit={handleSubmit}>
        <label htmlFor="code">code</label>
        <input
          id="code"
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />

        <label htmlFor="newPass">new pass</label>
        <input
          id="newPass"
          type="password"
          placeholder="Enter new password"
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="reset-button"
          disabled={isLoading}
        >
          {isLoading ? 'Changing…' : 'change'}
        </button>
      </form>
    </div>
  );
}
