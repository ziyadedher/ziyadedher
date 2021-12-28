import cx from "classnames";
import Head from "next/head";
import { InferenceSession, Tensor, env } from "onnxruntime-web";
import { MersenneTwister19937, Random } from "random-js";
import React, { useCallback, useEffect, useRef, useState } from "react";

import PageContainer, { PageStyle } from "../../components/page_container";
import { getStorageURI } from "../../lib/storage";

import type { NextPage } from "next";

interface Generator {
  readonly generator: InferenceSession;
}

const getGenerator = async (generatorModelPath: string): Promise<Generator> => {
  env.wasm.wasmPaths = {
    "ort-wasm.wasm": getStorageURI("darkarts/onnxruntime/ort-wasm.wasm"),
    "ort-wasm-threaded.wasm": getStorageURI(
      "darkarts/onnxruntime/ort-wasm-threaded.wasm"
    ),
    "ort-wasm-simd.wasm": getStorageURI(
      "darkarts/onnxruntime/ort-wasm-simd.wasm"
    ),
    "ort-wasm-simd-threaded.wasm": getStorageURI(
      "darkarts/onnxruntime/ort-wasm-simd-threaded.wasm"
    ),
  };

  const generator = await InferenceSession.create(generatorModelPath, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });

  return {
    generator,
  };
};

const randn = (rand: Random): number => {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand.realZeroToOneInclusive();
  while (v === 0) v = rand.realZeroToOneInclusive();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const generateImageData = async (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- ONNXRuntime API
  generator: Generator
): Promise<ImageData> => {
  const rand = new Random(MersenneTwister19937.seed(1341));

  const lats = new Tensor(
    new Float32Array(new Array(512 * 2).fill(0).map(() => randn(rand))),
    [2, 512]
  );
  const latWeights = new Tensor(new Float32Array([1, 0]), [2]);

  const stylemix = new Tensor(
    new Float32Array(new Array(512).fill(0).map(() => randn(rand))),
    [512]
  );
  const stylemixIdx = new Tensor(new Int32Array(new Array(14).fill(0)), [14]);

  const input = {
    0: lats,
    1: latWeights,
    2: stylemix,
    3: stylemixIdx,
  };

  if (generator.generator.outputNames.length > 1) {
    throw new Error("Generator has more than one output.");
  }

  const outputName = generator.generator.outputNames[0];
  if (typeof outputName === "undefined") {
    throw new Error("Generator has no outputs.");
  }

  const rawImg = (await generator.generator.run(input))[outputName];
  if (typeof rawImg === "undefined") {
    throw new Error("Failed to generate image.");
  }

  const img = new Uint8ClampedArray(rawImg.data as Uint8Array);
  return new ImageData(img, 256, 256);
};

const Darkarts: NextPage = () => {
  const [generator, setGenerator] = useState<Generator | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isGeneratorAvailable = generator !== null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (imageData === null || canvas === null) {
      return;
    }

    const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);
  }, [imageData]);

  const generateImage = useCallback(async (): Promise<void> => {
    if (generator === null) {
      return;
    }

    const start = performance.now();
    setImageData(await generateImageData(generator));
    const end = performance.now();
    console.log(`Time taken: ${end - start} ms`);
  }, [generator]);

  const handleLoadGeneratorClick: React.MouseEventHandler =
    useCallback(async () => {
      setGenerator(
        await getGenerator(
          getStorageURI(
            "darkarts/models/onnx/stylegan2-ffhq-256x256.generator.onnx.pb"
          )
        )
      );
    }, []);

  const handleGenerateImageClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      await generateImage();
    }, [generateImage]);

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
            onClick={handleLoadGeneratorClick}
            className={cx(
              "py-2 px-4 text-gray-50 bg-gray-600 rounded-lg hover:bg-gray-700 active:bg-gray-800 cursor-pointer"
            )}
          >
            Load generator...
          </button>

          <button
            type="button"
            disabled={!isGeneratorAvailable}
            onClick={handleGenerateImageClick}
            className={cx(
              "py-2 px-4 text-gray-50 bg-gray-600 rounded-lg",
              isGeneratorAvailable
                ? "hover:bg-gray-700 active:bg-gray-800 cursor-pointer"
                : "cursor-not-allowed opacity-50"
            )}
          >
            Generate image...
          </button>

          <div className="overflow-hidden w-1/3 rounded-lg">
            <canvas ref={canvasRef} className="w-full" />
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default Darkarts;
