import "tailwindcss/tailwind.css";

import { addDecorator } from "@storybook/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

addDecorator((Story) => (
  <MemoryRouterProvider>
    <Story />
  </MemoryRouterProvider>
));

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
