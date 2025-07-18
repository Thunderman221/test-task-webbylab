import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./AddMovieModal.module.css";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .test(
      "no-whitespace",
      "Title cannot be only whitespace",
      (value) => value.trim().length > 0
    ),
  year: Yup.number()
    .required("Year is required")
    .min(1896, "Year must be 1896 or later")
    .max(2024, "Year must be 2024 or earlier")
    .integer("Year must be an integer"),
  format: Yup.string().required("Format is required"),
  actors: Yup.string()
    .required("At least one actor is required")
    .test(
      "valid-actors",
      "Must provide at least one actor name",
      (value) => value.split(",").filter((name) => name.trim()).length > 0
    )
    .matches(
      /^[a-zA-Z\s\-.',`]+$/,
      "Only letters, spaces, and special characters (- ` ') are allowed"
    )
    .test(
      "valid-names",
      "Each actor name must contain at least one letter",
      (value) => value.split(",").every((name) => /[a-zA-Z]/.test(name.trim()))
    ),
});

const AddMovieModal = ({ onClose, onSubmit }) => {
  const movies = useSelector((state) => state.movies.movies);

  const handleFormSubmit = (values, { setSubmitting }) => {
    const movieExists = movies.some(
      (movie) => movie.title.toLowerCase() === values.title.toLowerCase()
    );

    if (movieExists) {
      alert("A movie with this title already exists!");
      setSubmitting(false);
      return;
    }

    const actorList = values.actors
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name);

    onSubmit({
      title: values.title.trim(),
      year: Number(values.year),
      format: values.format,
      actors: actorList,
    });

    onClose();
    setSubmitting(false);
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h2 className={s.title}>Add Movie</h2>
        <Formik
          initialValues={{
            title: "",
            year: "",
            format: "DVD",
            actors: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <div className={s.formGroup}>
                <label htmlFor="title" className={s.label}>
                  Title:
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className={s.input}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="year" className={s.label}>
                  Year:
                </label>
                <Field
                  type="number"
                  name="year"
                  id="year"
                  className={s.input}
                />
                <ErrorMessage name="year" component="div" className={s.error} />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="format" className={s.label}>
                  Format:
                </label>
                <Field
                  as="select"
                  name="format"
                  id="format"
                  className={s.select}
                >
                  <option value="DVD">DVD</option>
                  <option value="VHS">VHS</option>
                  <option value="Blu-Ray">Blu-Ray</option>
                </Field>
                <ErrorMessage
                  name="format"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="actors" className={s.label}>
                  Actors (comma separated):
                </label>
                <Field
                  type="text"
                  name="actors"
                  id="actors"
                  className={s.input}
                  placeholder="e.g. Tom Hanks, Tim Allen"
                />
                <ErrorMessage
                  name="actors"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.actions}>
                <button type="submit" className={s.add} disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={s.cancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddMovieModal;
