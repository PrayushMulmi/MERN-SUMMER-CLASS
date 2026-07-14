import Recipe from "../models/Recipe.js";

// GET /api/ingredients — de-duplicated ingredient list across all recipes,
// for populating a "select what you have" UI.
export async function getAllIngredients(req, res) {
  try {
    const recipes = await Recipe.find({}, "ingredients");
    const unique = [...new Set(recipes.flatMap((r) => r.ingredients))].sort();
    res.status(200).json(unique);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
