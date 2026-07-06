import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import React from "react"; // 1. import tailwind
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. tailwindcss plugin
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
