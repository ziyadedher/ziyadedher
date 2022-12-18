import Head from "next/head";

import { NavbarPage } from "../../components/navbar";
import PageContainer, { PageStyle } from "../../components/page_container";
import Terminal from "../../components/terminal";
import AnimatedHackerText from "../../components/text/animated_hacker_text";

import type { NextPage } from "next";

const Index: NextPage = () => (
  <>
    <Head>
      <title>Ziyad Edher | Software Engineer</title>
      <meta
        name="description"
        content="Ziyad Edher is a software engineer interested in AI/ML, entrepreneurship, security, and infrastructure."
      />
    </Head>

    <PageContainer
      hasHeader
      hasNavbar
      navbarPage={NavbarPage.HACKS}
      pageStyle={PageStyle.HACKER}
    >
      <div className="flex w-full flex-col items-center">
        <p className="mb-8 font-mono text-sm">
          <AnimatedHackerText delay={1000} text="It's time to hack." />
        </p>

        <div className="h-96 w-full max-w-2xl px-4">
          <Terminal />
        </div>
      </div>
    </PageContainer>
  </>
);

export default Index;
