import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import RecipeGrid from "./components/RecipeGrid.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import AddRecipeForm from "./components/AddRecipeForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import initialRecipes from "./data/recipes.js";

function App() {
  // 1. Recipes now live in state, seeded from the Week 1 hardcoded data.
  const [recipes, setRecipes] = useState(initialRecipes);

  // Which nav section is active: "Browse Recipes" | "My Recipes" | "Add Recipe"
  const [activeView, setActiveView] = useState("Browse Recipes");

  // The recipe currently expanded into detail view (null = showing the grid)
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Live search query
  const [query, setQuery] = useState("");

  // Dashboard stats, recomputed whenever the recipes list changes
  const [stats, setStats] = useState({ total: 0, avgCookTime: 0 });

  // 6. useEffect: recompute total count + average cook time whenever
  // the recipes array changes.
  useEffect(() => {
    const total = recipes.length;
    const avgCookTime = total
      ? Math.round(recipes.reduce((sum, r) => sum + r.cookTime, 0) / total)
      : 0;
    setStats({ total, avgCookTime });
  }, [recipes]);

  // 5. Live filter by title (case-insensitive), recalculated on each render
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
    setActiveView("Browse Recipes");
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    // If the deleted recipe was open in detail view, close it.
    setSelectedRecipe((prev) => (prev?.id === id ? null : prev));
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar active={activeView} onNavigate={handleNavigate} />

      <main className="max-w-6xl mx-auto pb-12">
        {activeView === "Browse Recipes" && (
          <>
            {selectedRecipe ? (
              <RecipeDetail
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onDelete={handleDeleteRecipe}
              />
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 px-6 pt-8">
                  Browse Recipes
                </h1>
                <p className="text-gray-500 px-6">
                  Discover dishes you can make with what you have.
                </p>

                <Dashboard
                  totalRecipes={stats.total}
                  averageCookTime={stats.avgCookTime}
                />

                <SearchBar value={query} onChange={setQuery} />

                <RecipeGrid
                  recipes={filteredRecipes}
                  onCardClick={setSelectedRecipe}
                  onDelete={handleDeleteRecipe}
                />
              </>
            )}
          </>
        )}

        {activeView === "My Recipes" && (
          <p className="text-center text-gray-500 py-16">
            "My Recipes" is coming in a future week — this will show recipes
            saved or created by the logged-in user.
          </p>
        )}

        {activeView === "Add Recipe" && (
          <AddRecipeForm onAddRecipe={handleAddRecipe} />
        )}
      </main>
    </div>
  );
}

export default App;
