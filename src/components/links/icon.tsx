import Link from "next/link";

import Anchor from "../../logic/anchor";

interface IconLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
}

const IconLink: React.FunctionComponent<IconLinkProps> = ({
  href,
  children,
}: IconLinkProps) => (
  <span className="hover:opacity-50 transition-all">
    <Link href={href} passHref>
      <Anchor shouldOpenInNewPage>{children}</Anchor>
    </Link>
  </span>
);

export default IconLink;
