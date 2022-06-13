import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

import PageContainer, { PageStyle } from "../../components/page_container";
import Anchor from "../../logic/anchor";

import type { NextPage } from "next";

const Editor: React.FunctionComponent = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco !== null) {
      monaco.languages.register({ id: "ethhack" });
      monaco.languages.setMonarchTokensProvider("ethhack", {
        ignoreCase: false,
        includeLF: false,
        defaultToken: "invalid",

        keywords: ["let", "rpc", "contract"],

        tokenizer: {
          root: [
            // Keywords
            {
              regex: /[a-z$][\w$]*/u,
              action: {
                cases: {
                  // eslint-disable-next-line @typescript-eslint/naming-convention -- Monaco identifier
                  "@keywords": {
                    token: "keyword",
                  },
                },
              },
            },

            { include: "@rpc" },
            { include: "@whitespace" },
            { include: "@number" },

            // Strings
            {
              regex: /"(?:[^"\\]|\\.)*$/u,
              action: { token: "string.invalid" },
            }, // Non-teminated
            {
              regex: /"/u,
              action: {
                token: "string.quote",
                bracket: "@open",
                next: "@string",
              },
            },
          ],

          whitespace: [
            { regex: /[ \t\r\n]+/u, action: { token: "white" } },
            { regex: /\/\*/u, action: { token: "comment", next: "@comment" } },
            { regex: /\/\/.*$/u, action: { token: "comment" } },
          ],

          string: [
            { regex: /[^\\"]+/u, action: { token: "string" } },
            {
              regex: /"/u,
              action: {
                token: "string.quote",
                bracket: "@close",
                next: "@pop",
              },
            },
          ],

          number: [
            {
              regex: /\d*\.\d+(?:[eE][-+]?\d+)?/u,
              action: { token: "number.float" },
            },
            { regex: /\d+/u, action: { token: "number" } },
            { regex: /0[xX][0-9a-fA-F]+/u, action: { token: "number.hex" } },
          ],

          comment: [
            { regex: /[^/*]+/u, action: { token: "comment" } },
            { regex: /\/\*/u, action: { token: "comment", next: "@push" } }, // Nested
            { regex: "\\*/", action: { token: "comment", next: "@pop" } },
            { regex: /[/*]/u, action: { token: "comment" } },
          ],

          rpc: [
            {
              regex: /eth_[\w]+/u,
              action: { token: "ethhack.rpc" },
            },
          ],
        },
      });
      /*
       *   Monaco.languages.registerCodeActionProvider("ethhack", {});
       *   monaco.languages.registerCodeLensProvider("ethhack", {});
       *   monaco.languages.registerCompletionItemProvider("ethhack", {});
       */

      const model = monaco.editor.getModels()[0];
      if (typeof model === "undefined") {
        throw new Error("no monaco model found");
      }
      monaco.editor.setModelLanguage(model, "ethhack");

      monaco.editor.defineTheme("ethhack", {
        base: "vs-dark",
        inherit: true,
        rules: [{ token: "ethhack.rpc", foreground: "#90EE90" }],
        colors: {},
      });
      monaco.editor.setTheme("ethhack");
    }
  }, [monaco]);

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value -- matching Monaco vs-dark theme
    <div className="flex grow bg-[#1e1e1e] py-2">
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
      <div className="flex grow flex-col">
        <Editor />
      </div>
    </PageContainer>
  </>
);

export default EthHack;
