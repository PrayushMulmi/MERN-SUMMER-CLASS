import axios from "axios";

// Vite exposes env vars prefixed with VITE_ via import.meta.env.
// Falls back to localhost:5000 so things still work with zero setup.
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE_URL });

// GET /api/recipes, optionally filtered by cuisine and/or search term.
// params = { cuisine?: string, search?: string }
export async function fetchRecipes(params = {}) {
  const { data } = await api.get("/recipes", { params });
  return data;
}

// GET /api/recipes/:id
export async function fetchRecipeById(id) {
  const { data } = await api.get(`/recipes/${id}`);
  return data;
}

// POST /api/recipes
export async function createRecipe(recipe) {
  const { data } = await api.post("/recipes", recipe);
  return data;
}

// DELETE /api/recipes/:id
export async function deleteRecipe(id) {
  const { data } = await api.delete(`/recipes/${id}`);
  return data;
}

export default api;
