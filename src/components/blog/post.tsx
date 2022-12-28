import React from "react";

// eslint-disable-next-line @typescript-eslint/no-shadow -- Image
import Image from "../image";

import type { ImageWithBlur } from "../../logic/image_with_blur";
import type BlogPostMetadata from "./metadata";

interface BlogPostProps {
  readonly metadata: BlogPostMetadata;
  readonly coverImage: ImageWithBlur & { alt: string };
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const BlogPost: React.FunctionComponent<BlogPostProps> = ({
  metadata: { title, description, publishedAt },
  coverImage,
  children,
}) => (
  <article className="prose mx-auto flex max-w-2xl flex-col py-8">
    <section className="text-center">
      <h3 className="text-sm font-light text-gray-600">
        {publishedAt.toDateString()}
      </h3>
      <h1 className="text-5xl font-normal">{title}</h1>
      <h2 className="text-xl font-light">{description}</h2>
      {typeof coverImage === "undefined" ? null : (
        <div className="mb-8">
          <Image alt={coverImage.alt} image={coverImage} />
        </div>
      )}
    </section>
    <section>{children}</section>
  </article>
);

export type { BlogPostMetadata };
export default BlogPost;
