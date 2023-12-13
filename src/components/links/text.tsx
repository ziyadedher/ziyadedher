import Link from "next/link";

import Anchor from "@/logic/anchor";

const TextLink = ({
  href,
  isExternal = false,
  children,
}: {
  href: string;
  isExternal?: boolean;
  children: React.ReactNode;
}) => (
  <span className="not-prose underline transition-all hover:opacity-70">
    <Link href={href} passHref legacyBehavior>
      <Anchor shouldOpenInNewPage={isExternal}>{children}</Anchor>
    </Link>
  </span>
);

export default TextLink;
