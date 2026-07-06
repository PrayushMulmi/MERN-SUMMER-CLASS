// Top navigation bar with the three primary sections of the app.
// `active` + `onNavigate` let App.jsx (Week 2) control which view is shown;
// they're optional so the Navbar also works standalone in Week 1.
const links = ["Browse Recipes", "My Recipes", "Add Recipe"];

function Navbar({ active = "Browse Recipes", onNavigate = () => {} }) {
  return (
    <header className="bg-green-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold tracking-tight">
          🍳 Recipe Sharing
        </span>

        <ul className="flex gap-2 sm:gap-6">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => onNavigate(link)}
                className={`px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
                  active === link
                    ? "bg-white text-green-900"
                    : "text-amber-200 hover:text-white hover:bg-green-800"
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
