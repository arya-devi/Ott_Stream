// LandingPage.js

import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate()
  const handleLogin=()=>{
    navigate('/login')
  }
  const handleSignup=()=>{
    navigate('/signup')
  }
  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="content text-center">
          <h1 className="display-4">Welcome to OTT Streaming Platform</h1>
          <p className="lead">Stream your favorite shows and movies anytime, anywhere.</p>
          <div className="buttons mt-4">
            <button onClick={handleLogin} className="btn btn-primary btn-lg mx-2">Login</button>
            <button onClick={handleSignup} className="btn btn-secondary btn-lg mx-5">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
