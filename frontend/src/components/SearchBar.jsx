// Controlled search input. App.jsx owns the actual `value` state and
// (Week 4) sends it to the backend as a ?search= query param.
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search recipes by title..."
      className="w-full sm:w-96 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
    />
  );
}

export default SearchBar;
