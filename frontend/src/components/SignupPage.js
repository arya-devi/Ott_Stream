import React, { useState } from 'react';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const SignupPage = () => {
  const user = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors({}); // Clear any previous errors
    // setMessage(""); // Clear any previous messages

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData
      );
      setMessage(response.data.message);
      if (response.status === 201) {
        // setMessage("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
        
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors || [error.response.data.message];
        setMessage(errors);
      } else {
        setMessage("Internal Server Error");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-image">
          <img src="https://truecopier.in/Images/signup.png" alt="Signup illustration" />
        </div>
        <div className="signup-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={handleInputChange}  type="text" name='name' id="username" placeholder="Enter your username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input onChange={handleInputChange} type="email" name='email' id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleInputChange} type="password" name='password' id="password" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input onChange={handleInputChange} type="password" name='confirmPassword' id="confirmPassword" placeholder="Confirm your password" required />
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
          <p className="text-center">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
          {message && (
            <h6 className='text-center text-danger'>{message}</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
