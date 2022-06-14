import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";

import Button, { ButtonStyle } from "../../components/buttons/button";
import PageContainer, { PageStyle } from "../../components/page_container";

import type { NextPage } from "next";

interface EditorProps {
  readonly onCodeChange: (code: string) => void;
}

const Editor: React.FunctionComponent<EditorProps> = ({ onCodeChange }) => {
  const monaco = useMonaco();

  const handleCodeChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- this is just for Monaco.
    (code: string | undefined, _: unknown): void => {
      if (typeof code !== "undefined") {
        onCodeChange(code);
      }
    },
    [onCodeChange]
  );

  useEffect(() => {
    if (monaco !== null) {
      const model = monaco.editor.getModels()[0];
      if (typeof model === "undefined") {
        throw new Error("no monaco model found");
      }
      monaco.editor.setModelLanguage(model, "javascript");
      monaco.editor.setTheme("vs-dark");
    }
  }, [monaco]);

  return (
    <div className="flex grow">
      <MonacoEditor onChange={handleCodeChange} />
    </div>
  );
};

interface ExecutorProps {
  readonly code: string;
}

const Executor: React.FunctionComponent<ExecutorProps> = ({ code }) => {
  const handleExecute = useCallback(() => {
    eval(code);
  }, [code]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Button buttonStyle={ButtonStyle.SECONDARY} onClick={handleExecute}>
          Execute
        </Button>
      </div>
    </div>
  );
};

const EditorPanel: React.FunctionComponent = () => {
  const [code, setCode] = useState("");

  const handleCodeChange = setCode;

  return (
    <div className="flex grow flex-row">
      <Editor onCodeChange={handleCodeChange} />
      <Executor code={code} />
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
        <EditorPanel />
      </div>
    </PageContainer>
  </>
);

export default EthHack;
