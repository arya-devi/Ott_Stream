import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import "./WatchHistoryPage.css";
import Footer from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import checkAuth from "./CheckAuth";

const WatchHistoryPage = () => {
  const { movieId } = useParams();
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const addToWatchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/watch-history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        const movies = response.data.map((item) => ({
          title: item.movie.title,
          thumbnail: item.movie.thumbnail[0], // Access the first thumbnail if it's an array
          watchDate: formatDate(item.watchedAt),
        }));
        setWatchedMovies(movies);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };
    addToWatchHistory();
  }, []);
  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };
  return (
    <div>
      <Navbar />
      <div className="watch-history-page">
        <div className="movie-grid">
          {watchedMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              title={movie.title}
              thumbnail={movie.thumbnail}
              watchDate={movie.watchDate} // Pass the watch date to MovieCard
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default checkAuth(WatchHistoryPage);
