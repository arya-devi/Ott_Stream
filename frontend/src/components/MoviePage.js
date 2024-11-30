// MoviePage.js

import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  console.log(movieId);

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    console.log(
      isInWatchlist ? "Removed from Watchlist" : "Added to Watchlist"
    );
  };
  useEffect(() => {
    const getSingleMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setMovie(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    getSingleMovie();
    
    const addToWatchHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/watch-history",{movieId},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);        
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };
    addToWatchHistory();
  }, [movieId]);
  return (
    <div>
      <div className="movie-page">
        <Navbar />
        <div className="thumbnail-section">
          <img
            className="movie-thumbnail"
            src={movie.thumbnail}
            alt="Inception Thumbnail"
          />
        </div>

        <div className="content-section">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-description">{movie.description}</p>

          <div className="video-player">
            <video width="100%" controls>
              <source
                src={movie.videoUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <button className="watchlist-button" onClick={handleAddToWatchlist}>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
