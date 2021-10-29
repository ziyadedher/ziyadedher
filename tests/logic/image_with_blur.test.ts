import { getPlaiceholder } from "plaiceholder";

import { getImageWithBlur } from "../../src/logic/image_with_blur";

jest.mock("plaiceholder");
const mockGetPlaiceholder = getPlaiceholder as jest.MockedFunction<
  typeof getPlaiceholder
>;
mockGetPlaiceholder.mockImplementation(async (url, _) => ({
  img: {
    src: url.toString(),
    width: 32,
    height: 64,
  },
  base64: "base64",
  blurhash: {
    hash: "",
    width: 0,
    height: 0,
  },
  css: {
    backgroundImage: "",
    backgroundSize: "",
    backgroundPosition: "",
    backgroundRepeat: "",
  },
  svg: [
    "svg",
    {
      viewBox: "",
      width: "",
      height: "",
      shapeRendering: "",
      preserveAspectRatio: "",
      style: "",
      xmlns: "",
    },
    [],
  ],
}));

describe("image with blur", () => {
  test("packages plaiceholder data", async () => {
    const image = await getImageWithBlur("http://example.com/image.png");
    expect(image).toEqual({
      url: "http://example.com/image.png",
      width: 32,
      height: 64,
      blurData: "base64",
    });
  });
});
