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
}) => (
  <span className="not-prose underline transition-all hover:opacity-70">
    <Link href={href} passHref legacyBehavior>
      <Anchor shouldOpenInNewPage={isExternal}>{children}</Anchor>
    </Link>
  </span>
);

export default TextLink;
