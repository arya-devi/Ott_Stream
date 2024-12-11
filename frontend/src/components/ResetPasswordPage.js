// ResetPasswordPage.js

import React, { useState } from "react";
import "./ResetPasswordPage.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import checkAuth from "./CheckAuth";

const ResetPasswordPage = () => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/change-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setMessage(response.data.message);

      setData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <div>
      <div className="reset-password-page">
        <Navbar />
        <div className="reset-password-container">
          <div className="reset-password-card">
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <div className="form-group">
                <label htmlFor="old-password">Old Password</label>
                <input
                  value={data.oldPassword}
                  onChange={handleInputChange}
                  type="password"
                  name="oldPassword"
                  id="old-password"
                  placeholder="Enter your old password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  value={data.newPassword}
                  onChange={handleInputChange}
                  type="password"
                  name="newPassword"
                  id="new-password"
                  placeholder="Enter your new password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                  value={data.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="Confirm your new password"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Reset Password
              </button>
            </form>
            <p className="text-center">
              Remembered your password?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
            {message && <h6 className="text-danger text-center">{message}</h6>}
          </div>
          <div className="reset-password-image">
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1731137361~exp=1731140961~hmac=9005976cc0fef976ed391b34292244390c4b427edeb697e14be963615fea807c&w=1380"
              alt="Reset Password illustration"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default checkAuth(ResetPasswordPage);
