import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import s from "./AddMovieModal.module.css";
import FormField from "../FormField/FormField";
import { movieValidationSchema } from "../../ValidationSchemas/addMovieValidation";

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
          initialValues={{ title: "", year: "", format: "DVD", actors: "" }}
          validationSchema={movieValidationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <FormField name="title" label="Title:" />
              <FormField name="year" label="Year:" type="number" />
              <FormField name="format" label="Format:" as="select">
                <option value="DVD">DVD</option>
                <option value="VHS">VHS</option>
                <option value="Blu-Ray">Blu-Ray</option>
              </FormField>
              <FormField
                name="actors"
                label="Actors (comma separated):"
                placeholder="e.g. Tom Hanks, Tim Allen"
              />

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
