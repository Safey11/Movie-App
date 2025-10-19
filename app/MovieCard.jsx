"use client";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <Link href={`/movie/${imdbID}`} style={{ textDecoration: "none" }}>
      <div className="movie">
        <div className="movie-year">
          <p>{Year}</p>
        </div>

        <div className="movie-poster">
          <Image
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400x600?text=No+Image"}
            alt={Title}
            width={300}
            height={450}
            loading="lazy"
          />
        </div>

        <div className="movie-info">
          <span>{Type}</span>
          <h3>{Title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
