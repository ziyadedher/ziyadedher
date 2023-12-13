import PageContainer from "@/components/page_container";

export const metadata = {
  title: "Hacks | Ziyad Edher",
  description:
    "Hacks I've built for fun. Usually related to security, AI, or cryptography. Almost always useless.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <PageContainer hasHeader hasNavbar navbarPage="hacks" pageStyle="hacker">
    {children}
  </PageContainer>
);

export default Layout;
