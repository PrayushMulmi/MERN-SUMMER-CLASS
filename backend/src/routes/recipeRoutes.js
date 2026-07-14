import { Router } from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getCuisines,
  matchRecipes,
} from "../controllers/recipeController.js";

const router = Router();

router.get("/cuisines", getCuisines);
router.post("/match", matchRecipes);

router.get("/", getAllRecipes);
router.post("/", createRecipe);

router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
