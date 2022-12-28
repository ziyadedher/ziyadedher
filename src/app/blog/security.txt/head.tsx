import React from "react";

import { BlogPostHead } from "../../../components/blog";
import DefaultHeadTags from "../../../components/default_head_tags";
import { getImageWithBlur } from "../../../logic/image_with_blur";
import { getStorageURI } from "../../../utils/storage";

import METADATA from "./metadata";

// @ts-expect-error -- Async Server Component
const Head: React.FunctionComponent = async () => (
  <>
    <DefaultHeadTags />
    <BlogPostHead
      metadata={METADATA}
      coverImage={{
        alt: "hand-drawn cartoon of a stick figure walking away sadly from a sign that reads, in all caps, 'absolutely no unauthorized hacking'",
        ...(await getImageWithBlur(
          getStorageURI("blog/security.txt/cover.png"),
          60
        )),
      }}
    />
  </>
);

export default Head;
