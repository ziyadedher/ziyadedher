import NextImage from "next/image";
import React from "react";

import type { ImageWithBlur } from "../logic/image_with_blur";

type LayoutValue = "fill" | "fixed" | "intrinsic" | "responsive";
interface ImageProps {
  readonly alt: string;
  readonly image: ImageWithBlur;
  readonly shouldUseBlur?: boolean;
  readonly layout?: LayoutValue;
}

// eslint-disable-next-line @typescript-eslint/no-shadow -- wrapper around Next.js Image
const Image: React.FunctionComponent<ImageProps> = ({
  alt,
  image,
  shouldUseBlur = true,
  layout,
}: ImageProps) => (
  <NextImage
    alt={alt}
    src={image.url}
    width={image.width}
    height={image.height}
    placeholder={shouldUseBlur ? "blur" : "empty"}
    blurDataURL={image.blurData}
    layout={layout}
  />
);

export default Image;
