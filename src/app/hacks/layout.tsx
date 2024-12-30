import { HacksContainer } from "@/views/containers";

export const metadata = {
  title: "ziyad's hacks · Ziyad Edher",
  description:
    "Collection of hacks, tools, and throwaway projects by Ziyad Edher that don't really fit anywhere else.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <HacksContainer hasHeader hasNavbar navbarPage="hacks">
    {children}
  </HacksContainer>
);

export default Layout;
