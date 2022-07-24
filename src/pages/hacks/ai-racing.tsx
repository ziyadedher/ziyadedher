import Head from "next/head";

import Game from "../../components/goofs/racing/game";
import PageContainer, { PageStyle } from "../../components/page_container";

import type { NextPage } from "next";

const AIRacing: NextPage = () => (
  <>
    <Head>
      <title>AI Racer | Build AIs to race cars.</title>
      <meta
        name="description"
        content="Write scripts and AI controllers to drive and race cars. Upgrade your car with better components to make writing more powerful AIs feasible."
      />
    </Head>

    <PageContainer
      hasNavbar={false}
      hasHeader={false}
      navbarPage={null}
      pageStyle={PageStyle.HACKER}
    >
      <Game />
    </PageContainer>
  </>
);

export default AIRacing;
