import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Link } from "react-router-dom";
import { setMovies, setLoading, setError } from "../../redux/movieSlice";
import s from "./MovieList.module.css";

const MovieList = ({ searchInfo, refreshTrigger }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const moviesPerPage = 40;

  useEffect(() => {
    if (searchInfo?.isSearching) {
      setCurrentPage(1);
    }
  }, [searchInfo?.query, searchInfo?.searchType]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      setCurrentPage(1);
    }
  }, [refreshTrigger]);

  useEffect(() => {
    const loadMovies = async () => {
      if (searchInfo?.isSearching) {
        return;
      }

      try {
        dispatch(setLoading());
        const data = await fetchMovies({
          sort: "title",
          order: "ASC",
          page: currentPage,
          limit: moviesPerPage,
        });

        // Визначаємо масив фільмів
        const moviesList = data.movies || data.data || data;

        if (Array.isArray(moviesList)) {
          dispatch(setMovies(moviesList));

          // Загальна кількість фільмів для пагінації
          const total = data.total || data.totalCount || moviesList.length;
          setTotalMovies(total);
          setTotalPages(Math.ceil(total / moviesPerPage));
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
  }, [dispatch, currentPage, searchInfo?.isSearching, refreshTrigger]);

  // Обробник зміни сторінки з перевіркою
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Рендер кнопок пагінації
  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className={s.pageButton}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis1" className={s.ellipsis}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${s.pageButton} ${currentPage === i ? s.activePage : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis2" className={s.ellipsis}>
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={s.pageButton}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

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
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {!movies || movies.length === 0 ? (
        <p className={s.empty}>No movies found.</p>
      ) : (
        <>
          <ul className={s.movieList}>
            {movies.map((movie) => (
              <li key={movie.id} className={s.movieItem}>
                <Link to={`/movies/${movie.id}`} className={s.card}>
                  <h3 className={s.movieTitle}>{movie.title}</h3>
                  <p>
                    <strong>Year:</strong> {movie.year}
                  </p>
                  <p>
                    <strong>Format:</strong> {movie.format}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className={s.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={s.pageButton}
              >
                Previous
              </button>

              {renderPagination()}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={s.pageButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;
