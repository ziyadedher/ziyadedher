import { Metadata as NextMetadata } from "next";

import type { StaticImageData } from "next/image";

export type Metadata = {
  readonly page: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: Date;
  readonly modifiedAt?: Date;
};

export type ImageWithAlt = StaticImageData & { alt: string };

export const constructNextMetadata = (
  { page, title, description, publishedAt, modifiedAt }: Metadata,
  coverImage: ImageWithAlt
): NextMetadata => ({
  title: `${title} | Ziyad Edher's Blog`,
  description,
  openGraph: {
    type: "article",
    url: `https://ziyadedher.com/blog/${page}`,
    title,
    description,
    images: [
      {
        url: coverImage.src,
        width: coverImage.width,
        height: coverImage.height,
        alt: coverImage.alt,
      },
    ],
    publishedTime: publishedAt.toISOString(),
    modifiedTime: modifiedAt?.toISOString(),
  },
});
