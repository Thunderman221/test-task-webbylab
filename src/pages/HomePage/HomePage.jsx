import { useState } from "react";
import AddMovieModal from "../../components/AddMovieModal/AddMovieModal";
import ImportMoviesFromFile from "../../components/ImportMovieFromFile/ImportMovieFromFile.jsx";
import { addMovie } from "../../services/api.js";
import MovieList from "../../components/MoviesList/MovieList.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import s from "./Hompage.module.css";

const HomePage = () => {
  const [searchInfo, setSearchInfo] = useState({
    isSearching: false,
    query: "",
    searchType: "",
    resultsCount: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);

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
      <h1 className={s.title}> Movie Collection</h1>

      <SearchBar initialQuery="" onSearchResults={handleSearchResults} />

      <div className={s.buttonGroup}>
        <button onClick={() => setShowModal(true)} className={s.addButton}>
          Add Movie
        </button>
        <button
          onClick={() => setShowImportForm(!showImportForm)}
          className={s.importButton}
        >
          {showImportForm ? "Hide Import" : "Import from File"}
        </button>
      </div>

      {showImportForm && <ImportMoviesFromFile />}

      {searchInfo.isSearching && (
        <div className={s.searchInfoBox}>
          <span>
            Search results for "<strong>{searchInfo.query}</strong>" by{" "}
            <strong>{searchInfo.searchType}</strong>:{" "}
            <strong>{searchInfo.resultsCount}</strong> movie(s) found.
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
