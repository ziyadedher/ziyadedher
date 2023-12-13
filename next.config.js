const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const CONFIG = {
  images: {
    domains: ["storage.ziyadedher.com"],
  },

  headers: async () => [],

  redirects: async () => [
    {
      source: "/faces",
      destination: "/hacks/darkarts",
      permanent: true,
    },
  ],
};

module.exports = withPlaiceholder(CONFIG);
