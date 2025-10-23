import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const developersPick = [278, 389, 680, 807, 550, 510, 79464];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      fetchDevelopersPick();
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const sorted = data.results.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setMovies(sorted);
      } catch (err) {
        console.error("Error fetching TMDB:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchDevelopersPick = async () => {
    setLoading(true);
    try {
      const promises = developersPick.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then((res) => res.json())
      );
      const results = await Promise.all(promises);
      const sorted = results.sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sorted);
    } catch (err) {
      console.error("Error fetching developer's pick:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const truncateDescription = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="search-page">
      <h1>{query ? "Search Movies" : "Developer's Pick"}</h1>
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
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ cursor: "pointer" }}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{movie.title}</h3>
            <p>
              Release Year:{" "}
              {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            </p>
            <p>Rating: {movie.vote_average.toFixed(1)}</p>
            <p className="overview">{truncateDescription(movie.overview)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
