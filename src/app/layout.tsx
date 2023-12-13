import "tailwindcss/tailwind.css";

export const metadata = {
  title: "Ziyad Edher | Software Engineer",
  description:
    "I build and break things in AI, cryptography, infrastructure, and security lands.",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
