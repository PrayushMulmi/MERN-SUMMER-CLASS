import Recipe from "../models/recipe.js";
import User from "../models/User.js";

// GET /api/recipes
// GET /api/recipes?cuisine=Italian
// GET /api/recipes?search=pasta
export async function getAllRecipes(req, res) {
  try {
    const { cuisine, search } = req.query;
    const filter = {};

    // Week 4: filter by cuisine (exact match, case-insensitive)
    if (cuisine) {
      filter.cuisine = { $regex: `^${cuisine}$`, $options: "i" };
    }

    // Week 4: full-text search by title (uses the text index on the schema)
    if (search) {
      filter.$text = { $search: search };
    }

    const recipes = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/recipes/:id
export async function getRecipeById(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name",
    );
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    // Malformed ObjectId also lands here
    res.status(400).json({ message: "Invalid recipe id" });
  }
}

// POST /api/recipes
export async function createRecipe(req, res) {
  try {
    const { title, cuisine, cookTime, difficulty, ingredients, steps } =
      req.body;

    if (!title || !cuisine || !cookTime || !difficulty) {
      return res.status(400).json({
        message: "title, cuisine, cookTime, and difficulty are required",
      });
    }

    const recipe = await Recipe.create({
      title,
      cuisine,
      cookTime,
      difficulty,
      ingredients: ingredients || [],
      steps: steps || [],
      createdBy: req.user.id,
    });

    const populated = await recipe.populate("createdBy", "name");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE /api/recipes/:id
export async function deleteRecipe(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own recipes" });
    }

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid recipe id" });
  }
}

// GET /api/recipes/cuisines
export async function getCuisines(req, res) {
  try {
    const cuisines = await Recipe.distinct("cuisine");
    res.status(200).json(cuisines.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /api/recipes/match  Body: { ingredients: string[], mode?: "any" | "all" }
// "any" (default): recipes matching at least one selected ingredient.
// "all": recipes fully coverable by the selected ingredients.
export async function matchRecipes(req, res) {
  try {
    const { ingredients, mode = "any" } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: "Provide a non-empty 'ingredients' array" });
    }

    const selected = ingredients.map((i) => String(i).toLowerCase().trim());
    const allRecipes = await Recipe.find().populate("createdBy", "name");

    const scored = allRecipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) => i.toLowerCase());
      const matchedCount = selected.filter((sel) =>
        recipeIngredients.some((ri) => ri.includes(sel)),
      ).length;
      return { recipe, matchedCount };
    });

    const filtered = scored.filter(({ matchedCount }) =>
      mode === "all" ? matchedCount === selected.length : matchedCount > 0,
    );
    filtered.sort((a, b) => b.matchedCount - a.matchedCount);

    res.status(200).json(
      filtered.map(({ recipe, matchedCount }) => ({
        ...recipe.toObject(),
        matchedIngredientCount: matchedCount,
      })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT /api/recipes/:id
export async function updateRecipe(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own recipes" });
    }

    // createdBy is derived from the token, not client input — never let it
    // be overwritten via the request body.
    const { createdBy, ...updates } = req.body;
    Object.assign(recipe, updates);
    await recipe.save();
    await recipe.populate("createdBy", "name");

    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// POST /api/recipes/:id/favourite — protected. Toggles the recipe in
// req.user's favourites list; returns the updated favourites array.
export async function toggleFavourite(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await User.findById(req.user.id);
    const index = user.favourites.findIndex(
      (favId) => favId.toString() === req.params.id,
    );

    if (index === -1) {
      user.favourites.push(req.params.id);
    } else {
      user.favourites.splice(index, 1);
    }

    await user.save();
    res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET /api/recipes/mine — protected, returns only recipes created by the logged-in user
export async function getMyRecipes(req, res) {
  try {
    const recipes = await Recipe.find({ createdBy: req.user.id })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
