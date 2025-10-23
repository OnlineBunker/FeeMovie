import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function HorizontalRow({ title, movies, rowRef }) {
  const navigate = useNavigate(); 

  const scrollBy = (distance = 400) => {
    if (!rowRef?.current) return;
    rowRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="section-row">
      <h2 className="section-title">{title}</h2>
      <div className="row-wrapper">
        <button className="row-arrow left" onClick={() => scrollBy(-400)}>
          ‹
        </button>
        <div className="cards-container" ref={rowRef}>
          {movies.map((movie) => (
            <div
              className="movie-card-row"
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)} 
              style={{ cursor: "pointer" }}
            >
              {movie.poster_path ? (
                <img
                  className="card-poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-image-card">No Image</div>
              )}
              <div className="card-body">
                <h4 className="card-title">{movie.title}</h4>
                <p className="card-meta">
                  {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}{" "}
                  ·{" "}
                  {movie.vote_average !== undefined
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </p>
                <p className="card-overview">
                  {truncateDescription(movie.overview)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="row-arrow right" onClick={() => scrollBy(400)}>
          ›
        </button>
      </div>
    </section>
  );
}

const truncateDescription = (text, wordLimit = 15) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

export default function Homepage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [drama, setDrama] = useState([]);
  const [horror, setHorror] = useState([]);
  const [action, setAction] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [animated, setAnimated] = useState([]);

  const newReleasesRef = useRef(null);
  const animatedRef = useRef(null);
  const topRatedRef = useRef(null);
  const dramaRef = useRef(null);
  const horrorRef = useRef(null);
  const actionRef = useRef(null);
  const thrillerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // fetch data
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        const data = await res.json();
        setTrending(data.results.slice(0, 10));
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    const fetchTopRated = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        );
        const data = await res.json();
        setTopRated(data.results.slice(0, 12));
      } catch (err) {
        console.error("Error fetching top rated:", err);
      }
    };

    const fetchByGenre = async (genreId, setter) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=500`
        );
        const data = await res.json();
        setter(data.results.slice(0, 12));
      } catch (err) {
        console.error("Error fetching genre", genreId, err);
        setter([]);
      }
    };

    const fetchNewReleases = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setNewReleases(data.results.slice(0, 10));
      } catch (err) {
        console.error("Error fetching new releases:", err);
        setNewReleases([]);
      }
    };

    fetchTrending();
    fetchTopRated();
    fetchByGenre(18, setDrama); // Drama
    fetchByGenre(27, setHorror); // Horror
    fetchByGenre(28, setAction); // Action
    fetchByGenre(53, setThriller); // Thriller
    fetchByGenre(16, setAnimated); // Animated
    fetchNewReleases();
  }, []);

  // auto-rotate trending
  useEffect(() => {
    if (!trending.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [trending]);

  const goNext = () => setCurrentIndex((p) => (p + 1) % trending.length);
  const goPrev = () =>
    setCurrentIndex((p) => (p - 1 + trending.length) % trending.length);

  if (!trending.length) return null;

  return (
    <div className="homepage-root">
      {/* HERO / TRENDING CAROUSEL */}
      <div className="trending-carousel">
        <div className="trending-label">Top 10 Trending Movies of Today</div>

        <div className="carousel-container">
          {trending.map((movie, index) => (
            <div
              key={movie.id}
              className={`carousel-slide ${
                index === currentIndex ? "active" : "inactive"
              }`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/movie/${movie.id}`)} 
            >
              {index === currentIndex && (
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{truncateDescription(movie.overview, 30)}</p>
                </div>
              )}
            </div>
          ))}

          <div className="carousel-arrows">
            <button onClick={goPrev} className="arrow left">
              ‹
            </button>
            <button onClick={goNext} className="arrow right">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL ROWS */}
      <div className="rows-container">
        <HorizontalRow
          title="Top Rated of All Time"
          movies={topRated}
          rowRef={topRatedRef}
        />
        <HorizontalRow
          title="New Releases"
          movies={newReleases}
          rowRef={newReleasesRef}
        />
        <HorizontalRow
          title="Top 10 Horror Picks"
          movies={horror}
          rowRef={horrorRef}
        />
        <HorizontalRow
          title="Top Animated Movies"
          movies={animated}
          rowRef={animatedRef}
        />
        <HorizontalRow
          title="Top 10 Action Picks"
          movies={action}
          rowRef={actionRef}
        />
        <HorizontalRow
          title="Top 10 Psychological Thriller Picks"
          movies={thriller}
          rowRef={thrillerRef}
        />
        <HorizontalRow
          title="Top 10 Drama Picks"
          movies={drama}
          rowRef={dramaRef}
        />
      </div>
    </div>
  );
}
