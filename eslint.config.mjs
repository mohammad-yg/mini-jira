// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import architecture from "./scripts/architecture-eslint-plugin.mjs";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: { architecture },
    rules: {
      "architecture/explicit-module-exports": "error",
      "architecture/module-boundaries": "error",
      "architecture/client-server-boundary": "error",
    },
  },
  prettierRecommended,
]);

export default eslintConfig;
