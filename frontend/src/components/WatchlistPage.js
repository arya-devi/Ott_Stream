
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import './WatchlistPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import checkAuth from './CheckAuth';

const WatchlistPage = () => {
    const navigate = useNavigate()
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/watchlist",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        
        setWatchlist(response.data.watchlist); // Extract movie IDs
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };
    fetchWatchlist();
  }, []);

  const handleWatch = (movieId) => {
    console.log(`Watching movie with ID ${movieId}`);
    navigate(`/movie/${movieId}`);
    // Implement logic to update the watch status or perform other actions
  };

  const handleRemove = async (movieId) => {
    console.log(`Removing movie with ID ${movieId}`);
    try {
      // Send a request to remove the movie from the backend
      await axios.post(
        `http://localhost:5000/api/watchlist`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Update the frontend state to remove the movie
      setWatchlist(watchlist.filter((movie) => movie._id !== movieId));
      console.log("Movie removed from watchlist:", movieId);
    } catch (err) {
      console.error("Error removing movie:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="watchlist-page">
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie._id}
              title={movie.title}
              thumbnail={movie.thumbnail}
              onWatch={() => handleWatch(movie._id)}
              onRemove={() => handleRemove(movie._id)}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default checkAuth(WatchlistPage);
