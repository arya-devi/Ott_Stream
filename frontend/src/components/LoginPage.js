import React from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/movieList')
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img 
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1731137361~exp=1731140961~hmac=9005976cc0fef976ed391b34292244390c4b427edeb697e14be963615fea807c&w=1380" 
            alt="Login illustration" />
        </div>
        <div className="login-card">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button onClick={handleLogin} type="submit" className="btn-primary">Login</button>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
