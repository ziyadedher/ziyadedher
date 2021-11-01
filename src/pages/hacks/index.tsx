import Head from "next/head";

import Terminal from "../../components/goofs/terminal";
import Header from "../../components/header";
import Navbar, { NavbarPage } from "../../components/navbar";
import PageContainer from "../../components/page_container";
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

    <div className="flex flex-col min-h-screen text-green-500 bg-gray-900">
      <PageContainer>
        <div className="my-8 space-y-4">
          <Header />
          <Navbar currentPage={NavbarPage.HACKS} />
        </div>

        <p className="mb-8 font-mono text-sm">
          <AnimatedHackerText delay={1000} text="It's time to hack." />
        </p>

        <div className="px-4 w-full max-w-2xl h-96">
          <Terminal />
        </div>
      </PageContainer>
    </div>
  </>
);

export default Index;
