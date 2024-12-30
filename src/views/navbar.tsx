import cx from "classnames";
import Link from "next/link";

export type NavbarPage = "blog" | "hacks" | "home";

function NavbarPageEntry({
  page,
  linkName,
  linkUrl,
  isCurrentPage,
}: {
  page: NavbarPage;
  linkName: string;
  linkUrl: string;
  isCurrentPage?: boolean;
}) {
  return (
    <Link key={page} href={linkUrl}>
      <span
        className={cx(
          "uppercase font-light text-sm group-hover:opacity-50 transition-all",
          isCurrentPage === true ? "opacity-70" : "opacity-100",
        )}
      >
        {linkName}
      </span>
    </Link>
  );
}

interface NavbarProps {
  currentPage: NavbarPage | null;
}

export function Navbar({ currentPage }: NavbarProps) {
  return (
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
}
