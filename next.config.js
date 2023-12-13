/** @type {import('next').NextConfig} */
const NEXT_CONFIG = {
  images: {
    remotePatterns: [{ hostname: "storage.ziyadedher.com" }],
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

module.exports = NEXT_CONFIG;
