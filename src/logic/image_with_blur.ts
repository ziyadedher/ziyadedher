import { getPlaiceholder } from "plaiceholder";

type BlurQuality = 8 | 16 | 24 | 32 | 40;

interface ImageWithBlur {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly blurData: string;
}

const getImageWithBlur = async (
  url: string,
  blurQuality: BlurQuality = 16
): Promise<ImageWithBlur> => {
  const result = await getPlaiceholder(url, { size: blurQuality });
  return {
    url: result.img.src,
    width: result.img.width,
    height: result.img.height,
    blurData: result.base64,
  };
};

export { getImageWithBlur };
export type { ImageWithBlur };
