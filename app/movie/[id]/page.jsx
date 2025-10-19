"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const API_URL = "https://www.omdbapi.com?apikey=ebcef97d";

export default function MovieDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${API_URL}&i=${id}&plot=full`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading movie details...</p>
      </div>
    );

  if (!movie || movie.Response === "False")
    return <div className="error">❌ Movie not found</div>;

  const openTrailer = () =>
    window.open(
      `https://www.youtube.com/results?search_query=${movie.Title}+official+trailer`,
      "_blank"
    );

  return (
    <div className="movie-detail">
      {/* Background Image with Blur */}
      <div
        className="movie-bg"
        style={{
          backgroundImage: `url(${
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/800x1000?text=No+Image"
          })`,
        }}
      />

      {/* Dark Overlay */}
      <div className="overlay" />

      {/* Main Content */}
      <div className="movie-content">
        {/* Back Button */}
        <button onClick={() => router.back()} className="back-btn">
          ← Back
        </button>

        {/* Poster */}
        <div className="poster">
          <Image
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Image"
            }
            alt={movie.Title}
            width={400}
            height={600}
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="info">
          <h1 className="title">{movie.Title}</h1>
          <p className="meta">
            {movie.Year} • {movie.Genre} • {movie.Runtime}
          </p>
          <p className="plot">{movie.Plot}</p>

          <div className="details">
            <p><strong>🎬 Director:</strong> {movie.Director}</p>
            <p><strong>🖊 Writer:</strong> {movie.Writer}</p>
            <p><strong>⭐ IMDb:</strong> {movie.imdbRating}</p>
            <p><strong>🎭 Cast:</strong> {movie.Actors}</p>
            <p><strong>🌎 Language:</strong> {movie.Language}</p>
          </div>

          <button onClick={openTrailer} className="trailer-btn">
            🎥 Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
}
