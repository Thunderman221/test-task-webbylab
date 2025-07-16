import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchMovieById, deleteMovie } from "../../services/api";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import { deleteMovie as deleteMovieAction } from "../../redux/movieSlice";
import s from "./MovieDetailsPage.module.css";

const MovieDetailesPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData.data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await deleteMovie(movieId);
      dispatch(deleteMovieAction(movieId));
      setDeleteLoading(false);
      setShowConfirmModal(false);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete movie:", err);
      setDeleteError("Failed to delete movie.");
      setDeleteLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className={s.container}>
      <Link to="/" className={s.goBackLink}>
        ← Go Back
      </Link>

      <h2>{movie.title}</h2>
      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Format:</strong> {movie.format}
      </p>
      <p>
        <strong>Stars:</strong>{" "}
        {movie.actors?.map((actor) => actor.name).join(", ") ||
          "No stars listed"}
      </p>

      <button
        onClick={() => setShowConfirmModal(true)}
        className={s.deleteButton}
      >
        Delete Movie
      </button>

      {showConfirmModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
          isLoading={deleteLoading}
        />
      )}

      {deleteError && <p className={s.errorText}>{deleteError}</p>}
    </div>
  );
};

export default MovieDetailesPage;
