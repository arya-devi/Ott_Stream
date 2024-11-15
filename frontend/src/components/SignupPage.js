import React from 'react';
import './SignupPage.css';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-image">
          <img src="https://truecopier.in/Images/signup.png" alt="Signup illustration" />
        </div>
        <div className="signup-card">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
          <p className="text-center">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
