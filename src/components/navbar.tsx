import cx from "classnames";
import Link from "next/link";

type NavbarPage = "blog" | "hacks" | "home";

const NavbarPageEntry = ({
  page,
  linkName,
  linkUrl,
  isCurrentPage,
}: {
  page: NavbarPage;
  linkName: string;
  linkUrl: string;
  isCurrentPage?: boolean;
}) => (
  <Link key={page} href={linkUrl}>
    <span
      className={cx(
        "uppercase font-light text-sm group-hover:opacity-50 transition-all",
        isCurrentPage === true ? "opacity-70" : "opacity-100"
      )}
    >
      {linkName}
    </span>
  </Link>
);

interface NavbarProps {
  currentPage: NavbarPage | null;
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
