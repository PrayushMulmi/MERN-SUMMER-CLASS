import { useAuth } from "../context/AuthContext.jsx";

// Top navigation bar with the primary sections of the app.
// `active` + `onNavigate` let App.jsx (Week 2) control which view is shown;
// they're optional so the Navbar also works standalone in Week 1.
const links = ["Browse Recipes", "My Recipes", "Add Recipe"];

function navButtonClasses(isActive) {
  return `px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
    isActive
      ? "bg-white text-green-900"
      : "text-amber-200 hover:text-white hover:bg-green-800"
  }`;
}

function Navbar({ active = "Browse Recipes", onNavigate = () => {} }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-green-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <span className="text-2xl font-bold tracking-tight">
          🍳 Recipe Sharing
        </span>

        <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => onNavigate(link)}
                className={navButtonClasses(active === link)}
              >
                {link}
              </button>
            </li>
          ))}

          {user && (
            <li>
              <button
                onClick={() => onNavigate("My Favourites")}
                className={navButtonClasses(active === "My Favourites")}
              >
                ♥ My Favourites
              </button>
            </li>
          )}

          {user ? (
            <>
              <li className="text-sm text-amber-100 px-2 hidden sm:block">
                Hi, {user.name}
              </li>
              <li>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm sm:text-base font-medium text-amber-200 hover:text-white hover:bg-green-800"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => onNavigate("Login")}
                  className={navButtonClasses(active === "Login")}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("Register")}
                  className={navButtonClasses(active === "Register")}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
