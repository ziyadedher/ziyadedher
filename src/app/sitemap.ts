import { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://ziyadedher.com",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: "https://ziyadedher.com/blog",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: "https://ziyadedher.com/hacks",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
];

export default sitemap;
