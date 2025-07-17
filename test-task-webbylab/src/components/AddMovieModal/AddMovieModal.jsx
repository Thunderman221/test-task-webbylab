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
        <h2 className={s.title}>Add Movie</h2>
        <form onSubmit={handleSubmit} className={s.form}>
          <label className={s.label}>
            Title:
            <input
              className={s.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className={s.label}>
            Year:
            <input
              className={s.input}
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
          <label className={s.label}>
            Format:
            <select
              className={s.select}
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="DVD">DVD</option>
              <option value="VHS">VHS</option>
              <option value="Blu-Ray">Blu-Ray</option>
            </select>
          </label>
          <label className={s.label}>
            Actors (comma separated):
            <input
              className={s.input}
              value={actors}
              onChange={(e) => setActors(e.target.value)}
            />
          </label>
          <div className={s.actions}>
            <button type="submit" className={s.add}>
              Add
            </button>
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
