import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GetStart.css';

const GetStart = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <div className="get-start-page">
      <div className="get-start-card">
        <div className="stripe stripe-top" />
        <div className="image-wrapper">
          <img src="/2.jpg" alt="Flow Task Logo" className="logo-image" />
        </div>
        <div className="stripe stripe-middle" />
        <div className="content-wrapper">
          <h1 className="title">Flow Task</h1>
          <p className="subtitle">
            Organizing Tasks<br />
            Empowering Teams
          </p>
          <button
            type="button"
            className="get-started-button"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStart;
