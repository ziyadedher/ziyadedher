const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
config = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
};

module.exports = withPlaiceholder(config);
