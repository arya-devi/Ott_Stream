import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center text-md-left">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase font-weight-bold">MovieApp</h6>
            <p className="small">
              Discover top movies, track your favorites, and stay updated with the latest releases.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase font-weight-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light small">Trending</a></li>
              <li><a href="#" className="text-light small">Watchlist</a></li>
              <li><a href="#" className="text-light small">Genres</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase font-weight-bold">Follow Us</h6>
            <div>
              <a href="#" className="text-light mx-2"><i className="bi bi-globe"></i></a>
              <a href="#" className="text-light mx-2"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light mx-2"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />

        {/* Copyright */}
        <p className="small text-center mb-0">
          &copy; {new Date().getFullYear()} MovieApp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
