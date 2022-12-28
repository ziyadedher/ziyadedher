import type { BlogPostMetadata } from "../../../components/blog";

const METADATA: BlogPostMetadata = {
  url: "/blog/security.txt",
  title: "State of the Security.txt",
  description:
    "We have RFC9116, where is the security.txt? An analysis and overview of our experience deploying it to a site with millions of daily active users.",
  publishedAt: new Date(2022, 8, 5), // 2022-09-05
};

export default METADATA;
