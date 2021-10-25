import Link from "next/link";
import React from "react";

import Anchor from "../../logic/anchor";

interface TextLinkProps {
  readonly href: string;
  readonly isExternal?: boolean;
  readonly children: React.ReactNode;
}

const TextLink: React.FunctionComponent<TextLinkProps> = ({
  href,
  isExternal = false,
  children,
}: TextLinkProps) => (
  // eslint-disable-next-line tailwindcss/no-custom-classname -- not-prose is in alpha.
  <span className="underline hover:opacity-70 transition-all not-prose">
    <Link href={href} passHref>
      <Anchor shouldOpenInNewPage={isExternal}>{children}</Anchor>
    </Link>
  </span>
);

export default TextLink;
