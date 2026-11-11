import {
  Fira_Code,
  Noto_Sans,
  Noto_Sans_Arabic,
  Noto_Serif,
} from "next/font/google";

export const sans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto-sans",
});

export const serif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto-serif",
});

export const monospace = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fira-code",
});

export const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
});
