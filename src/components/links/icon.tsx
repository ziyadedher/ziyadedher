import Link from "next/link";

import Anchor from "@/logic/anchor";

const IconLink = ({
  href,
  label,
  isExternal = false,
  children,
}: {
  href: string;
  label: string;
  isExternal?: boolean;
  children: React.ReactNode;
}) => (
  <span className="transition-all hover:opacity-50">
    <Link href={href} passHref legacyBehavior>
      <Anchor label={label} shouldOpenInNewPage={isExternal}>
        {children}
      </Anchor>
    </Link>
  </span>
);

export default IconLink;
