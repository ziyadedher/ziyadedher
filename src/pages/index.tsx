import Head from "next/head";
// eslint-disable-next-line @typescript-eslint/no-shadow -- Next.js Image
import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
  TwitterLogo,
} from "phosphor-react";
import { getPlaiceholder } from "plaiceholder";

import IconLink from "../components/links/icon";
import TextLink from "../components/links/text";
import Anchor from "../logic/anchor";

import type { GetStaticProps, NextPage } from "next";

interface ImageBlur {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly data: string;
}
interface IndexProps {
  readonly imageBlur: {
    readonly ziyadedher: ImageBlur;
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

    <div className="container flex flex-col justify-center items-center mx-auto">
      <header className="flex flex-col py-12 text-center">
        <div className="text-2xl font-light uppercase hover:opacity-70 transition-all">
          <Link href="/" passHref>
            <Anchor>Ziyad Edher</Anchor>
          </Link>
        </div>

        <div className="flex flex-row pt-2 space-x-2">
          <IconLink
            href="https://twitter.com/ziyadedher"
            label="Twitter"
            isExternal
          >
            <TwitterLogo size={24} weight="light" />
          </IconLink>
          <IconLink
            href="https://linkedin.com/in/ziyad-edher"
            label="LinkedIn"
            isExternal
          >
            <LinkedinLogo size={24} weight="light" />
          </IconLink>
          <IconLink
            href="https://github.com/ziyadedher"
            label="GitHub"
            isExternal
          >
            <GithubLogo size={24} weight="light" />
          </IconLink>
          <IconLink
            href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvrr"
            label="Spotify"
            isExternal
          >
            <SpotifyLogo size={24} weight="light" />
          </IconLink>
          <IconLink
            href="https://facebook.com/ziyadedher"
            label="Facebook"
            isExternal
          >
            <FacebookLogo size={24} weight="light" />
          </IconLink>
          <IconLink
            href="https://instagram.com/ziyadedher"
            label="Instagram"
            isExternal
          >
            <InstagramLogo size={24} weight="light" />
          </IconLink>
        </div>
      </header>

      <main className="flex flex-row justify-center py-8 space-x-8 w-full max-w-5xl">
        <div className="flex flex-col flex-1 mx-6 xl:mx-0 text-sm font-light prose">
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
            <TextLink href="https://linkedin.com/in/ziyadedher" isExternal>
              LinkedIn
            </TextLink>
            if you're into that.
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
            blurDataURL={imageBlur.ziyadedher.data}
          />
        </div>
      </main>
    </div>
  </>
);

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const ziyadedherPlaiceholder = await getPlaiceholder(
    "https://storage.googleapis.com/ziyadedher/ziyadedher.jpg"
  );

  return {
    props: {
      imageBlur: {
        ziyadedher: {
          url: ziyadedherPlaiceholder.img.src,
          width: ziyadedherPlaiceholder.img.width,
          height: ziyadedherPlaiceholder.img.height,
          data: ziyadedherPlaiceholder.base64,
        },
      },
    },
  };
};

export const DEFAULT_STATIC_PROPS: IndexProps = {
  imageBlur: {
    ziyadedher: {
      url: "https://storage.googleapis.com/ziyadedher/ziyadedher.jpg",
      width: 3024,
      height: 4032,
      data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=",
    },
  },
};

export default Index;
