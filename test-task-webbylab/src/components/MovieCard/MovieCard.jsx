import s from "./MovieCard.module.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <li className={s.movieItem}>
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
);

export default MovieCard;
