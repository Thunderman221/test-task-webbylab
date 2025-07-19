import { Field, ErrorMessage } from "formik";
import s from "../AddMovieModal/AddMovieModal.module.css";

const FormField = ({ label, name, type = "text", as, ...props }) => (
  <div className={s.formGroup}>
    <label htmlFor={name} className={s.label}>
      {label}
    </label>
    <Field
      type={type}
      name={name}
      id={name}
      className={as === "select" ? s.select : s.input}
      as={as}
      {...props}
    />
    <ErrorMessage name={name} component="div" className={s.error} />
  </div>
);

export default FormField;
