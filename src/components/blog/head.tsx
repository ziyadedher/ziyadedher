import React from "react";

import type { ImageWithBlur } from "../../logic/image_with_blur";
import type BlogPostMetadata from "./metadata";

interface BlogPostHeadProps {
  readonly metadata: BlogPostMetadata;
  readonly coverImage: ImageWithBlur & { alt: string };
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Date
const BlogPostHead: React.FunctionComponent<BlogPostHeadProps> = ({
  metadata: { title, description, url, publishedAt, modifiedAt = publishedAt },
  coverImage,
}: BlogPostHeadProps) => (
  <>
    <title>{`${title} | Ziyad Edher | Blog`}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | Ziyad Edher | Blog`} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={`https://ziyadedher.com${url}`} />
    <meta property="og:image" content={coverImage.url} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Ziyad's Blog" />
    <meta
      property="article:published_time"
      content={publishedAt.toISOString()}
    />
    <meta property="article:modified_time" content={modifiedAt.toISOString()} />
    <meta property="twitter:card" content="summary" />
    <meta name="twitter:image:alt" content={coverImage.alt} />
  </>
);

export default BlogPostHead;
