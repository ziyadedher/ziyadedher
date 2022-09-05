import Head from "next/head";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-shadow -- custom Image
import Image from "./image";
import { NavbarPage } from "./navbar";
import PageContainer, { PageStyle } from "./page_container";

import type { ImageWithBlur } from "../logic/image_with_blur";

interface BlogPostMetadata {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: Date;
  readonly modifiedAt?: Date;
}

interface BlogPostProps {
  readonly metadata: BlogPostMetadata;
  readonly coverImage: ImageWithBlur & { alt: string };
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const BlogPost: React.FunctionComponent<BlogPostProps> = ({
  metadata: { url, title, description, publishedAt, modifiedAt = publishedAt },
  coverImage,
  children,
}) => (
  <>
    <Head>
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
      <meta
        property="article:modified_time"
        content={modifiedAt.toISOString()}
      />
      <meta property="twitter:card" content="summary" />
      <meta name="twitter:image:alt" content={coverImage.alt} />
    </Head>

    <PageContainer
      hasHeader
      hasNavbar
      navbarPage={NavbarPage.BLOG}
      pageStyle={PageStyle.LIGHT}
    >
      <article className="prose mx-auto flex max-w-2xl flex-col py-8">
        <section className="text-center">
          <h1 className="mb-8 text-5xl font-normal">{title}</h1>
          <h2 className="mb-2 text-xl font-light">{description}</h2>
          <h3 className="mb-4 text-sm font-light text-gray-600">
            {publishedAt.toDateString()}
          </h3>
          {typeof coverImage === "undefined" ? null : (
            <div className="mb-8">
              <Image alt={coverImage.alt} image={coverImage} />
            </div>
          )}
        </section>
        <section>{children}</section>
      </article>
    </PageContainer>
  </>
);

export type { BlogPostMetadata };
export default BlogPost;
