import { HacksContainer } from "@/views/containers";

export const metadata = {
  title: "Log4Shell Public Bug Bounty Specials | Ziyad Edher",
  description:
    "List of companies with public bug bounty specials for Log4Shell (CVE-2021-44228). Log4Shell is an RCE vulnerability in the very popular Log4J logging library.",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <HacksContainer hasHeader hasNavbar navbarPage="hacks">
      {children}
    </HacksContainer>
  );
}
