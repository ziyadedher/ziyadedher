module.exports = {
  stories: ["../stories", "../src"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {
    docsPage: "off",
  },
};
