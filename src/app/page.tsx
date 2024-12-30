import Image from "next/image";

import { TextLink } from "@/components/atoms/text";
import { ArticleContainer } from "@/views/containers";
import meImage from "@public/ziyadedher.jpg";

const Page = () => (
  <ArticleContainer hasHeader hasNavbar navbarPage="home">
    <div className="flex flex-row gap-16 py-8">
      <article className="prose dark:prose-invert flex flex-1 flex-col text-sm font-light">
        <p className="text-2xl">waddup nerd, its ziyad</p>
        <p>
          My name is Ziyad Edher (زياد إضهير). I&apos;m a Member of Technical
          Staff at{" "}
          <TextLink href="https://anthropic.com" isExternal>
            Anthropic
          </TextLink>
          , software engineer, and I like breaking things.{" "}
          <TextLink href="https://twitter.com/ziyadedher">
            Follow me on Twitter
          </TextLink>{" "}
          for some occasionally good takes, but mostly crap.
        </p>
        <p>
          I went to the{" "}
          <TextLink href="https://www.utoronto.ca/" isExternal>
            University of Toronto
          </TextLink>{" "}
          and graduated from a computer science program focusing on artificial
          intelligence and computation theory.
        </p>
        <p className="mb-1">Some things I like to talk about:</p>
        <ul className="mt-0">
          <li>Good software engineering and security engineering.</li>
          <li>
            Artificial intelligence broadly, but reinforcement learning
            specifically.
          </li>
          <li>
            Music (check out my{" "}
            <TextLink
              href="https://open.spotify.com/user/c9n8y6h3ssu8hg811rfqt4tvr"
              isExternal
            >
              Spotify
            </TextLink>
            ).
          </li>
          <li>EVM performance (and performance in general).</li>
          <li>Microcontrollers and embedded systems.</li>
        </ul>
        <p className="mb-1">Some maybe cool things I did in the past:</p>
        <ul className="mt-0">
          <li>
            Lead the Product Security team at{" "}
            <TextLink href="https://asana.com?noredirect" isExternal>
              Asana
            </TextLink>
            , primarily focussed on building great secure-by-default frameworks.
          </li>
          <li>
            Did performance work and built ML infrastructure at{" "}
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
      </article>
      <aside className="hidden h-min max-w-md overflow-hidden rounded-3xl shadow-inner xl:flex">
        <Image
          priority
          placeholder="blur"
          alt="Photograph of Ziyad Edher in a stuffed animal store. He is holding a stuffed hedgehog plushie."
          src={meImage}
        />
      </aside>
    </div>
  </ArticleContainer>
);

export default Page;
