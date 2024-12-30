import * as Headless from "@headlessui/react";
import NextLink, { type LinkProps } from "next/link";
import React, { forwardRef } from "react";

export const Link = forwardRef(function Link(
  {
    isExternal,
    ...props
  }: LinkProps & React.ComponentPropsWithoutRef<"a"> & { isExternal?: boolean },
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  if (isExternal) {
    return (
      <Headless.DataInteractive>
        <a {...props} ref={ref} target="_blank" rel="noopener noreferrer" />
      </Headless.DataInteractive>
    );
  }
  return (
    <Headless.DataInteractive>
      <NextLink {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});
