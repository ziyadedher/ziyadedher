import Image from "next/image";

import TextLink from "@/components/links/text";
import PageContainer from "@/components/page_container";

import meImage from "@public/ziyadedher.jpg";

const Page = () => (
  <PageContainer hasHeader hasNavbar navbarPage="home" pageStyle="light">
    <div className="mx-auto flex max-w-5xl grow-0 flex-row justify-center gap-8 py-8">
      <div className="prose flex flex-1 flex-col text-sm font-light">
        <p className="text-3xl">waddup nerd</p>
        <p>
          My name is Ziyad Edher (زياد إضهير), I&apos;m a software engineer and
          I like breaking things.{" "}
          <TextLink href="https://twitter.com/ziyadedher">
            Follow me on Twitter
          </TextLink>{" "}
          for sick memes and sicker shitposts.
        </p>
        <p>
          I am a Member of Technical Staff at{" "}
          <TextLink href="https://anthropic.com" isExternal>
            Anthropic
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
          and graduated from a computer science program focusing on
          artificial intelligence and computation theory.
        </p>
        <p className="mb-1">Some things I like to talk about:</p>
        <ul className="mt-0">
          <li>
            Good software engineering
          </li>
          <li>
            Everything security-related
          </li>
          <li>
            Reinforcement learning
          </li>
          <li>
            Music (check out my{" "}
            <TextLink
              href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvrr"
              isExternal
            >
              Spotify
            </TextLink>
            )
          </li>
          <li>
            Scrappiness and entrepreneurship
          </li>
          <li>
            EVM performance (and performance in general)
          </li>
          <li>
            Microcontrollers and embedded systems
          </li>
        </ul>
        <p className="mb-1">Some maybe cool things I did in the past:</p>
        <ul className="mt-0">
          <li>
            Lead the Product Security team at{" "}
            <TextLink href="https://asana.com?noredirect" isExternal>
              Asana
            </TextLink>, primarily focussed on building great secure-by-default
            frameworks.
          </li>
          <li>
            Did performance work and built ML and data infrastructure at{" "}
            <TextLink href="https://www.citadelsecurities.com/" isExternal>
              Citadel Securities
            </TextLink>
            .
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
          <li>
            Investigated EVM performance in part in{" "}
            <TextLink href="https://github.com/ziyadedher/evm-bench" isExternal>
              evm-bench
            </TextLink>
            .
          </li>
        </ul>
        <p>
          If you&apos;re a meganerd, here&apos;s my{" "}
          <TextLink href="https://storage.ziyadedher.com/pgp.asc" isExternal>
            PGP key
          </TextLink>{" "}
          (fingerprint: CB5D A985 9769 0CC1). You can probably find some places
          to verify this if you don&apos;t wanna trust GCP.
        </p>
      </div>
      <div className="hidden h-min max-w-md overflow-hidden rounded-3xl shadow-inner xl:flex">
        <Image
          priority
          placeholder="blur"
          alt="Photograph of Ziyad Edher in a stuffed animal store. He is holding a stuffed hedgehog plushie."
          src={meImage}
        />
      </div>
    </div>
  </PageContainer>
);

export default Page;
