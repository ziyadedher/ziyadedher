import React from "react";

import DefaultHeadTags from "../../../components/default_head_tags";

const Head: React.FunctionComponent = () => (
  <>
    <DefaultHeadTags />

    <title>Log4Shell Public Bug Bounty Specials | Ziyad Edher</title>
    <meta
      name="description"
      content="List of companies with public bug bounty specials for Log4Shell (CVE-2021-44228). Log4Shell is an RCE vulnerability in the very popular Log4J logging library."
    />
  </>
);

export default Head;
