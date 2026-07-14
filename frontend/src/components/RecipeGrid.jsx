import RecipeCard from "./RecipeCard.jsx";

// Week 2: now a controlled/presentational component — recipes, click,
// and delete handling all come from App.jsx's state.
function RecipeGrid({ recipes, onCardClick, onDelete }) {
  if (recipes.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No recipes match your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onClick={() => onCardClick(recipe)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;
