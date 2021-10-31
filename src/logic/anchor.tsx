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
      onClick,
    }: AnchorProps,
    ref
  ) => (
    <a
      className="group"
      ref={ref}
      // eslint-disable-next-line react/jsx-handler-names -- we need to forward the onClick as-is here.
      onClick={onClick}
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
