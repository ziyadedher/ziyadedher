import Head from "next/head";

import Header from "../../components/header";
import PageContainer from "../../components/page_container";

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

    <div className="flex flex-col justify-center min-h-screen text-green-500 bg-gray-900">
      <PageContainer>
        <Header />

        <p className="font-mono text-sm">It&apos;s time to hack. 😎</p>
      </PageContainer>
    </div>
  </>
);

export default Index;
