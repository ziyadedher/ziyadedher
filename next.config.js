const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder(
  /** @type {import('next').NextConfig} */
  {
    reactStrictMode: true,
    images: {
      domains: ["storage.googleapis.com"],
    },
  }
);
