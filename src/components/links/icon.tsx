import Link from "next/link";
import React from "react";

import Anchor from "../../logic/anchor";

interface IconLinkProps {
  readonly href: string;
  readonly label: string;
  readonly isExternal?: boolean;
  readonly children: React.ReactNode;
}

const IconLink: React.FunctionComponent<IconLinkProps> = ({
  href,
  label,
  isExternal = false,
  children,
}: IconLinkProps) => (
  <span className="hover:opacity-50 transition-all">
    <Link href={href} passHref>
      <Anchor label={label} shouldOpenInNewPage={isExternal}>
        {children}
      </Anchor>
    </Link>
  </span>
);

export default IconLink;
