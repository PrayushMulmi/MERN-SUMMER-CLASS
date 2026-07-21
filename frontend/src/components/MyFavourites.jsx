import { useEffect, useState } from "react";
import RecipeGrid from "./RecipeGrid.jsx";
import { fetchMyFavourites } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

// Fetches the logged-in user's favourited recipes once, then renders
// whichever of them are still in `user.favourites` — so un-favouriting a
// card (here or anywhere else) makes it disappear immediately without a
// manual refetch, since that context state drives the filter.
function MyFavourites({ onCardClick }) {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMyFavourites()
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const favouriteIds = new Set(user?.favourites || []);
  const visibleRecipes = recipes.filter((r) => favouriteIds.has(r._id));

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 px-6 pt-8">
        My Favourites
      </h1>
      <p className="text-gray-500 px-6">
        Recipes you've saved for later.
      </p>

      {error && (
        <p className="text-center text-red-600 py-6">
          Couldn't reach the API: {error}
        </p>
      )}

      {loading && !error ? (
        <p className="text-center text-gray-500 py-12">
          Loading favourites...
        </p>
      ) : !error && visibleRecipes.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          You haven't favourited any recipes yet. Browse recipes and tap the
          ♡ on a card to save it here.
        </p>
      ) : (
        <RecipeGrid recipes={visibleRecipes} onCardClick={onCardClick} />
      )}
    </>
  );
}

export default MyFavourites;
