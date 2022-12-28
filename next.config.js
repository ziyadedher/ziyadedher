/* eslint-disable import/no-commonjs -- exception for configuration files. */
/* eslint-disable import/unambiguous -- exception for configuration files. */

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- exception for configuration files.
const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const CONFIG = {
  reactStrictMode: true,

  images: {
    domains: ["storage.ziyadedher.com"],
  },

  experimental: {
    appDir: true,
  },

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/require-await -- exception for Next.js headers.
  headers: async () => [],

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/require-await -- exception for Next.js redirects.
  redirects: async () => [
    {
      source: "/faces",
      destination: "/hacks/darkarts",
      permanent: true,
    },
  ],
};

module.exports = withPlaiceholder(CONFIG);
