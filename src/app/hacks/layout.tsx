import { PageContainer } from "@/views/containers";

export const metadata = {
  title: "ziyad's hacks · Ziyad Edher",
  description:
    "Collection of hacks, tools, and throwaway projects by Ziyad Edher that don't really fit anywhere else.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <PageContainer hasHeader hasNavbar navbarPage="hacks" pageStyle="hacker">
    {children}
  </PageContainer>
);

export default Layout;
