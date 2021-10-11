/* eslint-disable import/no-commonjs -- exception for ESLint configuration file. */
/* eslint-disable import/unambiguous -- exception for ESLint configuration file. */

module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["@ziyadedher"],
  rules: {
    "react/destructuring-assignment": ["error", "always"],
    "react/require-default-props": ["off"],
    "node/no-unpublished-import": ["off"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
      },
    },
    node: {
      tryExtensions: [".json", ".js", ".jsx", ".ts", ".tsx", ".d.ts", ".d.ts"],
    },
    react: {
      version: "detect",
    },
  },
};
