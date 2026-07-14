import { Router } from "express";
import { getAllIngredients } from "../controllers/ingredientController.js";

const router = Router();
router.get("/", getAllIngredients);

export default router;
