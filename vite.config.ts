import react from "@vitejs/plugin-react";
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            generateScopedName: "[name]__[local]__[hash:base64:5]",
        },
    },
    test: {
        environment: "happy-dom",
        setupFiles: ["./setupVitest.js"],
        coverage: {
            reportsDirectory: "../coverage",
            exclude: [
                ...configDefaults.exclude,
                "*/**.d.ts",
                "*/**.test.ts",
                "*/**.test.tsx",
                "./src/typings/**",
                "./src/main.tsx",
            ],
        },
    },
});
