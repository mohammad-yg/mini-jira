import architecture from "./architecture-eslint-plugin.mjs";
import tsParser from "@typescript-eslint/parser";

const architectureConfig = [
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    plugins: { architecture },
    rules: {
      "architecture/explicit-module-exports": "error",
      "architecture/module-boundaries": "error",
      "architecture/client-server-boundary": "error",
    },
  },
];

export default architectureConfig;
