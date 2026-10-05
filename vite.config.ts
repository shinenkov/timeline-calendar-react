import { defineConfig, esmExternalRequirePlugin } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      include: ["src/**/*.ts", "src/**/*.tsx"],
    }),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      app: path.resolve(import.meta.dirname, "src/app"),
      widgets: path.resolve(import.meta.dirname, "src/widgets"),
      features: path.resolve(import.meta.dirname, "src/features"),
      entities: path.resolve(import.meta.dirname, "src/entities"),
      shared: path.resolve(import.meta.dirname, "src/shared"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/app/index.tsx"),
      name: "timeline-calendar-react",
      formats: ["es", "umd"],
      fileName: (format) => `timeline-calendar-react.${format}.js`,
    },
    rolldownOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
        },
      },
      plugins: [
        esmExternalRequirePlugin({
          external: ["react", "react-dom", "react/jsx-runtime"],
          skipDuplicateCheck: true,
        }),
      ],
    },
  },
});
