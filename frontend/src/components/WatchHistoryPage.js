import React, { useState } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import './WatchHistoryPage.css';
import Footer from './Footer';


const WatchHistoryPage = () => {
  const [watchedMovies, setWatchedMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      thumbnail: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg',
      watchDate: '2024-10-10 14:30', // Example watched date and time
    },
    {
      id: 2,
      title: 'Interstellar',
      thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==',
      watchDate: '2024-10-11 16:45', // Example watched date and time
    },
    {
      id: 1,
      title: 'Inception',
      thumbnail: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg',
      watchDate: '2024-10-10 14:30', // Example watched date and time
    },
    {
      id: 2,
      title: 'Interstellar',
      thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==',
      watchDate: '2024-10-11 16:45', // Example watched date and time
    },
    {
      id: 1,
      title: 'Inception',
      thumbnail: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg',
      watchDate: '2024-10-10 14:30', // Example watched date and time
    },
    {
      id: 2,
      title: 'Interstellar',
      thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==',
      watchDate: '2024-10-11 16:45', // Example watched date and time
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="watch-history-page">
        <div className="movie-grid">
          {watchedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              thumbnail={movie.thumbnail}
              watchDate={movie.watchDate} // Pass the watch date to MovieCard
            />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default WatchHistoryPage;
