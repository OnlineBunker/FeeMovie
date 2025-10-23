import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./moviepage.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!movie) return <p className="loading">Movie not found!</p>;

  const cast = movie.credits?.cast?.slice(0, 5).map(c => c.name).join(", ") || "N/A";

  return (
    <div className="movie-page">
      <h1>{movie.title}</h1>

      <div className="video-container">
        <iframe
        //   src={`https://www.vidking.net/embed/movie/${id}`}
        src={`https://vidsrc-embed.ru/embed/movie?tmdb=${id}`}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          title={movie.title}
        ></iframe>
      </div>

      <div className="movie-details">
        <p><strong>Description:</strong> {movie.overview || "N/A"}</p>
        <p><strong>Release Year:</strong> {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
        <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}</p>
        <p><strong>Cast:</strong> {cast}</p>
      </div>
    </div>
  );
}

export default MoviePage;
