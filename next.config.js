/* eslint-disable import/no-commonjs -- exception for configuration files. */
/* eslint-disable import/unambiguous -- exception for configuration files. */

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- exception for configuration files.
const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const CONFIG = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["storage.ziyadedher.com"],
  },
  experimental: {},

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/require-await -- exception for Next.js headers.
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
    {
      source: "/hacks/log4shell",
      headers: [
        {
          key: "X-Robots-Tag",
          value: "all",
        },
      ],
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- exception for configuration files.
module.exports = withPlaiceholder(CONFIG);
