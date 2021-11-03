import "tailwindcss/tailwind.css";

export const parameters = {
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
