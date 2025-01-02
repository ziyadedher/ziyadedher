import {
  Fira_Code,
  Noto_Sans,
  Noto_Sans_Arabic,
  Noto_Serif,
} from "next/font/google";

export const sans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export const serif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});

export const monospace = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

export const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
});
