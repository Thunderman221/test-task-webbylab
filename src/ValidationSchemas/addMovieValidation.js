import * as Yup from "yup";

export const movieValidationSchema = Yup.object().shape({
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
