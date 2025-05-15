export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.MODE === "development" ? "http://localhost:4000" : "");
