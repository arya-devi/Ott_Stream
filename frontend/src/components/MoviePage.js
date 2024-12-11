// MoviePage.js

import React, { useEffect, useRef, useState } from "react";
import "./MoviePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import checkAuth from "./CheckAuth";

const MoviePage = () => {
  const videoRef = useRef(null);
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
        setMovie(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleMovie();

    const addToWatchHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/watch-history",
          { movieId },
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
  useEffect(() => {
    if (movie.videoUrl && videoRef.current) {
      console.log(movie.videoUrl);
      
      // Update the video source and reload the video
      videoRef.current.src = movie.videoUrl;
      videoRef.current.load();
    }
  }, [movie.videoUrl]);
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
            <video
              ref={videoRef}
              className="rounded shadow w-100 h-100"
              controls
            >
              <source type="video/mp4" />
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

export default checkAuth(MoviePage);
