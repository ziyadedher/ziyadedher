import tseslint from "typescript-eslint";
import * as importPlugin from "eslint-plugin-import";
import nextPlugin from "@next/eslint-plugin-next";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import eslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  importPlugin.flatConfigs.typescript,
  new FlatCompat().config(nextPlugin.configs.recommended),
  new FlatCompat().config(nextPlugin.configs["core-web-vitals"]),
  // prettierPluginRecommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      "import/order": "error",
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
    },
  },
]);
