import { HacksContainer } from "@/views/containers";

export const metadata = {
  title: "dark arts · Ziyad Edher",
  description:
    "Generate AI faces online by using a GAN (generative adversarial network) that runs in your browser.",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <HacksContainer hasHeader hasNavbar navbarPage="hacks">
      {children}
    </HacksContainer>
  );
}
