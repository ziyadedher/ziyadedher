// eslint-disable-next-line import/no-unassigned-import, node/file-extension-in-import -- Tailwind CSS exception.
import "tailwindcss/tailwind.css";

import React from "react";

interface LayoutProps {
  readonly children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
