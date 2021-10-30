const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
config = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
  },

  headers: async () => [
    {
      source: "/:page*",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "noindex",
        },
      ],
    },
    {
      source: "/",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "all",
        },
      ],
    },
  ],
};

module.exports = withPlaiceholder(config);
