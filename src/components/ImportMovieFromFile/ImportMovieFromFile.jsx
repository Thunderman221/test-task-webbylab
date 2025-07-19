import { useState } from "react";
import { useDispatch } from "react-redux";
import { importMovies } from "../../services/api.js";
import { addMovie } from "../../redux/movieSlice.js";
import s from "./ImportMovieFromFile.module.css";

const ImportMoviesFromFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const resetMessages = () => setMessage({ type: "", text: "" });

  const validateFile = (file) => {
    if (!file) return "Please select a file to import";
    if (file.type !== "text/plain") return "Supported file type is .txt only";
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    resetMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();

    const error = validateFile(file);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setIsLoading(true);
    try {
      const importedMovies = await importMovies(file);
      importedMovies.forEach((movie) => dispatch(addMovie(movie)));

      setMessage({
        type: "success",
        text: `Imported ${importedMovies.length} movie(s) successfully!`,
      });

      setFile(null);

      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("Import error:", err);
      setMessage({
        type: "error",
        text: err.message || "Failed to import movies",
      });
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

        {message.text && (
          <div className={message.type === "error" ? s.error : s.success}>
            {message.text}
          </div>
        )}

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
