/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    css: true,
    coverage: {
      reporter: ["text", "lcov"],
      thresholds:{
        global: {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85,
        },
      }
    },
  },
});