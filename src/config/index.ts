export const API_URL = import.meta.env.VITE_API;
if (!API_URL) {
  throw new Error("Missing env variables");
}
