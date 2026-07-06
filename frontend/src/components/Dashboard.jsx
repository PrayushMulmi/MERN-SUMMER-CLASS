// Simple stats strip. Values are computed in App.jsx (useEffect) and
// passed down as props — this component just renders them.
function Dashboard({ totalRecipes, averageCookTime }) {
  return (
    <div className="mx-6 mt-6 flex flex-wrap gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-3 flex-1 min-w-40">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Total Recipes
        </p>
        <p className="text-2xl font-bold text-gray-900">{totalRecipes}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-3 flex-1 min-w-40">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Average Cook Time
        </p>
        <p className="text-2xl font-bold text-gray-900">
          {averageCookTime} min
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
