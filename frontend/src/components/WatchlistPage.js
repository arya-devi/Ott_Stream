// import React, { useState } from 'react';
// import MovieCard from './MovieCard';
// import Navbar from './Navbar';
// import './WatchlistPage.css';
// import { useNavigate } from 'react-router-dom';
// import Footer from './Footer';

// const WatchlistPage = () => {
//     const navigate = useNavigate()
//   const [movies, setMovies] = useState([
//     { id: 1, title: 'Inception', thumbnail: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg' },
//     { id: 2, title: 'Interstellar', thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==' },
//     { id: 1, title: 'Inception', thumbnail: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg' },
//     { id: 2, title: 'Interstellar', thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==' },
//     { id: 2, title: 'Interstellar', thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==' },
//   ]);

//   const handleWatch = (movieId) => {
//     console.log(`Watching movie with ID ${movieId}`);
//     navigate('/movie')
//     // Implement logic to update the watch status or perform other actions
//   };

//   const handleRemove = (movieId) => {
//     console.log(`Removing movie with ID ${movieId}`);
//     // Remove the movie from the list
//     setMovies(movies.filter(movie => movie.id !== movieId));
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="watchlist-page">
//         <div className="movie-grid">
//           {movies.map((movie) => (
//             <MovieCard
//               key={movie.id}
//               title={movie.title}
//               thumbnail={movie.thumbnail}
//               onWatch={() => handleWatch(movie.id)}
//               onRemove={() => handleRemove(movie.id)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default WatchlistPage;
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import './WatchlistPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

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

  const handleRemove = (movieId) => {
    console.log(`Removing movie with ID ${movieId}`);
    // Remove the movie from the list
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
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

export default WatchlistPage;
