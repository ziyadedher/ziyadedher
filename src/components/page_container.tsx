import cx from "classnames";
import React from "react";

import Header from "./header";
import Navbar from "./navbar";

import type { NavbarPage } from "./navbar";

enum PageStyle {
  LIGHT = "",
  DARK = "dark",
  HACKER = "text-green-500 bg-gray-900",
}
interface PageContainerProps {
  readonly children: React.ReactNode;
  readonly hasHeader?: boolean;
  readonly hasNavbar?: boolean;
  readonly navbarPage?: NavbarPage | null;
  readonly pageStyle?: PageStyle;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  children,
  hasHeader = true,
  hasNavbar = true,
  navbarPage = null,
  pageStyle = PageStyle.LIGHT,
}) => (
  <div className={cx("flex flex-col min-h-screen items-center", pageStyle)}>
    <div className="flex w-full grow flex-col items-center dark:bg-gray-900 dark:text-gray-300">
      <div className="mt-4 mb-8 flex flex-col space-y-4">
        {hasHeader ? <Header /> : null}
        {hasNavbar ? <Navbar currentPage={navbarPage} /> : null}
      </div>

      <main className="flex w-full grow px-6 xl:px-0">{children}</main>
    </div>
  </div>
);

export { PageStyle };
export default PageContainer;
