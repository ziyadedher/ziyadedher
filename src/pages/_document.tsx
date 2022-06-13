import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

import { getStorageURI } from "../utils/storage";

// eslint-disable-next-line @typescript-eslint/no-shadow -- Next.js pattern.
const Document: React.FunctionComponent = () => (
  <Html lang="en">
    <Head>
      <meta charSet="utf-8" />
      <link
        rel="shortcut icon"
        type="image/png"
        href={getStorageURI("brain.png")}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
