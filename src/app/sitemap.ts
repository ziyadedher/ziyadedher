import { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://ziyadedher.com",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
];

export default sitemap;
