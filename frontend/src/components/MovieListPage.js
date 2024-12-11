import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieListPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuth from "./CheckAuth";

const MovieListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // User's watchlist
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data.movies);
        setMovies(response.data.movies);
        setWatchlist(response.data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    // const fetchWatchlist = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/api/watchlist",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     setWatchlist(response.data.watchlist.map((movie) => movie._id)); // Extract movie IDs
    //   } catch (err) {
    //     console.error("Error fetching watchlist:", err);
    //   }
    // };
    // fetchWatchlist();
    fetchMovies();
  }, []);
  const handleSingleMovie = (movieId) => {
    console.log("click");
    navigate(`/movie/${movieId}`);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavorite = (movieId) => {
    console.log(`Added movie with ID ${movieId} to favorites`);
  };

  return (
    <div>
      <Navbar />
      <div className="movie-list-page">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
        <div className="movie-grid">
          {filteredMovies.length === 0 ? (
            <div>
              <h5>No movies found. Please try a different search.</h5>
              <img style={{width: '350px', height: '350px'}}
                src="https://www.mymart.com.sa/image/no-results-found.gif" // Add the path to your image
                alt="No Movies Found"
              />
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                title={movie.title}
                thumbnail={movie.thumbnail}
                onFavorite={() => handleFavorite(movie._id)}
                onClick={() => handleSingleMovie(movie._id)}
                isFavorite={watchlist.includes(movie._id)} // Check if the movie is in the watchlist
                movieId={movie._id}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default checkAuth(MovieListPage);
