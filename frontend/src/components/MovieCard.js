// import React, { useState } from 'react';
// import './MovieCard.css';
// import { FaHeart, FaRegHeart } from 'react-icons/fa'; // FaRegHeart for unfilled heart, FaHeart for filled heart

// const MovieCard = ({ title, thumbnail }) => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Toggle favorite state on icon click
//   const handleFavoriteClick = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <div className="movie-card">
//       <img src={thumbnail} alt={`${title} Thumbnail`} className="movie-thumbnail" />
//       <div className="movie-details">
//         <h3 className="movie-title">{title}</h3>
//         {/* Conditionally render filled or unfilled heart */}
//         {isFavorite ? (
//           <FaHeart className="favorite-icon filled" onClick={handleFavoriteClick} />
//         ) : (
//           <FaRegHeart className="favorite-icon" onClick={handleFavoriteClick} />
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import './MovieCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ title, thumbnail, onFavorite, onWatch, onRemove, watchDate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (onFavorite) onFavorite();
  };
  const handleCardClick = () => {
    navigate(`/movie`);
  };
  return (
    <div  className="movie-card">
      <img onClick={handleCardClick} src={thumbnail} alt={`${title} Thumbnail`} className="movie-thumbnail" />
      <div className="movie-details">
        <h3 className="movie-title">{title}</h3>

        {/* Conditionally render buttons or watch date */}
        {watchDate ? (
          <div className="watch-date">
            Watched on: {watchDate}
          </div>
        ) : (
          <>
            {onWatch && (
              <button className="watchlist-button" onClick={onWatch}>
                Watch
              </button>
            )}
            {onRemove && (
              <>
              {isFavorite ? (
                <FaRegHeart className="favorite-icon" onClick={handleFavoriteClick} />
              ) : (
                <FaHeart className="favorite-icon filled" onClick={handleFavoriteClick} />

              )}
            </>
            )}
            {onFavorite && (
              <>
                {isFavorite ? (
                  <FaHeart className="favorite-icon filled" onClick={handleFavoriteClick} />
                ) : (
                  <FaRegHeart className="favorite-icon" onClick={handleFavoriteClick} />
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
