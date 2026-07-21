import { createContext, useCallback, useContext, useState } from "react";
import {
  loginUser,
  registerUser,
  toggleFavourite as toggleFavouriteApi,
} from "../api/auth.js";

const AuthContext = createContext(null);

function loadStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Holds the logged-in user + JWT, persisted to localStorage so a refresh
// doesn't log the user out. The axios instance in api/recipes.js reads the
// token straight from localStorage, so this context doesn't need to touch it.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);

  const persist = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = useCallback(async (email, password) => {
    const data = await loginUser({ email, password });
    persist(data);
    return data.user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    persist(data);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const toggleFavourite = useCallback(async (recipeId) => {
    const { favourites } = await toggleFavouriteApi(recipeId);
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, favourites };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
    return favourites;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, toggleFavourite }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider, standard context pattern
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
