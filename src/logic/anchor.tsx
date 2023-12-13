import React, { forwardRef } from "react";

interface AnchorProps {
  readonly href?: string;
  readonly shouldOpenInNewPage?: boolean;
  readonly label?: string;
  readonly children?: React.ReactNode;
  readonly onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      href,
      shouldOpenInNewPage = false,
      label,
      children,
      onClick: handleClick,
    },
    ref
  ) => (
    <a
      className="group"
      ref={ref}
      onClick={handleClick}
      href={href}
      aria-label={label}
      {...(shouldOpenInNewPage ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  )
);
Anchor.displayName = "Anchor";

export default Anchor;
