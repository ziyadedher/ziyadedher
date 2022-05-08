import Link from "next/link";
import React from "react";

import Anchor from "../../logic/anchor";

interface TextLinkProps {
  readonly href: string;
  readonly isExternal?: boolean;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const TextLink: React.FunctionComponent<TextLinkProps> = ({
  href,
  isExternal = false,
  children,
}) => (
  // eslint-disable-next-line tailwindcss/no-custom-classname -- not-prose is in alpha.
  <span className="not-prose underline transition-all hover:opacity-70">
    <Link href={href} passHref>
      <Anchor shouldOpenInNewPage={isExternal}>{children}</Anchor>
    </Link>
  </span>
);

export default TextLink;
