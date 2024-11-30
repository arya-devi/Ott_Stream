import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieCard = ({
  title,
  thumbnail,
  isFavorite:initialFavorite,
  onWatch,
  onRemove,
  watchDate,
  onClick,
  movieId
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchWatchlistStatus = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/watchlist`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       console.log(response.data.watchlist);
        
  //       setWatchlist(response.data.watchlist);
  //       console.log(watchlist);
        
  //       // Check if the movie is in the user's watchlist
  //       setIsFavorite(watchlist.includes(movieId));
  //     } catch (err) {
  //       console.error("Error fetching watchlist:", err);
  //     }
  //   };

  //   fetchWatchlistStatus();
  // }, [movieId]);
  const handleFavoriteClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/watchlist`,{movieId},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      setIsFavorite(!isFavorite);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    // if (onFavorite) onFavorite();
  };

  return (
    <div className="movie-card">
      <img
        onClick={onClick}
        src={thumbnail}
        alt={`${title} Thumbnail`}
        className="movie-thumbnail"
      />
      <div className="movie-details">
        <h3 className="movie-title">{title}</h3>

        {/* Conditionally render buttons or watch date */}
        {watchDate ? (
          <div className="watch-date">Watched on: {watchDate}</div>
        ) : (
          <>
            {onWatch && (
              <button className="watchlist-button" onClick={onWatch}>
                Watch
              </button>
            )}
            {/* {onRemove && (
              <>
                {isFavorite ? (
                  <FaRegHeart
                    className="favorite-icon"
                    onClick={handleFavoriteClick}
                  />
                ) : (
                  <FaHeart
                    className="favorite-icon filled"
                    onClick={handleFavoriteClick}
                  />
                )}
              </>
            )} */}
                {isFavorite ? (
                  <FaHeart
                    className="favorite-icon filled"
                    onClick={handleFavoriteClick}
                  />
                ) : (
                  <FaRegHeart
                    className="favorite-icon"
                    onClick={handleFavoriteClick}
                  />
                )}
          </>
         )}
      </div>
    </div>
  );
};

export default MovieCard;

