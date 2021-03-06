import Link from "next/link";
import React from "react";

import Anchor from "../../logic/anchor";

interface IconLinkProps {
  readonly href: string;
  readonly label: string;
  readonly isExternal?: boolean;
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const IconLink: React.FunctionComponent<IconLinkProps> = ({
  href,
  label,
  isExternal = false,
  children,
}) => (
  <span className="transition-all hover:opacity-50">
    <Link href={href} passHref>
      <Anchor label={label} shouldOpenInNewPage={isExternal}>
        {children}
      </Anchor>
    </Link>
  </span>
);

export default IconLink;
