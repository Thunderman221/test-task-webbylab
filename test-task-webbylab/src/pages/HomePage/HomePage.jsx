import { useState } from "react";
import AddMovieModal from "../../components/AddMovieModal/AddMovieModal";
import { addMovie } from "../../services/api";
import MovieList from "../../components/MoviesList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";

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
    <div>
      <SearchBar initialQuery="" onSearchResults={handleSearchResults} />

      <button
        onClick={() => setShowModal(true)}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add Movie
      </button>

      {searchInfo.isSearching && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e7f3ff",
            borderRadius: "8px",
            margin: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            Search results for "{searchInfo.query}" by {searchInfo.searchType}:{" "}
            {searchInfo.resultsCount} movies found
          </span>
          <button
            onClick={handleClearSearch}
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
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
