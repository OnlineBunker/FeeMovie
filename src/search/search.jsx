import { useState, useEffect } from 'react';
import './search.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true); // start loading
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const sorted = data.results.sort((a, b) => b.vote_average - a.vote_average);
        setMovies(sorted);
      } catch (err) {
        console.error('Error fetching TMDB:', err);
        setMovies([]);
      } finally {
        setLoading(false); // stop loading
      }
    };

    // debounce API call
    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const truncateDescription = (text, wordLimit = 15) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <div className="search-page">
      <h1>Search Movies</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="loading">Loading...</p>}

      {!loading && query && movies.length === 0 && (
        <p className="no-results">No results found</p>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p className="overview">{truncateDescription(movie.overview)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
