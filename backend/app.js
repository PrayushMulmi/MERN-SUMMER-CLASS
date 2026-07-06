import express from "express";

import recipes from "./data/recipes.js";

const app = express();

const PORT = 3000;

app.get("/recipes", (req, res) => {
  return res.json(recipes);
});

app.post("/recipes", (req, res) => {
  const recipe = req.body;

  recipes.push(recipe);

  return res.status(201).json({ message: "Recipe added to the database." });
});

app.listen(PORT, () => {
  console.log(`Backend running on port: ${PORT}`);
});
