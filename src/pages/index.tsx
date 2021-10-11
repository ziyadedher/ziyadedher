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
import React from "react";

import Anchor from "../logic/anchor";

import type { NextPage } from "next";

interface SocialIconProps {
  readonly href: string;
  readonly children: React.ReactNode;
}

const SocialIcon: React.FunctionComponent<SocialIconProps> = ({
  href,
  children,
}: SocialIconProps) => (
  <span className="hover:opacity-50 transition-all">
    <Link href={href} passHref>
      <Anchor shouldOpenInNewPage>{children}</Anchor>
    </Link>
  </span>
);

interface TextLinkProps {
  readonly href: string;
  readonly isExternal?: boolean;
  readonly children: React.ReactNode;
}

const TextLink: React.FunctionComponent<TextLinkProps> = ({
  href,
  isExternal = false,
  children,
}: TextLinkProps) => (
  // eslint-disable-next-line tailwindcss/no-custom-classname -- no-prose is in alpha.
  <span className="underline hover:opacity-70 transition-all not-prose">
    <Link href={href} passHref>
      <Anchor shouldOpenInNewPage={isExternal}>{children}</Anchor>
    </Link>
  </span>
);

const Index: NextPage = () => (
  <div className="container flex flex-col justify-center items-center mx-auto">
    <header className="flex flex-col py-12 text-center">
      <div className="text-2xl font-light uppercase hover:opacity-70 transition-all">
        <Link href="/" passHref>
          <Anchor>Ziyad Edher</Anchor>
        </Link>
      </div>

      <div className="flex flex-row pt-2 space-x-2">
        <SocialIcon href="https://twitter.com/ziyadedher">
          <TwitterLogo size={24} weight="light" />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com/in/ziyad-edher">
          <LinkedinLogo size={24} weight="light" />
        </SocialIcon>
        <SocialIcon href="https://github.com/ziyadedher">
          <GithubLogo size={24} weight="light" />
        </SocialIcon>
        <SocialIcon href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvrr">
          <SpotifyLogo size={24} weight="light" />
        </SocialIcon>
        <SocialIcon href="https://facebook.com/ziyadedher">
          <FacebookLogo size={24} weight="light" />
        </SocialIcon>
        <SocialIcon href="https://instagram.com/ziyadedher">
          <InstagramLogo size={24} weight="light" />
        </SocialIcon>
      </div>
    </header>

    <main className="flex flex-row py-8 space-x-8 w-full max-w-5xl">
      <div className="flex flex-col flex-1 text-sm font-light prose">
        <p className="text-3xl">yo</p>
        <p>
          My name is Ziyad Edher (زياد إضهير), I&apos;m a software engineer and
          I like breaking things.
        </p>
        <p>
          Right now, I&apos;m doing security work at{" "}
          <TextLink href="https://asana.com?noredirect" isExternal>
            Asana
          </TextLink>
          . My LinkedIn is{" "}
          <TextLink href="https://linkedin.com/in/ziyadedher" isExternal>
            here
          </TextLink>
          .
        </p>
        <p>
          I went to the{" "}
          <TextLink href="https://www.utoronto.ca/" isExternal>
            University of Toronto
          </TextLink>{" "}
          and graduated in June 2021 from a computer science program focusing on
          artificial intelligence and computation theory.
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
          nature. Hit me up if you wanna talk about that stuff or anything else,
          it&apos;s not like I have anything better to do.
        </p>
        <p>
          Some maybe cool things I did in the past:
          <ul>
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
        </p>
        <p>
          There used to be more content here but I got bored of keeping it up to
          date so go{" "}
          <TextLink href="https://twitter.com/ziyadedher">
            follow me on Twitter
          </TextLink>{" "}
          or something instead.
        </p>
      </div>
      <div className="flex flex-col flex-none max-w-md">
        <Image
          src="https://storage.googleapis.com/ziyadedher/ziyadedher.heic"
          alt="Photograph of Ziyad Edher in a stuffed animal store. He is holding a stuffed hedgehog plushie."
          width={3024}
          height={4032}
          // eslint-disable-next-line react/forbid-component-props -- Next.js doesn't let us style outside.
          className="rounded-3xl shadow-inner"
        />
      </div>
    </main>
  </div>
);

export default Index;
