// ResetPasswordPage.js

import React from 'react';
import './ResetPasswordPage.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ResetPasswordPage = () => {
  return (
    <div>
    <div className="reset-password-page">
        <Navbar/>
      <div className="reset-password-container">
      <div className="reset-password-card">
          <h2>Reset Password</h2>
          <form>
            <div className="form-group">
              <label htmlFor="old-password">Old Password</label>
              <input type="password" id="old-password" placeholder="Enter your old password" required />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" placeholder="Enter your new password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm your new password" required />
            </div>
            <button type="submit" className="btn-primary">Reset Password</button>
          </form>
          <p className="text-center">
            Remembered your password? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
        <div className="reset-password-image">
          <img 
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1731137361~exp=1731140961~hmac=9005976cc0fef976ed391b34292244390c4b427edeb697e14be963615fea807c&w=1380" 
            alt="Reset Password illustration" />
        </div>   
      </div>
    </div>
          <Footer/>
    </div>
  );
};

export default ResetPasswordPage;
