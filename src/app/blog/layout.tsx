import { ArticleContainer } from "@/views/containers";

export const metadata = {
  title: "ziyad's blog · Ziyad Edher",
  description:
    "Personal blog of Ziyad Edher (software engineer and broad-spectrum nerd) mostly talking about technology.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <ArticleContainer hasHeader hasNavbar navbarPage="blog">
    {children}
  </ArticleContainer>
);

export default Layout;
