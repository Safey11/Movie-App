  "use client";
  import { useState, useEffect } from "react";
  import MovieCard from "./MovieCard";
  import Image from "next/image";

  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchMovies = async (title) => {
      if (!title.trim()) {
        setMovies([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${API_KEY}&s=${title}`);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();

        // ✅ Filter out movies with missing posters
        const filteredMovies = (data.Search || []).filter(
          (movie) => movie.Poster && movie.Poster !== "N/A"
        );

        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    // ✅ Debounce search — avoids making API calls on every keystroke
    useEffect(() => {
      const delay = setTimeout(() => {
        if (searchValue.trim()) searchMovies(searchValue);
      }, 600);

      return () => clearTimeout(delay);
    }, [searchValue]);

    // ✅ Optional default movie load
    useEffect(() => {
      searchMovies("Batman");
    }, []);

    return (
      <div className="app">
        <h1>🎬 NextFlicks</h1>

        <div className="search">
          <input
            type="text"
            value={searchValue}
            placeholder="Search for a movie..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Image
            src="/Search.svg"
            alt="search"
            onClick={() => searchMovies(searchValue)}
            style={{ cursor: "pointer" }}
            unoptimized
            width={24}
            height={24}
          />
        </div>

        {isLoading ? (
          <div className="loading">
            <h3>Loading movies...</h3>
          </div>
        ) : movies.length > 0 ? (
          <div className="container">
            {[...new Map(movies.map((m) => [m.imdbID, m])).values()].map(
              (movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              )
            )}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    );
  };

  export default App;
