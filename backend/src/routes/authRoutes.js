import { Router } from "express";
import { register, login, getMyFavourites } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me/favourites", requireAuth, getMyFavourites);

export default router;
