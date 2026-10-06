import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(import.meta.dirname, "src/app"),
      widgets: path.resolve(import.meta.dirname, "src/widgets"),
      features: path.resolve(import.meta.dirname, "src/features"),
      entities: path.resolve(import.meta.dirname, "src/entities"),
      shared: path.resolve(import.meta.dirname, "src/shared"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/__tests__/**",
        "src/tests/**",
        "src/**/*.d.ts",
        "src/app/index.tsx",
      ],
    },
  },
});
