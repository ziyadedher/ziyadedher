import Head from "next/head";

import Terminal from "../../components/goofs/terminal";
import { NavbarPage } from "../../components/navbar";
import PageContainer, { PageStyle } from "../../components/page_container";
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
        <div className="m-8 flex flex-col items-center gap-4">
          <h1 className="font-mono text-3xl">
            <AnimatedHackerText delay={1000} text="😎 it's time to hack 😎" />
          </h1>
          <p className="font-mono text-sm">
            <AnimatedHackerText
              delay={2000}
              text="Use the terminal below to get started."
            />
          </p>
        </div>

        <div className="h-full w-full p-8">
          <Terminal />
        </div>
      </div>
    </PageContainer>
  </>
);

export default Index;
