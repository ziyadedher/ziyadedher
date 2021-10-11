import React from "react";

interface LinkProps {
  readonly href?: string;
  readonly shouldOpenInNewPage?: boolean;
  readonly children?: React.ReactNode;
}

const Anchor: React.FunctionComponent<LinkProps> = ({
  href,
  shouldOpenInNewPage = false,
  children,
}: LinkProps) => (
  <a
    href={href}
    // eslint-disable-next-line react/jsx-props-no-spreading -- unforunately, there's no cleaner way to do this that I can think of.
    {...(shouldOpenInNewPage ? { target: "_blank", rel: "noreferrer" } : {})}
  >
    {children}
  </a>
);

export default Anchor;
