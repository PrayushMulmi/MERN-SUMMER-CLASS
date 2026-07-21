import DifficultyBadge from "./DifficultyBadge.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// Displays a single recipe: image placeholder, title, cuisine,
// cook time, and a difficulty badge.
// Week 2 adds onClick (expand to detail) and onDelete (remove from state).
// Week 5 adds a favourite toggle and the author's name; the delete button
// is only shown to the recipe's owner, since the backend now enforces that.
function RecipeCard({ recipe, onClick, onDelete }) {
  const { title, cuisine, cookTime, difficulty, image, createdBy } = recipe;
  const { user, toggleFavourite } = useAuth();

  const isFavourited = Boolean(user?.favourites?.includes(recipe._id));
  const isOwner = Boolean(user && createdBy?._id === user._id);

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    toggleFavourite(recipe._id).catch((err) =>
      alert(`Failed to update favourite: ${err.message}`),
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col"
    >
      <div className="relative h-40 bg-gray-200 flex items-center justify-center text-gray-400">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm">Image placeholder</span>
        )}

        {user && (
          <button
            onClick={handleFavouriteClick}
            aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 shadow flex items-center justify-center text-lg text-red-500 hover:scale-110 transition-transform"
          >
            {isFavourited ? "♥" : "♡"}
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        <p className="text-sm text-gray-500">{cuisine}</p>
        {createdBy?.name && (
          <p className="text-xs text-gray-400">by {createdBy.name}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            ⏱ {cookTime} min
          </span>

          {onDelete && isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(recipe._id);
              }}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
