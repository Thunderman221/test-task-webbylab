import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../services/api";
import { setMovies, setError, setLoading } from "../../redux/movieSlice";
import s from "./SearchBar.module.css";

const SearchBar = ({ initialQuery = "", onSearchResults }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    const trimmedQuery = values.query.trim();
    const searchType = values.searchType;

    if (!trimmedQuery) {
      setSubmitting(false);
      return;
    }

    try {
      dispatch(setLoading());

      let data;
      if (searchType === "title") {
        // Пошук за назвою фільму
        data = await fetchMovies({
          title: trimmedQuery,
          sort: "title",
          order: "ASC",
          page: 1,
          limit: 20,
        });
      } else if (searchType === "actor") {
        // Пошук за ім'ям актора
        data = await fetchMovies({
          actor: trimmedQuery,
          sort: "title",
          order: "ASC",
          page: 1,
          limit: 20,
        });
      } else {
        // Комбінований пошук
        data = await fetchMovies({
          search: trimmedQuery,
          sort: "title",
          order: "ASC",
          page: 1,
          limit: 20,
        });
      }

      console.log("Search results:", data);

      // Перевірте структуру відповіді API
      const moviesList = data.movies || data.data || data;

      if (Array.isArray(moviesList)) {
        dispatch(setMovies(moviesList));

        // Викликати callback якщо є
        if (onSearchResults) {
          onSearchResults(moviesList, trimmedQuery, searchType);
        }
      } else {
        console.error("Search API response is not an array:", data);
        dispatch(setError("Invalid search response format"));
      }
    } catch (error) {
      console.error("Search error:", error);
      dispatch(
        setError(`Failed to search movies by ${searchType}: ${error.message}`)
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    // Очистити пошук і завантажити всі фільми
    dispatch(setLoading());
    fetchMovies({
      sort: "title",
      order: "ASC",
      page: 1,
      limit: 10,
    })
      .then((data) => {
        const moviesList = data.movies || data.data || data;
        if (Array.isArray(moviesList)) {
          dispatch(setMovies(moviesList));
        }
      })
      .catch(() => {
        dispatch(setError("Failed to load movies"));
      });
  };

  return (
    <Formik
      initialValues={{ query: initialQuery, searchType: "title" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, resetForm }) => (
        <Form className={s.searchForm}>
          <div className={s.selectWrapper}>
            <Field as="select" name="searchType" className={s.searchSelect}>
              <option value="title">Search by Title</option>
              <option value="actor">Search by Actor</option>
              <option value="search">Combined Search</option>
            </Field>
          </div>
          <Field
            name="query"
            placeholder={
              values.searchType === "actor"
                ? "Enter actor name..."
                : values.searchType === "title"
                ? "Enter movie title..."
                : "Search movies or actors..."
            }
            className={s.searchInput}
          />
          <button
            type="submit"
            className={s.searchButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            className={s.clearButton}
            onClick={() => {
              resetForm();
              handleClear();
            }}
          >
            Clear
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
