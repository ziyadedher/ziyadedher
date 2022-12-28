import { getPlaiceholder } from "plaiceholder";

import { getImageWithBlur } from "./image_with_blur";

jest.mock("plaiceholder");

const setupGetPlaiceholderMock = (): jest.MockedFunction<
  typeof getPlaiceholder
> => {
  const mockGetPlaiceholder = getPlaiceholder as jest.MockedFunction<
    typeof getPlaiceholder
  >;
  mockGetPlaiceholder.mockImplementation(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- TImage
    async (url) =>
      await Promise.resolve({
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
      })
  );
  return mockGetPlaiceholder;
};

describe("image with blur", () => {
  describe("getPlaiceholder", () => {
    test("gets called once", async () => {
      const mockGetPlaiceholder = setupGetPlaiceholderMock();
      await getImageWithBlur("https://example.com/image.png");
      expect(mockGetPlaiceholder).toHaveBeenCalledTimes(1);
    });

    test("gets called with correct arguments", async () => {
      const mockGetPlaiceholder = setupGetPlaiceholderMock();
      await getImageWithBlur("https://example.com/image.png", 16);
      expect(mockGetPlaiceholder).toHaveBeenCalledWith(
        "https://example.com/image.png",
        { size: 16 }
      );
    });
  });

  test("packages plaiceholder data", async () => {
    setupGetPlaiceholderMock();
    const image = await getImageWithBlur("https://example.com/image.png");
    expect(image).toStrictEqual({
      url: "https://example.com/image.png",
      width: 32,
      height: 64,
      blurData: "base64",
    });
  });
});
