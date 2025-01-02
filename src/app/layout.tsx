import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import * as fonts from "@/utils/fonts";

export const metadata = {
  title: "ziyad's corner · Ziyad Edher",
  description:
    "Personal website of Ziyad Edher (software engineer and broad-spectrum nerd) showing off cool projects in security, AI, applied cryptography, and performance.",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`font-sans ${fonts.sans.variable} ${fonts.serif.variable} ${fonts.monospace.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
