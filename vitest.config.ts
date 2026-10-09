import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const dirname = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": dirname("./src"),
      "server-only": dirname("./src/test/server-only-stub.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Report-only for now: no thresholds, so a PR is never blocked by coverage.
      exclude: [
        "src/**/*.d.ts",
        "src/db/**",
        "**/*.config.*",
        "vitest.setup.ts",
      ],
    },
  },
});
