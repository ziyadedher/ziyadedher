import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-shadow -- Next.js pattern.
const Document: React.FunctionComponent = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
