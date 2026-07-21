import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// Login form. On success, calls `onSuccess` so App.jsx can navigate away.
function Login({ onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 my-6 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-gray-900">Log In</h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 bg-green-800 hover:bg-green-700 disabled:opacity-50 text-white rounded-md px-4 py-2 font-medium"
      >
        {submitting ? "Logging in..." : "Log In"}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-green-800 hover:text-green-900 font-medium"
        >
          Register
        </button>
      </p>
    </form>
  );
}

export default Login;
