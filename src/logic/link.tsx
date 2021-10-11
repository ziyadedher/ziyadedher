import NextLink from "next/link";
import React from "react";

interface LinkProps {
  readonly href: string;
  readonly shouldOpenInNewPage?: boolean;
  readonly children?: React.ReactNode | null;
}

const Link: React.FunctionComponent<LinkProps> = ({
  href,
  shouldOpenInNewPage = false,
  children = null,
}: LinkProps) => (
  <NextLink href={href}>
    <a
      href={href}
      // eslint-disable-next-line react/jsx-props-no-spreading -- unforunately, there's no cleaner way to do this that I can think of.
      {...(shouldOpenInNewPage ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  </NextLink>
);

export default Link;
