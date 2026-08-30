import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// Separate from vite.config.ts on purpose: the tests exercise pure logic and read
// Search.vue's component options directly, so they need the SFC compiler and the "@"
// alias but not vite-plugin-vuetify (which only matters for auto-importing components
// into a rendered app).
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/tests/**/*.spec.ts"],
  },
});
