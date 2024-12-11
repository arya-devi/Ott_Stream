import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  
  const navigate = useNavigate();
  const { err } = useParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   if (msg) {
  //     setMessage(msg);
  //   }
  // }, [msg]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      console.log(response);
      setMessage(response.data.message); // Show success message if login is successful
      console.log(response.data.token);
      const token = response.data.token; 
      const userId = response.data.userId; 
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); 
      if (token) {
      }
      navigate("/movieList");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
      } 
    }
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
              <input onChange={handleInputChange}  type="email" name='email' id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleInputChange} type="password" name='password' id="password" placeholder="Enter your password" required />
            </div>
            <button onClick={handleSubmit} type="submit" className="btn-primary">Login</button>
          </form>
          <p className="text-center">
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
          {message && (
            <h6 className='text-center text-danger'>{message}</h6>
          )}
          
          {err && (
            <h6 className='text-center text-danger'>{err}</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
