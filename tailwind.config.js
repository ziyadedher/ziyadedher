/* eslint-disable import/no-commonjs -- exception for configuration files. */
/* eslint-disable import/unambiguous -- exception for configuration files. */

module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
    "./tests/**/*.{ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  // eslint-disable-next-line node/global-require, node/no-unpublished-require, @typescript-eslint/no-require-imports -- exception for configuration files.
  plugins: [require("@tailwindcss/typography")],
};
