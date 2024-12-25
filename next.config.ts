import type { NextConfig } from "next";

const NEXT_CONFIG: NextConfig = {
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
