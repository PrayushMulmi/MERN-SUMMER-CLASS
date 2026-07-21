import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true, trim: true },
    cookTime: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    ingredients: { type: [String], default: [] },
    steps: { type: [String], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Text index on title (weighted higher) and cuisine so
// GET /api/recipes?search=pasta can do a fast full-text search.
recipeSchema.index(
  { title: "text", cuisine: "text" },
  { weights: { title: 5, cuisine: 1 } },
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
