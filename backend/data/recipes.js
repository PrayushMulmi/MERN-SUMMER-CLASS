// Run with: npm run seed
// Wipes the recipes collection and reloads it with the same 5 sample
// recipes used in Weeks 1-3, so you have real data to test filtering
// and search against once you're on MongoDB.
import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";
import Recipe from "../src/models/recipe.js";
import User from "../src/models/User.js";
import mongoose from "mongoose";

dotenv.config();

const sampleRecipes = [
  {
    title: "Margherita Pizza",
    cuisine: "Italian",
    cookTime: 25,
    difficulty: "Medium",
    ingredients: [
      "1 pizza dough ball",
      "1/2 cup tomato sauce",
      "150g fresh mozzarella, sliced",
      "Fresh basil leaves",
    ],
    steps: [
      "Preheat oven to 250°C with a pizza stone if available.",
      "Stretch the dough into a 12-inch round.",
      "Spread tomato sauce, add mozzarella, and bake 8-10 minutes.",
      "Top with fresh basil before serving.",
    ],
  },
  {
    title: "Chicken Tikka Masala",
    cuisine: "Indian",
    cookTime: 45,
    difficulty: "Medium",
    ingredients: [
      "500g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tbsp tikka masala spice mix",
      "1 cup tomato puree",
      "1/2 cup heavy cream",
    ],
    steps: [
      "Marinate chicken in yogurt and spices for 1 hour.",
      "Grill chicken until charred; set aside.",
      "Simmer tomato puree with spices for 10 minutes.",
      "Add cream and chicken, simmer 10 more minutes.",
    ],
  },
  {
    title: "Avocado Toast",
    cuisine: "American",
    cookTime: 10,
    difficulty: "Easy",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "1/2 lemon, juiced",
      "Red chili flakes",
    ],
    steps: [
      "Toast the sourdough until golden.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Spread over toast and sprinkle with chili flakes.",
    ],
  },
  {
    title: "Beef Wellington",
    cuisine: "British",
    cookTime: 90,
    difficulty: "Hard",
    ingredients: [
      "800g beef tenderloin",
      "300g mushrooms, finely chopped",
      "6 slices prosciutto",
      "1 sheet puff pastry",
      "2 tbsp Dijon mustard",
    ],
    steps: [
      "Sear beef on all sides, then brush with mustard.",
      "Cook mushrooms down into a dry duxelles.",
      "Wrap beef in prosciutto and duxelles, then puff pastry.",
      "Bake at 200°C for 35-40 minutes; rest before slicing.",
    ],
  },
  {
    title: "Vegetable Stir Fry",
    cuisine: "Chinese",
    cookTime: 20,
    difficulty: "Easy",
    ingredients: [
      "2 cups mixed vegetables",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
    ],
    steps: [
      "Heat oil, add garlic and ginger until fragrant.",
      "Add vegetables, stir-fry 5-7 minutes.",
      "Toss with soy sauce and sesame oil before serving.",
    ],
  },
];

// Week 5: createdBy is now a required User ref. Seeded recipes get
// attributed to this placeholder account (created if it doesn't exist yet)
// instead of the old "anonymous" string.
async function getOrCreateSeedUser() {
  const email = "seed@recipesharing.local";
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name: "Recipe Sharing Team",
      email,
      password: "seed-user-placeholder",
    });
  }
  return user;
}

async function seed() {
  await connectDB();
  const seedUser = await getOrCreateSeedUser();

  await Recipe.deleteMany({});
  await Recipe.insertMany(
    sampleRecipes.map((recipe) => ({ ...recipe, createdBy: seedUser._id })),
  );
  console.log(`Seeded ${sampleRecipes.length} recipes.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed();
