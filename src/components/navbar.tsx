import cx from "classnames";
import Link from "next/link";
import React from "react";

import Anchor from "../logic/anchor";

enum NavbarPage {
  HOME = "/",
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
  <Link key={page} href={linkUrl} passHref>
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
  readonly currentPage: NavbarPage;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  currentPage,
}: NavbarProps) => (
  <nav className="flex flex-grow justify-center space-x-4 w-full">
    <NavbarPageEntry
      page={NavbarPage.HOME}
      linkName="Home"
      linkUrl={NavbarPage.HOME}
      isCurrentPage={currentPage === NavbarPage.HOME}
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
