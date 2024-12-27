import cx from "classnames";

import Header from "@/components/header";
import Navbar from "@/components/navbar";

import type { NavbarPage } from "@/components/navbar";

type PageStyle = "dark" | "hacker" | "light";

const getPageStyle = (pageStyle: PageStyle): string => {
  switch (pageStyle) {
    case "light":
      return "";
    case "dark":
      return "dark";
    case "hacker":
      return "text-green-500 bg-gray-900";
    default:
      return "";
  }
};
interface PageContainerProps {
  readonly children: React.ReactNode;
  readonly hasHeader?: boolean;
  readonly hasNavbar?: boolean;
  readonly navbarPage?: NavbarPage | null;
  readonly pageStyle?: PageStyle;
}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  children,
  hasHeader = true,
  hasNavbar = true,
  navbarPage = null,
  pageStyle = "light",
}) => (
  <div
    className={cx(
      "flex flex-col min-h-screen items-center",
      getPageStyle(pageStyle)
    )}
  >
    <div className="flex w-full grow flex-col items-center dark:bg-gray-900 dark:text-gray-300">
      <div className="mt-4 mb-8 flex flex-col space-y-4">
        {hasHeader ? <Header /> : null}
        {hasNavbar ? <Navbar currentPage={navbarPage} /> : null}
      </div>

      <main className="flex w-full grow px-6 xl:px-0">{children}</main>
    </div>
  </div>
);

export default PageContainer;
