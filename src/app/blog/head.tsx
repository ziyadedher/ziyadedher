import React from "react";

import DefaultHeadTags from "../../components/default_head_tags";

const Head: React.FunctionComponent = () => (
  <>
    <DefaultHeadTags />

    <title>Ziyad Edher | Blog</title>
    <meta
      name="description"
      content="Ziyad writes about nerd stuff: security, technology, hacking, you name it."
    />
  </>
);

export default Head;
