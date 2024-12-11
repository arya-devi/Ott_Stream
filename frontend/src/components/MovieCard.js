// import React, { useEffect, useState } from "react";
// import "./MovieCard.css";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const MovieCard = ({
//   title,
//   thumbnail,
//   isFavorite: initialFavorite,
//   onWatch,
//   watchDate,
//   onClick,
//   movieId,
// }) => {
//   const [isFavorite, setIsFavorite] = useState(initialFavorite);
//   const [watchlist, setWatchlist] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWatchlistStatus = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/watchlist`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         const fetchedWatchlist = response.data.watchlist.map(
//           (item) => item._id
//         );
//         // setWatchlist(fetchedWatchlist);

//         // Check if the movie is in the filtered watchlist
//         setIsFavorite(fetchedWatchlist.includes(movieId));
//         console.log(fetchedWatchlist);

//       } catch (err) {
//         console.error("Error fetching watchlist:", err);
//       }
//     };

//     fetchWatchlistStatus();
//   }, [movieId]);

//   const handleFavoriteClick = async () => {
//     try {
//       if (isFavorite) {
//         // Remove from watchlist
//         await axios.post(
//           `http://localhost:5000/api/watchlist`,
//           { movieId },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//       } else {
//         // Add to watchlist
//         await axios.post(
//           `http://localhost:5000/api/watchlist`,
//           { movieId },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//       }
//       // Toggle favorite status
//       setIsFavorite(!isFavorite);
//     } catch (err) {
//       console.error("Error updating favorite status:", err);
//     }
//   };

//   return (
//     <div className="movie-card">
//       <img
//         onClick={onClick}
//         src={thumbnail}
//         alt={`${title} Thumbnail`}
//         className="movie-thumbnail"
//       />
//       <div className="movie-details">
//         <h3 className="movie-title">{title}</h3>

//         {watchDate ? (
//           <div className="watch-date">Watched on: {watchDate}</div>
//         ) : (
//           <div className="favorite-button">
//             {isFavorite ? (
//               <FaHeart
//                 className="favorite-icon filled"
//                 onClick={handleFavoriteClick}
//               />
//             ) : (
//               <FaRegHeart
//                 className="favorite-icon"
//                 onClick={handleFavoriteClick}
//               />
//             )}
//           </div>
//         )}

//         {onWatch && !watchDate && (
//           <button className="watchlist-button" onClick={onWatch}>
//             Watch
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieCard = ({
  title,
  thumbnail,
  isFavorite: initialFavorite,
  onWatch,
  watchDate,
  onClick,
  movieId,
  onFavorite,
  onRemove,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const fetchedWatchlist = response.data.watchlist.map(
          (item) => item._id
        );
        // setWatchlist(fetchedWatchlist);

        // Check if the movie is in the filtered watchlist
        setIsFavorite(fetchedWatchlist.includes(movieId));
        console.log(fetchedWatchlist);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };

    fetchWatchlistStatus();
  }, [movieId]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        // Remove from watchlist
        await axios.post(
          `http://localhost:5000/api/watchlist`,
          { movieId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Add to watchlist
        await axios.post(
          `http://localhost:5000/api/watchlist`,
          { movieId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      // Toggle favorite status
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error updating favorite status:", err);
    }
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

        {watchDate ? (
          <div className="watch-date">Watched on: {watchDate}</div>
        ) : (
          <>
            {onWatch && (
              <button className="watchlist-button" onClick={onWatch}>
                Watch
              </button>
            )}
            {onRemove && (
              <>
                <FaHeart
                  className="favorite-icon filled"
                  onClick={() => onRemove(movieId)} // Call the onRemove function passed from WatchlistPage
                />
              </>
            )}
            {onFavorite && (
              <>
                {isFavorite ? (
                  <FaHeart
                    className="favorite-icon filled"
                    onClick={handleFavoriteClick} // Pass the function directly
                  />
                ) : (
                  <FaRegHeart
                    className="favorite-icon"
                    onClick={handleFavoriteClick} // Pass the function directly
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
