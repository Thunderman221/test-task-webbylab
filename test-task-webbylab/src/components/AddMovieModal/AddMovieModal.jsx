import { useState } from "react";
import s from "./AddMovieModal.module.css";

const AddMovieModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [format, setFormat] = useState("DVD");
  const [actors, setActors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const actorList = actors
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name);

    onSubmit({
      title,
      year: Number(year),
      format,
      actors: actorList,
    });

    onClose();
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
          <label>
            Format:
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="DVD">DVD</option>
              <option value="VHS">VHS</option>
              <option value="Blu-ray">Blu-ray</option>
            </select>
          </label>
          <label>
            Actors (comma separated):
            <input value={actors} onChange={(e) => setActors(e.target.value)} />
          </label>
          <div className={s.actions}>
            <button type="submit">Add</button>
            <button type="button" onClick={onClose} className={s.cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
