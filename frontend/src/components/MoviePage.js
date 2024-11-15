// MoviePage.js

import React, { useState } from 'react';
import './MoviePage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const MoviePage = () => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    console.log(isInWatchlist ? "Removed from Watchlist" : "Added to Watchlist");
  };

  return (
    <div>
    <div className="movie-page">
        <Navbar/>
      <div className="thumbnail-section">
        <img
          className="movie-thumbnail"
          src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg"
          alt="Inception Thumbnail"
        />
      </div>
      
      <div className="content-section">
        <h1 className="movie-title">Inception</h1>
        <p className="movie-description">
          A mind-bending thriller where a skilled thief is given a chance at redemption if he can successfully plant an idea in someone's mind.
        </p>
        
        <div className="video-player">
          <video width="100%" controls>
            <source src="https://videos.pexels.com/video-files/19150355/19150355-uhd_2560_1440_60fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <button className="watchlist-button" onClick={handleAddToWatchlist}>
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
          <Footer/>
    </div>
  );
};

export default MoviePage;
