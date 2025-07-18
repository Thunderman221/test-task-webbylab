import { useState } from "react";
import { importMovies } from "../../services/api.js";
import { useDispatch } from "react-redux";
import { addMovie } from "../../redux/movieSlice.js";
import s from "./ImportMovieFromFile.module.css";

const ImportMoviesFromFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a file to import");
      return;
    }

    if (file.type !== "text/plain") {
      setError("Supported file type is .txt only");
      return;
    }

    setIsLoading(true);

    try {
      const importedMovies = await importMovies(file);

      importedMovies.forEach((movie) => dispatch(addMovie(movie)));

      setSuccess(
        `The movies is imported ${importedMovies.length} successfully!`
      );
      setFile(null);

      // Оновлюємо сторінку через 2 секунди після успішного імпорту
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Import error:", err);
      setError(err.message || "Failed to import movies");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.fileInputWrapper}>
          <label className={s.fileInputLabel}>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className={s.fileInput}
              disabled={isLoading}
            />
            <span className={s.fileInputButton}>
              {file ? "Change the file" : "Choose a file"}
            </span>
            {file && <span className={s.fileName}>{file.name}</span>}
          </label>
        </div>

        {error && <div className={s.error}>{error}</div>}
        {success && <div className={s.success}>{success}</div>}

        <button
          type="submit"
          className={s.submitButton}
          disabled={!file || isLoading}
        >
          {isLoading ? "Importing..." : "Import Movies"}
        </button>
      </form>

      <div className={s.instructions}>
        <h3>Instruction:</h3>
        <p>The file must contain data in the following format:</p>
        <pre>
          {`Title: Film title
Release Year: Release year (YYYY)
Format: DVD/VHS/Blu-Ray
Stars: Actors (comma separated)

Title: Another film title
...`}
        </pre>
      </div>
    </div>
  );
};

export default ImportMoviesFromFile;
