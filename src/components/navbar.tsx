import cx from "classnames";
import Link from "next/link";
import React from "react";

import Anchor from "../logic/anchor";

enum NavbarPage {
  HOME = "/",
  BLOG = "/blog",
  HACKS = "/hacks",
}

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
      page={NavbarPage.HOME}
      linkName="Home"
      linkUrl={NavbarPage.HOME}
      isCurrentPage={currentPage === NavbarPage.HOME}
    />
    <NavbarPageEntry
      page={NavbarPage.BLOG}
      linkName="Blog"
      linkUrl={NavbarPage.BLOG}
      isCurrentPage={currentPage === NavbarPage.BLOG}
    />
    <NavbarPageEntry
      page={NavbarPage.HACKS}
      linkName="Hacks"
      linkUrl={NavbarPage.HACKS}
      isCurrentPage={currentPage === NavbarPage.HACKS}
    />
  </nav>
);

export default Navbar;
export { NavbarPage };
