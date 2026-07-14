import { useState } from "react";

const emptyForm = {
  title: "",
  cuisine: "",
  cookTime: "",
  difficulty: "Easy",
};

// Form for creating a new recipe. Ingredients and steps are dynamic lists:
// the user can add/remove as many rows as they need before submitting.
// On submit, calls `onAddRecipe(recipe)` so App.jsx can push it into state.
function AddRecipeForm({ onAddRecipe }) {
  const [form, setForm] = useState(emptyForm);
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // --- Ingredients: dynamic add/update/remove ---
  const updateIngredient = (index, value) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === index ? value : item)),
    );
  };
  const addIngredientField = () => setIngredients((prev) => [...prev, ""]);
  const removeIngredientField = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Steps: dynamic add/update/remove ---
  const updateStep = (index, value) => {
    setSteps((prev) => prev.map((item, i) => (i === index ? value : item)));
  };
  const addStepField = () => setSteps((prev) => [...prev, ""]);
  const removeStepField = (index) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.cuisine.trim() || !form.cookTime) {
      alert("Please fill in title, cuisine, and cook time.");
      return;
    }

    const newRecipe = {
      title: form.title.trim(),
      cuisine: form.cuisine.trim(),
      cookTime: Number(form.cookTime),
      difficulty: form.difficulty,
      image: null,
      ingredients: ingredients.map((i) => i.trim()).filter(Boolean),
      steps: steps.map((s) => s.trim()).filter(Boolean),
    };

    onAddRecipe(newRecipe);

    // Reset the form
    setForm(emptyForm);
    setIngredients([""]);
    setSteps([""]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 my-6 flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold text-gray-900">Add a New Recipe</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Cuisine</label>
          <input
            type="text"
            value={form.cuisine}
            onChange={(e) => handleFieldChange("cuisine", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Cook Time (minutes)
          </label>
          <input
            type="number"
            min="1"
            value={form.cookTime}
            onChange={(e) => handleFieldChange("cookTime", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            value={form.difficulty}
            onChange={(e) => handleFieldChange("difficulty", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>

      {/* Dynamic ingredients list */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
                className="text-red-600 hover:text-red-800 px-2 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredientField}
          className="self-start text-sm text-green-800 hover:text-green-900 font-medium"
        >
          + Add ingredient
        </button>
      </div>

      {/* Dynamic steps list */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Steps</label>
        {steps.map((step, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              rows={2}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            {steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStepField(index)}
                className="text-red-600 hover:text-red-800 px-2 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addStepField}
          className="self-start text-sm text-green-800 hover:text-green-900 font-medium"
        >
          + Add step
        </button>
      </div>

      <button
        type="submit"
        className="mt-2 bg-green-800 hover:bg-green-700 text-white rounded-md px-4 py-2 font-medium"
      >
        Save Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
