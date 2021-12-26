import cx from "classnames";
import Head from "next/head";
import { InferenceSession, env } from "onnxruntime-web";
import React, { useCallback, useEffect, useRef, useState } from "react";

import PageContainer, { PageStyle } from "../../components/page_container";

import type { NextPage } from "next";

interface Generator {
  readonly generator: InferenceSession;
}

const getGenerator = async (generatorModelPath: string): Promise<Generator> => {
  env.wasm.wasmPaths = {
    "ort-wasm.wasm":
      "https://storage.ziyadedher.com/darkarts/onnxruntime/ort-wasm.wasm",
    "ort-wasm-threaded.wasm":
      "https://storage.ziyadedher.com/darkarts/onnxruntime/ort-wasm-threaded.wasm",
    "ort-wasm-simd.wasm":
      "https://storage.ziyadedher.com/darkarts/onnxruntime/ort-wasm-simd.wasm",
    "ort-wasm-simd-threaded.wasm":
      "https://storage.ziyadedher.com/darkarts/onnxruntime/ort-wasm-simd-threaded.wasm",
  };

  return {
    generator: await InferenceSession.create(generatorModelPath, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    }),
  };
};

const generateImageData = async (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- ONNXRuntime API
  generator: Generator
): Promise<ImageData> => {
  const rawImg = (await generator.generator.run({}))[3738];
  if (typeof rawImg === "undefined") {
    throw new Error("Failed to generate image.");
  }

  const img = new Uint8ClampedArray(rawImg.data as Uint8Array);

  return new ImageData(img, 256, 256);
};

const Darkarts: NextPage = () => {
  const [generator, setGenerator] = useState<Generator | null>(null);
  const [shouldGenerateImage, setShouldGenerateImage] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      setGenerator(
        await getGenerator(
          "https://storage.ziyadedher.com/darkarts/models/onnx/stylegan2-ffhq-256x256.generator.onnx.pb"
        )
      );
    })().then(
      () => {
        console.log("Model loaded!");
      },
      (e) => {
        throw e;
      }
    );
  }, []);

  useEffect(() => {
    if (canvasRef.current === null || imageData === null) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (ctx === null) {
      throw new Error("Failed to get canvas context");
    }
    canvasRef.current.width = imageData.width;
    canvasRef.current.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
  }, [imageData]);

  useEffect(() => {
    if (generator === null || !shouldGenerateImage) {
      return;
    }
    setShouldGenerateImage(false);
    const start = performance.now();
    generateImageData(generator).then(
      (imgData) => {
        setImageData(imgData);
      },
      (e) => {
        throw e;
      }
    );
    const end = performance.now();
    console.log(`Time taken: ${end - start} ms`);
  }, [generator, shouldGenerateImage]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setShouldGenerateImage(true);
    }, []);

  return (
    <>
      <Head>
        <title>Dark Arts | TODO</title>
        <meta name="description" content="TODO" />
      </Head>

      <PageContainer
        hasHeader
        hasNavbar
        navbarPage={null}
        pageStyle={PageStyle.HACKER}
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            type="button"
            disabled={generator === null}
            onClick={handleClick}
            className={cx(
              "py-2 px-4 text-gray-50 bg-gray-600 rounded-lg",
              generator === null
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-700 active:bg-gray-800 cursor-pointer"
            )}
          >
            Click me!
          </button>

          <canvas ref={canvasRef} className="w-1/4" />
        </div>
      </PageContainer>
    </>
  );
};

export default Darkarts;
