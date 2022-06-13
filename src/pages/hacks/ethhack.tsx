import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import Head from "next/head";
import React, { useEffect } from "react";

import PageContainer, { PageStyle } from "../../components/page_container";

import type { NextPage } from "next";

const Editor: React.FunctionComponent = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco !== null) {
      const model = monaco.editor.getModels()[0];
      if (typeof model === "undefined") {
        throw new Error("no monaco model found");
      }
      monaco.editor.setModelLanguage(model, "typescript");
      monaco.editor.setTheme("vs-dark");
    }
  }, [monaco]);

  return (
    <div className="h-full py-4">
      <MonacoEditor />
    </div>
  );
};

const EthHack: NextPage = () => (
  <>
    <Head>
      <title>Ethereum Hackstation Playground | Ziyad Edher</title>
      <meta
        name="description"
        content="Ethereum Hackstation lets you construct and send simple custom Ethereum transactions on the web. You can call arbitrary Ethereum smart contract functions without an ABI, execute any JSON-RPC, and quickly get hacking."
      />
    </Head>

    <PageContainer
      hasNavbar
      hasHeader
      navbarPage={null}
      pageStyle={PageStyle.HACKER}
    >
      <div className="flex w-full flex-col">
        <Editor />
      </div>
    </PageContainer>
  </>
);

export default EthHack;
