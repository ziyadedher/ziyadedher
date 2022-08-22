import Head from "next/head";

import TextLink from "../../components/links/text";
import { NavbarPage } from "../../components/navbar";
import PageContainer, { PageStyle } from "../../components/page_container";

import type { BlogPostMetadata } from "../../components/blog_post";
import type { NextPage } from "next";

const ENTRIES: readonly BlogPostMetadata[] = [
  {
    title: "Nothing here yet...",
    url: "https://ziyadedher.com",
    description: "Stay tuned!",
    publishedAt: new Date("2022-08-21T18:38:00-0700"),
  },
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Date
].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

const Index: NextPage = () => (
  <>
    <Head>
      <title>Ziyad Edher | Blog</title>
      <meta
        name="description"
        content="Ziyad writes about nerd stuff: security, technology, hacking, you name it."
      />
    </Head>

    <PageContainer
      hasHeader
      hasNavbar
      navbarPage={NavbarPage.BLOG}
      pageStyle={PageStyle.LIGHT}
    >
      <div className="mx-auto flex w-full max-w-sm flex-col gap-12 pt-8 font-light">
        <div className="flex flex-col gap-4 self-center text-center">
          <h1 className="text-4xl">Ziyad&apos;s Blog</h1>
          <h2 className="text-lg text-gray-600">
            I write things sometimes about technology, security, software
            engineering, or whatever else.
          </h2>
        </div>
        <div>
          <ul className="flex flex-col gap-8">
            {/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Date */}
            {ENTRIES.map((metadata) => (
              <li key={metadata.url}>
                <div className="flex flex-col gap-2">
                  <div>
                    <TextLink href={metadata.url}>
                      <h3 className="text-lg">{metadata.title}</h3>
                    </TextLink>
                    <h4 className="text-sm text-gray-500">
                      {metadata.publishedAt.toDateString()}
                    </h4>
                  </div>
                  <p className="text-sm">{metadata.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  </>
);

export default Index;
