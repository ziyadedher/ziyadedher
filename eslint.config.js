/* eslint-disable */

import tseslint from "typescript-eslint";
import * as importPlugin from "eslint-plugin-import";
import nextPlugin from "@next/eslint-plugin-next";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import eslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  reactHooksPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  importPlugin.flatConfigs.typescript,
  nextPlugin.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  { ignores: [".next/**", "public/**"] },
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
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-relative-packages": "error",
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
