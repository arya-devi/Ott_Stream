import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './MovieListPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const MovieListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([
    // Sample data for movies
    { id: 1, title: 'Inception', thumbnail: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg' },
    { id: 2, title: 'Interstellar', thumbnail: 'https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==' },
    { id: 3, title: 'The Dark Knight', thumbnail: 'https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg' },
    { id: 3, title: 'The Dark Knight', thumbnail: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00383474-klabltwbvz-portrait.jpg' },
    { id: 3, title: 'The Dark Knight', thumbnail: 'https://www.tallengestore.com/cdn/shop/products/Dora_The_Explorer_And_The_Lost_City_Of_Gold_-_Hollywood_English_Movie_Poster_1_4ed6ce91-1d68-45aa-b9f1-d777f47f5f0a.jpg?v=1577693669' },
    { id: 3, title: 'The Dark Knight', thumbnail: 'https://images.moviesanywhere.com/55818b1c62bcf6785947fd80065c7d3a/e34a7a51-79f3-467a-a0ba-42b1f3bdb0a3.jpg' },
    { id: 3, title: 'The Dark Knight', thumbnail: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00413291-xbmabhflqx-portrait.jpg' },
    { id: 3, title: 'The Dark Knight', thumbnail: 'https://pbs.twimg.com/media/FF0MzFjakAQcZcz.jpg:large' },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add filtering logic for movies based on search query here, if needed
  };

  const handleFavorite = (movieId) => {
    console.log(`Added movie with ID ${movieId} to favorites`);
  };

  return (
    <div>
      <Navbar/>
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
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            thumbnail={movie.thumbnail}
            onFavorite={() => handleFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default MovieListPage;
