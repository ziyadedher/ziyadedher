import Head from "next/head";
// eslint-disable-next-line @typescript-eslint/no-shadow -- Next.js Image
import Image from "next/image";

import TextLink from "../components/links/text";
import { NavbarPage } from "../components/navbar";
import PageContainer from "../components/page_container";
import { getImageWithBlur } from "../logic/image_with_blur";
import { getStorageURI } from "../utils/storage";

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
      <div className="mx-auto flex max-w-5xl grow-0 flex-row justify-center gap-8 py-8">
        <div className="prose flex flex-1 flex-col text-sm font-light">
          <p className="text-3xl">waddup nerd</p>
          <p>
            My name is Ziyad Edher (زياد إضهير), I&apos;m a software engineer
            and I like breaking things.{" "}
            <TextLink href="https://twitter.com/ziyadedher">
              Follow me on Twitter
            </TextLink>{" "}
            for sick memes and sicker shitposts.
          </p>
          <p>
            I do product security at{" "}
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
            ), good software engineering, Ethereum, and talking with folks about
            things they&apos;re passionate about.
          </p>
          <p className="mb-1">Some maybe cool things I did in the past:</p>
          <ul className="mt-0">
            <li>
              Built ML and data infrastructure at{" "}
              <TextLink href="https://www.citadelsecurities.com/" isExternal>
                Citadel Securities
              </TextLink>
              .
            </li>
            <li>
              Designed software that protects{" "}
              <TextLink href="https://asana.com?noredirect" isExternal>
                Asana
              </TextLink>{" "}
              users against scammers and bots.
            </li>
            <li>
              Interned at{" "}
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
              Taught cars how to drive at{" "}
              <TextLink href="https://www.autodrive.utoronto.ca/" isExternal>
                aUToronto
              </TextLink>
              .
            </li>
          </ul>
          <p>
            If you&apos;re a meganerd, here&apos;s my{" "}
            <TextLink href="https://storage.ziyadedher.com/pgp.asc" isExternal>
              PGP key
            </TextLink>{" "}
            (fingerprint: CB5D A985 9769 0CC1). You can probably find some
            places to verify this if you don&apos;t wanna trust GCP.
          </p>
        </div>
        <div className="hidden h-min max-w-md overflow-hidden rounded-3xl shadow-inner xl:flex">
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
    getStorageURI("ziyadedher.jpg"),
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
