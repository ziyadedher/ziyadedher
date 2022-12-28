import React from "react";

import PageContainer from "../../components/page_container";

interface LayoutProps {
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <PageContainer hasHeader hasNavbar navbarPage="hacks" pageStyle="hacker">
    {children}
  </PageContainer>
);

export default Layout;
