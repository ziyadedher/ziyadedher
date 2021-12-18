import cx from "classnames";
import React from "react";

import Header from "./header";
import Navbar from "./navbar";

import type { NavbarPage } from "./navbar";

enum PageStyle {
  LIGHT = "",
  HACKER = "text-green-500 bg-gray-900",
}
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
  pageStyle = PageStyle.LIGHT,
}: PageContainerProps) => (
  <div className={cx("min-h-screen", pageStyle)}>
    <div className="container flex flex-col items-center mx-auto">
      <div className="flex flex-col my-8 space-y-4">
        {hasHeader ? <Header /> : null}
        {hasNavbar ? <Navbar currentPage={navbarPage} /> : null}
      </div>

      <main className="container px-6 xl:px-0 w-full">{children}</main>
    </div>
  </div>
);

export { PageStyle };
export default PageContainer;
