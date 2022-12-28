import React from "react";

import GTag from "../utils/gtag";
import { getStorageURI } from "../utils/storage";

const DefaultHeadTags: React.FunctionComponent = () => (
  <>
    <GTag />

    <meta charSet="utf-8" />
    <link
      rel="shortcut icon"
      type="image/png"
      href={getStorageURI("brain.png")}
    />
  </>
);

export default DefaultHeadTags;
