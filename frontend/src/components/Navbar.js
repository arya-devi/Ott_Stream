import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // FontAwesome icon for Watchlist
import './Navbar.css'; // CSS for Navbar
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <h2 style={{color:'red'}}>MOVIESFLIX</h2>
        </div>

        {/* Hamburger Menu for small devices */}
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          <i className="bi bi-list"></i> {/* Add proper icon from Bootstrap Icons */}
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/movieList" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/WatchHistory" className="navbar-link">Watch History</Link>
          </li>
          <li className="navbar-item">
            <Link to="/watchlist" className="navbar-link">
              <FaHeart className="heart-icon" /> Watchlist
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/resetPswd" className="navbar-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
