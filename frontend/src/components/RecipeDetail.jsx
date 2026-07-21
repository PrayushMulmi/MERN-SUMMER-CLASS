import DifficultyBadge from "./DifficultyBadge.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// Full-detail view for a single recipe, shown when a RecipeCard is clicked.
// `onClose` collapses back to the grid; `onDelete` removes it from state.
// Week 5 adds a favourite toggle, the author's name, and only shows the
// delete button to the recipe's owner (the backend enforces this too).
function RecipeDetail({ recipe, onClose, onDelete }) {
  const { title, cuisine, cookTime, difficulty, ingredients, steps, createdBy } =
    recipe;
  const { user, toggleFavourite } = useAuth();

  const isFavourited = Boolean(user?.favourites?.includes(recipe._id));
  const isOwner = Boolean(user && createdBy?._id === user._id);

  const handleFavouriteClick = () => {
    toggleFavourite(recipe._id).catch((err) =>
      alert(`Failed to update favourite: ${err.message}`),
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 my-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500">{cuisine}</p>
          {createdBy?.name && (
            <p className="text-xs text-gray-400 mt-1">by {createdBy.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={difficulty} />
          {user && (
            <button
              onClick={handleFavouriteClick}
              aria-label={
                isFavourited ? "Remove from favourites" : "Add to favourites"
              }
              className="h-9 w-9 rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-lg text-red-500 hover:scale-110 transition-transform"
            >
              {isFavourited ? "♥" : "♡"}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
        <span>⏱ {cookTime} min</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {ingredients?.length ? (
              ingredients.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li className="text-gray-400 italic">No ingredients listed.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Steps</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            {steps?.length ? (
              steps.map((step, i) => <li key={i}>{step}</li>)
            ) : (
              <li className="text-gray-400 italic">No steps listed.</li>
            )}
          </ol>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
        >
          ← Back to recipes
        </button>

        {isOwner && (
          <button
            onClick={() => onDelete(recipe._id)}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm font-medium"
          >
            Delete Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
