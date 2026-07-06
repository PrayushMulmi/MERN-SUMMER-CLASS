// Controlled search input. App.jsx owns the actual `query` state and
// filters the recipes list live as the user types (no submit button needed).
function SearchBar({ value, onChange }) {
  return (
    <div className="px-6 pt-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes by title..."
        className="w-full sm:w-96 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>
  );
}

export default SearchBar;
