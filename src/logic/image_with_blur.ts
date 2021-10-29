import { getPlaiceholder } from "plaiceholder";

interface ImageWithBlur {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly blurData: string;
}

const getImageWithBlur = async (url: string): Promise<ImageWithBlur> => {
  const result = await getPlaiceholder(url);
  return {
    url: result.img.src,
    width: result.img.width,
    height: result.img.height,
    blurData: result.base64,
  };
};

export { getImageWithBlur };
export type { ImageWithBlur };
