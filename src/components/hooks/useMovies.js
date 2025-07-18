import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api.js";

export const useMovies = (
  currentPage,
  moviesPerPage,
  isSearching,
  dispatch
) => {
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (isSearching) return;
      try {
        dispatch({ type: "movies/setLoading" });
        const data = await fetchMovies({
          sort: "title",
          order: "ASC",
          page: currentPage,
          limit: moviesPerPage,
        });

        const moviesList = data.movies || data.data || data;
        const total = data.total || data.totalCount || moviesList.length;

        dispatch({ type: "movies/setMovies", payload: moviesList });
        setTotalMovies(total);
        setTotalPages(Math.ceil(total / moviesPerPage));
      } catch (error) {
        dispatch({ type: "movies/setError", payload: error.message });
      }
    };
    load();
  }, [currentPage, moviesPerPage, isSearching, dispatch]);

  return { totalPages, totalMovies };
};
