// Small colored badge that reflects a recipe's difficulty level.
// Easy -> green | Medium -> amber | Hard -> red
const styles = {
  Easy: "bg-green-100 text-green-800 border border-green-300",
  Medium: "bg-amber-100 text-amber-800 border border-amber-300",
  Hard: "bg-red-100 text-red-800 border border-red-300",
};

function DifficultyBadge({ difficulty }) {
  const classes =
    styles[difficulty] || "bg-gray-100 text-gray-800 border border-gray-300";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${classes}`}
    >
      {difficulty}
    </span>
  );
}

export default DifficultyBadge;
