import { useState } from "react";
import AddMovieModal from "../../components/AddMovieModal/AddMovieModal";
import { addMovie } from "../../services/api";
import MovieList from "../../components/MoviesList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import s from "./Hompage.module.css";

const HomePage = () => {
  const [searchInfo, setSearchInfo] = useState({
    isSearching: false,
    query: "",
    searchType: "",
    resultsCount: 0,
  });

  const [showModal, setShowModal] = useState(false);

  const handleSearchResults = (results, query, searchType) => {
    setSearchInfo({
      isSearching: true,
      query,
      searchType,
      resultsCount: results.length,
    });
  };

  const handleClearSearch = () => {
    setSearchInfo({
      isSearching: false,
      query: "",
      searchType: "",
      resultsCount: 0,
    });
  };

  const handleAddMovie = async (newMovie) => {
    try {
      await addMovie(newMovie);
      alert("Movie added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to add movie.");
      console.error(error);
    }
  };

  return (
    <div className={s.wrapper}>
      <SearchBar initialQuery="" onSearchResults={handleSearchResults} />

      <button onClick={() => setShowModal(true)} className={s.addButton}>
        Add Movie
      </button>

      {searchInfo.isSearching && (
        <div className={s.searchInfoBox}>
          <span>
            Search results for "{searchInfo.query}" by {searchInfo.searchType}:{" "}
            {searchInfo.resultsCount} movies found
          </span>
          <button onClick={handleClearSearch} className={s.clearButton}>
            Show All Movies
          </button>
        </div>
      )}

      <MovieList searchInfo={searchInfo} />

      {showModal && (
        <AddMovieModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddMovie}
        />
      )}
    </div>
  );
};

export default HomePage;
