import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import RecipeGrid from "./components/RecipeGrid.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import AddRecipeForm from "./components/AddRecipeForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CuisineFilter from "./components/CuisineFilter.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { fetchRecipes, createRecipe, deleteRecipe } from "./api/recipes.js";

function App() {
  // Week 4: recipes now come from MongoDB via the API — no more hardcoded import.
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Full cuisine list for the filter dropdown, captured once from the
  // unfiltered list so the options don't shrink as the user filters.
  const [cuisines, setCuisines] = useState([]);

  const [activeView, setActiveView] = useState("Browse Recipes");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [stats, setStats] = useState({ total: 0, avgCookTime: 0 });

  // Load the full recipe list once, on mount, to populate the cuisine dropdown.
  useEffect(() => {
    fetchRecipes()
      .then((data) => {
        const uniqueCuisines = [...new Set(data.map((r) => r.cuisine))].sort();
        setCuisines(uniqueCuisines);
      })
      .catch((err) => console.error("Failed to load cuisines:", err));
  }, []);

  // Re-fetch from the backend whenever the search term or cuisine filter
  // changes (debounced so we don't fire a request on every keystroke).
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      fetchRecipes({
        search: query || undefined,
        cuisine: cuisineFilter || undefined,
      })
        .then(setRecipes)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, cuisineFilter]);

  // useEffect: recompute total count + average cook time whenever the
  // (filtered) recipes list changes.
  useEffect(() => {
    const total = recipes.length;
    const avgCookTime = total
      ? Math.round(recipes.reduce((sum, r) => sum + r.cookTime, 0) / total)
      : 0;
    setStats({ total, avgCookTime });
  }, [recipes]);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const created = await createRecipe(newRecipe);
      setRecipes((prev) => [created, ...prev]);
      setCuisines((prev) =>
        prev.includes(created.cuisine)
          ? prev
          : [...prev, created.cuisine].sort(),
      );
      setActiveView("Browse Recipes");
    } catch (err) {
      alert(`Failed to save recipe: ${err.message}`);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      setSelectedRecipe((prev) => (prev?._id === id ? null : prev));
    } catch (err) {
      alert(`Failed to delete recipe: ${err.message}`);
    }
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

                <div className="flex flex-wrap gap-3 px-6 pt-6">
                  <SearchBar value={query} onChange={setQuery} />
                  <CuisineFilter
                    cuisines={cuisines}
                    value={cuisineFilter}
                    onChange={setCuisineFilter}
                  />
                </div>

                {error && (
                  <p className="text-center text-red-600 py-6">
                    Couldn't reach the API: {error}
                  </p>
                )}

                {loading && !error ? (
                  <p className="text-center text-gray-500 py-12">
                    Loading recipes...
                  </p>
                ) : (
                  <RecipeGrid
                    recipes={recipes}
                    onCardClick={setSelectedRecipe}
                    onDelete={handleDeleteRecipe}
                  />
                )}
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
