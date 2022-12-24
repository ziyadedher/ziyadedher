import cx from "classnames";
import Link from "next/link";
import React from "react";

import Anchor from "../logic/anchor";

type NavbarPage = "home" | "blog" | "hacks";

interface NavbarPageEntryProps {
  readonly page: NavbarPage;
  readonly linkName: string;
  readonly linkUrl: string;
  readonly isCurrentPage?: boolean;
}

const NavbarPageEntry: React.FunctionComponent<NavbarPageEntryProps> = ({
  page,
  linkName,
  linkUrl,
  isCurrentPage,
}: NavbarPageEntryProps) => (
  <Link key={page} href={linkUrl} passHref legacyBehavior>
    <Anchor>
      <span
        className={cx(
          "uppercase font-light text-sm group-hover:opacity-50 transition-all",
          isCurrentPage === true ? "opacity-70" : "opacity-100"
        )}
      >
        {linkName}
      </span>
    </Anchor>
  </Link>
);

interface NavbarProps {
  readonly currentPage: NavbarPage | null;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  currentPage,
}: NavbarProps) => (
  <nav className="flex w-full grow justify-center space-x-4">
    <NavbarPageEntry
      page="home"
      linkName="Home"
      linkUrl="/"
      isCurrentPage={currentPage === "home"}
    />
    <NavbarPageEntry
      page="blog"
      linkName="Blog"
      linkUrl="/blog"
      isCurrentPage={currentPage === "blog"}
    />
    <NavbarPageEntry
      page="hacks"
      linkName="Hacks"
      linkUrl="/hacks"
      isCurrentPage={currentPage === "hacks"}
    />
  </nav>
);

export type { NavbarPage };
export default Navbar;
