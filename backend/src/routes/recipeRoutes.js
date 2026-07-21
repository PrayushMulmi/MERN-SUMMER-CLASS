import { Router } from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getCuisines,
  matchRecipes,
  toggleFavourite,
  getMyRecipes,
} from "../controllers/recipeController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
// import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/cuisines", getCuisines);
router.post("/match", matchRecipes);
router.get("/mine", requireAuth, getMyRecipes);

router.get("/", getAllRecipes);
router.post("/", requireAuth, createRecipe);

router.get("/:id", getRecipeById);
router.put("/:id", requireAuth, updateRecipe);
router.delete("/:id", requireAuth, deleteRecipe);
router.post("/:id/favourite", requireAuth, toggleFavourite);

export default router;
