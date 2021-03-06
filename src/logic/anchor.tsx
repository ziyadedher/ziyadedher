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
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
    {
      href,
      shouldOpenInNewPage = false,
      label,
      children,
      onClick: handleClick,
    },
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
    ref
  ) => (
    <a
      className="group"
      ref={ref}
      onClick={handleClick}
      href={href}
      aria-label={label}
      // eslint-disable-next-line react/jsx-props-no-spreading -- unforunately, there's no cleaner way to do this that I can think of.
      {...(shouldOpenInNewPage ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  )
);
Anchor.displayName = "Anchor";

export default Anchor;
