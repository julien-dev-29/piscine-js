import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    include: ["src/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
