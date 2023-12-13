import Image from "next/image";

import type { Metadata, ImageWithAlt } from "@/app/blog/_components/metadata";

const Post = ({
  metadata: { title, description, publishedAt },
  coverImage,
  children,
}: {
  metadata: Metadata;
  coverImage: ImageWithAlt;
  children: React.ReactNode;
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
          <Image
            priority
            placeholder="blur"
            alt={coverImage.alt}
            src={coverImage}
          />
        </div>
      )}
    </section>
    <section>{children}</section>
  </article>
);

export default Post;
