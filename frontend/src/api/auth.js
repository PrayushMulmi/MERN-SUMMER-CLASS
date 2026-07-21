import api from "./recipes.js";

// POST /api/auth/register  -> { token, user }
export async function registerUser({ name, email, password }) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}

// POST /api/auth/login  -> { token, user }
export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

// GET /api/auth/me/favourites  -> populated Recipe[]
export async function fetchMyFavourites() {
  const { data } = await api.get("/auth/me/favourites");
  return data;
}

// POST /api/recipes/:id/favourite  -> { favourites: string[] }
export async function toggleFavourite(recipeId) {
  const { data } = await api.post(`/recipes/${recipeId}/favourite`);
  return data;
}
