// Simple <select> for filtering by cuisine. `cuisines` is the list of
// distinct values to offer; App.jsx derives it from the full recipe list.
function CuisineFilter({ cuisines, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
    >
      <option value="">All cuisines</option>
      {cuisines.map((cuisine) => (
        <option key={cuisine} value={cuisine}>
          {cuisine}
        </option>
      ))}
    </select>
  );
}

export default CuisineFilter;
