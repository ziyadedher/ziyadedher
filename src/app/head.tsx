import React from "react";

import GTag from "../utils/gtag";
import { getStorageURI } from "../utils/storage";

const Head: React.FunctionComponent = () => (
  <>
    <GTag />

    <meta charSet="utf-8" />
    <link
      rel="shortcut icon"
      type="image/png"
      href={getStorageURI("brain.png")}
    />

    <title>Ziyad Edher | Software Engineer</title>
    <meta
      name="description"
      content="Ziyad Edher is a software engineer interested in AI/ML, entrepreneurship, security, and infrastructure."
    />
  </>
);

export default Head;
