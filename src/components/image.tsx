import NextImage from "next/image";
import React from "react";

import type { ImageWithBlur } from "../logic/image_with_blur";

interface ImageProps {
  readonly alt: string;
  readonly image: ImageWithBlur;
}

// eslint-disable-next-line @typescript-eslint/no-shadow -- wrapper around Next.js Image
const Image: React.FunctionComponent<ImageProps> = ({
  alt,
  image,
}: ImageProps) => (
  <NextImage
    alt={alt}
    src={image.url}
    width={image.width}
    height={image.height}
    placeholder="blur"
    blurDataURL={image.blurData}
  />
);

export default Image;
