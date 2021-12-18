import Head from "next/head";
// eslint-disable-next-line @typescript-eslint/no-shadow -- Next.js Image
import Image from "next/image";

import TextLink from "../components/links/text";
import { NavbarPage } from "../components/navbar";
import PageContainer from "../components/page_container";
import { getImageWithBlur } from "../logic/image_with_blur";

import type { ImageWithBlur } from "../logic/image_with_blur";
import type { GetStaticProps, NextPage } from "next";

interface IndexProps {
  readonly imageBlur: {
    readonly ziyadedher: ImageWithBlur;
  };
}

const Index: NextPage<IndexProps> = ({ imageBlur }: IndexProps) => (
  <>
    <Head>
      <title>Ziyad Edher | Software Engineer</title>
      <meta
        name="description"
        content="Ziyad Edher is a software engineer interested in AI/ML, entrepreneurship, security, and infrastructure."
      />
    </Head>

    <PageContainer hasHeader hasNavbar navbarPage={NavbarPage.HOME}>
      <div className="flex flex-row gap-8 justify-center py-8 mx-auto max-w-5xl">
        <div className="flex flex-col flex-1 text-sm font-light prose">
          <p className="text-3xl">yo</p>
          <p>
            My name is Ziyad Edher (زياد إضهير), I&apos;m a software engineer
            and I like breaking things.
          </p>
          <p>
            Right now, I&apos;m doing security work at{" "}
            <TextLink href="https://asana.com?noredirect" isExternal>
              Asana
            </TextLink>
            . Check out my{" "}
            <TextLink href="https://linkedin.com/in/ziyad-edher" isExternal>
              LinkedIn
            </TextLink>{" "}
            if you&apos;re into that.
          </p>
          <p>
            I went to the{" "}
            <TextLink href="https://www.utoronto.ca/" isExternal>
              University of Toronto
            </TextLink>{" "}
            and graduated in June 2021 from a computer science program focusing
            on artificial intelligence and computation theory.
          </p>
          <p>
            I love entrepreneurship, music (check out my{" "}
            <TextLink
              href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvrr"
              isExternal
            >
              Spotify
            </TextLink>
            ), good software engineering, cryptocurrencies, and doing stuff in
            nature. Hit me up if you wanna talk about that stuff or anything
            else, it&apos;s not like I have anything better to do.
          </p>
          <p className="mb-1">Some maybe cool things I did in the past:</p>
          <ul className="mt-0">
            <li>
              Building ML and data infrastructure at{" "}
              <TextLink href="https://www.citadelsecurities.com/" isExternal>
                Citadel Securities
              </TextLink>
              .
            </li>
            <li>
              Designing software that protects{" "}
              <TextLink href="https://asana.com?noredirect" isExternal>
                Asana
              </TextLink>{" "}
              users against scammers and bots.
            </li>
            <li>
              Interning at{" "}
              <TextLink href="https://google.com" isExternal>
                Google
              </TextLink>{" "}
              (twice) working on{" "}
              <TextLink href="https://fi.google.com/" isExternal>
                communications
              </TextLink>{" "}
              and{" "}
              <TextLink href="https://cloud.google.com/" isExternal>
                security
              </TextLink>
              .
            </li>
            <li>
              Teaching cars how to drive at{" "}
              <TextLink href="https://www.autodrive.utoronto.ca/" isExternal>
                aUToronto
              </TextLink>
              .
            </li>
          </ul>
          <p>
            There used to be more content here but I got bored of keeping it up
            to date so go{" "}
            <TextLink href="https://twitter.com/ziyadedher">
              follow me on Twitter
            </TextLink>{" "}
            or something instead.
          </p>
        </div>
        <div className="hidden xl:flex overflow-hidden flex-none max-w-md rounded-3xl shadow-inner">
          <Image
            alt="Photograph of Ziyad Edher in a stuffed animal store. He is holding a stuffed hedgehog plushie."
            src={imageBlur.ziyadedher.url}
            width={imageBlur.ziyadedher.width}
            height={imageBlur.ziyadedher.height}
            placeholder="blur"
            blurDataURL={imageBlur.ziyadedher.blurData}
          />
        </div>
      </div>
    </PageContainer>
  </>
);

const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const ziyadedherImageWithBlur = await getImageWithBlur(
    "https://storage.googleapis.com/ziyadedher/ziyadedher.jpg",
    40
  );

  return {
    props: {
      imageBlur: {
        ziyadedher: ziyadedherImageWithBlur,
      },
    },
  };
};

export { getStaticProps };
export default Index;
