export const apiURL =
  window.ENV?.API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/v1";

export const apiKey =
  window.ENV?.API_KEY || import.meta.env.VITE_API_KEY || "your-default-api-key";
