import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import '../styles/Login.css';

const Login = () => {
  const handleGoogleLogin = () => {
    // TODO: Implement Google authentication
    console.log('Google login clicked');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>GROWUp</h1>
          <p>Your Personal Development Journey</p>
        </div>
        
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <FcGoogle className="google-icon" />
          <span>Continue with Google</span>
        </button>
        
        <div className="login-footer">
          <p>Track your growth using the GROW model:</p>
          <div className="grow-items">
            <span className="grow-item goal">Goals</span>
            <span className="grow-item reality">Reality</span>
            <span className="grow-item options">Options</span>
            <span className="grow-item will">Will</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;