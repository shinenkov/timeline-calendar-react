import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import path from "path";
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

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
      app: "/src/app",
      entities: '/src/entities',
      features: '/src/features',
      hooks: '/src/hooks',
      shared: '/src/shared',
      utils: '/src/utils',
      widgets: '/src/widgets',
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/app/index.tsx"),
      name: "timeline-calendar-react",
      formats: ["es", "umd"],
      fileName: (format) => `timeline-calendar-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  }
});