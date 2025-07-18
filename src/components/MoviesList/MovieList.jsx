import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api.js";
import { setMovies, setLoading, setError } from "../../redux/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import s from "./MovieList.module.css";

const MovieList = ({ searchInfo, refreshTrigger }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      if (searchInfo?.isSearching) return;

      try {
        dispatch(setLoading());
        const data = await fetchMovies({
          sort: "title",
          order: "ASC",
          limit: 100000,
        });

        const moviesList = data.movies || data.data || data;

        if (Array.isArray(moviesList)) {
          dispatch(setMovies(moviesList));
          setTotalMovies(moviesList.length);
        } else {
          console.error("API response is not an array:", data);
          dispatch(setError("Invalid API response format"));
        }
      } catch (error) {
        console.error("Failed to load movies:", error);
        dispatch(setError(error.message || "Failed to load movies"));
      }
    };

    loadMovies();
  }, [dispatch, searchInfo?.isSearching, refreshTrigger]);

  if (loading) {
    return <div className={s.container}>Loading movies...</div>;
  }

  if (error) {
    return <div className={s.container}>Error: {error}</div>;
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Movies</h2>

      <div className={s.movieInfo}>
        <p>
          {searchInfo?.isSearching
            ? `Found ${totalMovies} movies`
            : `Total movies: ${totalMovies}`}
        </p>
      </div>

      {!movies || movies.length === 0 ? (
        <p className={s.empty}>No movies found.</p>
      ) : (
        <ul className={s.movieList}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
