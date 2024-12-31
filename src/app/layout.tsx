import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans, Noto_Sans_Arabic } from "next/font/google";

const font = Noto_Sans({
  subsets: ["latin", "latin-ext"],
});
const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
});

export const metadata = {
  title: "ziyad's corner · Ziyad Edher",
  description:
    "Personal website of Ziyad Edher (software engineer and broad-spectrum nerd) showing off cool projects in security, AI, applied cryptography, and performance.",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${font.className} ${fontArabic.className}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
