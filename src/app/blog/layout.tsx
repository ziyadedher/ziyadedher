import PageContainer from "@/components/page_container";

export const metadata = {
  title: "Ziyad Edher's Blog",
  description:
    "Ziyad writes about nerd stuff: security, technology, hacking, you name it.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <PageContainer hasHeader hasNavbar navbarPage="blog" pageStyle="light">
    {children}
  </PageContainer>
);

export default Layout;
