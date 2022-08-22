import Head from "next/head";
import React from "react";

import { NavbarPage } from "./navbar";
import PageContainer, { PageStyle } from "./page_container";

interface BlogPostMetadata {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: Date;
  readonly modifiedAt?: Date;
}

interface BlogPostProps {
  readonly metadata: BlogPostMetadata;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const BlogPost: React.FunctionComponent<BlogPostProps> = ({
  metadata: { title, description, publishedAt, modifiedAt = publishedAt },
  children,
}) => (
  <>
    <Head>
      <title>{`${title} | Ziyad Edher | Blog`}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${title} | Ziyad Edher | Blog`} />
      <meta property="og:type" content="article" />
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
    </Head>

    <PageContainer
      hasHeader
      hasNavbar
      navbarPage={NavbarPage.BLOG}
      pageStyle={PageStyle.LIGHT}
    >
      <div className="prose mx-auto flex max-w-5xl flex-row justify-center gap-8 py-8 font-light lg:prose-xl">
        {children}
      </div>
    </PageContainer>
  </>
);

export type { BlogPostMetadata };
export default BlogPost;
