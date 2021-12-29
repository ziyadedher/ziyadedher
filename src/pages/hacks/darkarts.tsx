import cx from "classnames";
import Head from "next/head";
import { InferenceSession, Tensor, env } from "onnxruntime-web";
import {
  CloudArrowDown,
  Smiley,
  SpinnerGap,
  WarningOctagon,
} from "phosphor-react";
import { MersenneTwister19937, Random } from "random-js";
import React, { useCallback, useEffect, useRef, useState } from "react";

import RangeSliderInput from "../../components/inputs/range_slider";
import PageContainer, { PageStyle } from "../../components/page_container";
import { getStorageURI } from "../../lib/storage";

import type { NextPage } from "next";

interface Generator {
  readonly generator: InferenceSession;
}

const LayerKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
type LayerKey = typeof LayerKeys[number];

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
  generator: Generator,
  seed: number,
  offset: number,
  fixedSeed: number,
  fixedLayers: Readonly<ReadonlySet<LayerKey>>
): Promise<ImageData> => {
  const randLats = new Random(MersenneTwister19937.seed(seed));
  const randLatsOffset = new Random(
    MersenneTwister19937.seed(offset > 0 ? seed + 1 : seed - 1)
  );
  const randFixed = new Random(MersenneTwister19937.seed(fixedSeed));

  const lats = new Tensor(
    new Float32Array(
      new Array(2 * 512)
        .fill(0)
        .map((_, i) => (i < 512 ? randn(randLats) : randn(randLatsOffset)))
    ),
    [2, 512]
  );
  const latWeights = new Tensor(
    new Float32Array([1 - Math.abs(offset), Math.abs(offset)]),
    [2]
  );

  const stylemix = new Tensor(
    new Float32Array(new Array(512).fill(0).map(() => randn(randFixed))),
    [512]
  );
  const stylemixIdx = new Tensor(new Int32Array(new Array(14).fill(0)), [14]);
  fixedLayers.forEach((fixedLayer) => {
    stylemixIdx.data[fixedLayer] = 1;
  });

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

enum ModelStatus {
  READY_TO_LOAD = 0,
  LOADING = 1,
  READY = 2,
  GENERATING = 3,
  ERROR = 4,
}

interface GeneratedImageCanvasProps {
  readonly modelStatus: ModelStatus;
  readonly imageData: ImageData | null;
}

const GeneratedImageCanvas: React.FunctionComponent<
  GeneratedImageCanvasProps
> = ({ modelStatus, imageData }: GeneratedImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPlaceholderTexts = useCallback((): {
    title: string;
    subtitle: string;
  } => {
    switch (modelStatus) {
      case ModelStatus.READY_TO_LOAD:
        return {
          title: "Load the model.",
          subtitle:
            'Click on "Load" below to download and initialize the AI model.',
        };
      case ModelStatus.LOADING:
        return {
          title: "Loading the model...",
          subtitle: "Please wait while the model is feteched and loaded.",
        };
      case ModelStatus.READY:
        return {
          title: "Generate an image!",
          subtitle: 'Click on "Generate" below to generate an image.',
        };
      case ModelStatus.GENERATING:
        return {
          title: "Generating an image...",
          subtitle:
            "Please wait while the image is generated. This page might not be responsive in the meantime. This takes a few seconds.",
        };
      default:
        return {
          title: "Something went wrong.",
          subtitle:
            "Please try again. If the issue persists please contact me.",
        };
    }
  }, [modelStatus]);

  const getPlaceholderText = useCallback(() => {
    const { title, subtitle } = getPlaceholderTexts();

    return (
      <>
        <p className="mt-2 text-base font-bold leading-6">{title}</p>
        <p className="text-sm">{subtitle}</p>
      </>
    );
  }, [getPlaceholderTexts]);

  const getPlaceholderIcon = useCallback(() => {
    switch (modelStatus) {
      case ModelStatus.READY_TO_LOAD:
        return <CloudArrowDown size={64} />;
      case ModelStatus.LOADING:
        return <SpinnerGap size={64} />;
      case ModelStatus.READY:
        return <Smiley size={64} />;
      case ModelStatus.GENERATING:
        return <SpinnerGap size={64} />;
      default:
        return <WarningOctagon size={64} />;
    }
  }, [modelStatus]);

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

  return (
    <div className="overflow-hidden relative w-full rounded-lg">
      <canvas ref={canvasRef} width={256} height={256} className="w-full" />
      <div
        className={cx(
          "flex absolute top-0 left-0 z-10 flex-col justify-center items-center p-16 w-full h-full text-center bg-gray-800",
          imageData === null ? null : "opacity-0"
        )}
      >
        {getPlaceholderIcon()}
        {getPlaceholderText()}
      </div>
    </div>
  );
};
interface ModelStatusTextProps {
  readonly modelStatus: ModelStatus;
}

const ModelStatusText: React.FunctionComponent<ModelStatusTextProps> = ({
  modelStatus,
}: ModelStatusTextProps) => {
  const getModelStatusText = useCallback((): string => {
    switch (modelStatus) {
      case ModelStatus.READY_TO_LOAD:
        return "Click 'Load' to load the model.";
      case ModelStatus.LOADING:
        return "Loading...";
      case ModelStatus.READY:
        return "Ready! Click 'Generate' to generate an image.";
      case ModelStatus.GENERATING:
        return "Generating... this page may not be responsive.";
      case ModelStatus.ERROR:
        return "Error! :(";
      default:
        return "Unknown???";
    }
  }, [modelStatus]);

  const getModelStatusClassNames = useCallback((): string => {
    switch (modelStatus) {
      case ModelStatus.READY_TO_LOAD:
        return "text-gray-500";
      case ModelStatus.LOADING:
        return "text-yellow-500";
      case ModelStatus.READY:
        return "text-green-500";
      case ModelStatus.GENERATING:
        return "text-yellow-500";
      case ModelStatus.ERROR:
        return "text-red-500";
      default:
        return "text-red-500";
    }
  }, [modelStatus]);

  return (
    <p
      className={cx(
        "text-center text-xs opacity-70",
        getModelStatusClassNames()
      )}
    >
      {getModelStatusText()}
    </p>
  );
};

const Darkarts: NextPage = () => {
  const [generator, setGenerator] = useState<Generator | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const [seed, setSeed] = useState(Math.round(Math.random() * 200 - 100));
  const [offset, setOffset] = useState(
    Math.round(Math.random() * 200 - 100) / 100
  );
  const [fixedLayers, setFixedLayers] = useState<ReadonlySet<LayerKey>>(
    new Set()
  );
  const [fixedSeed, setFixedSeed] = useState(
    Math.round(Math.random() * 200 - 100)
  );

  const [modelStatus, setModelStatus] = useState(ModelStatus.READY_TO_LOAD);

  const isGeneratorAvailable = generator !== null;

  const generateImage = useCallback(async (): Promise<void> => {
    if (generator === null) {
      return;
    }

    setImageData(
      await generateImageData(generator, seed, offset, fixedSeed, fixedLayers)
    );
  }, [generator, seed, offset, fixedSeed, fixedLayers]);

  const handleSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setSeed(Number(e.target.value));
    }, []);

  const handleOffsetChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setOffset(Number(e.target.value));
    }, []);

  const handleFixedLayersChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const newFixedLayers = new Set(fixedLayers);
        if (e.target.checked) {
          newFixedLayers.add(Number(e.target.value) as LayerKey);
        } else {
          newFixedLayers["delete"](Number(e.target.value) as LayerKey);
        }
        setFixedLayers(newFixedLayers);
      },
      [fixedLayers]
    );

  const handleFixedSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setFixedSeed(Number(e.target.value));
    }, []);

  const handleLoadGeneratorClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      setModelStatus(ModelStatus.LOADING);
      setGenerator(
        await getGenerator(
          getStorageURI(
            "darkarts/models/onnx/stylegan2-ffhq-256x256.generator.onnx.pb"
          )
        )
      );
      setModelStatus(ModelStatus.READY);
    }, []);

  const handleGenerateImageClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setModelStatus(ModelStatus.GENERATING);
      setTimeout(async () => {
        await generateImage();
        setModelStatus(ModelStatus.READY);
      }, 50);
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
        <div className="flex flex-col gap-16 mx-auto max-w-3xl">
          <div>
            <h1 className="text-3xl leading-8 text-center">
              Face generation using GANs
            </h1>
            <p className="text-base text-justify">
              This is a demo of a face generation system using a generative
              adversarial network (a.k.a. GAN). The GAN used is StyleGAN2. None
              of the images created here are real faces. They are all AI
              generated. Play around with the model below. Note, running the
              model may cause this page to be temporarily non-responsive.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start w-full">
            <div className="flex flex-col space-y-4 w-1/2">
              <div className="mb-2">
                <h2 className="font-bold">Settings</h2>
                <p className="text-sm text-justify">
                  Use these settings to manipulate the image and create a new
                  one. Hover over each setting to see what it does.
                </p>
              </div>

              <div className="flex flex-row items-center space-x-4">
                <label
                  htmlFor="seed-input"
                  className="w-24 text-sm font-bold uppercase"
                >
                  Seed
                </label>
                <div className="inline-flex flex-1 items-center">
                  <RangeSliderInput
                    id="seed-input"
                    value={seed}
                    min={-100}
                    max={100}
                    onChange={handleSeedChange}
                  />
                </div>
                <label htmlFor="seed-input" className="w-8 text-sm font-bold">
                  {seed}
                </label>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <label
                  htmlFor="offset-input"
                  className="w-24 text-sm font-bold uppercase"
                >
                  Offset
                </label>
                <div className="inline-flex flex-1 items-center">
                  <RangeSliderInput
                    id="offset-input"
                    value={offset}
                    min={-1}
                    max={1}
                    step={0.01}
                    onChange={handleOffsetChange}
                  />
                </div>
                <label htmlFor="offset-input" className="w-8 text-sm font-bold">
                  {offset}
                </label>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <p className="w-24 text-sm font-bold uppercase">Fixed Layers</p>
                <div className="grid grid-cols-7 gap-2 items-center">
                  {LayerKeys.map((layerKey) => (
                    <input
                      key={layerKey}
                      value={layerKey}
                      checked={fixedLayers.has(layerKey)}
                      type="checkbox"
                      onChange={handleFixedLayersChange}
                      className="w-4 h-4 hover:bg-gray-300 rounded cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <label
                  htmlFor="fixedseed-input"
                  className="w-24 text-sm font-bold uppercase"
                >
                  Fixed Seed
                </label>
                <div className="inline-flex flex-1 items-center">
                  <RangeSliderInput
                    id="fixedseed-input"
                    value={fixedSeed}
                    min={-100}
                    max={100}
                    step={1}
                    onChange={handleFixedSeedChange}
                  />
                </div>
                <label
                  htmlFor="fixedseed-input"
                  className="w-8 text-sm font-bold"
                >
                  {fixedSeed}
                </label>
              </div>
            </div>

            <div className="flex flex-col flex-shrink-0 space-y-4 w-1/2">
              <GeneratedImageCanvas
                modelStatus={modelStatus}
                imageData={imageData}
              />
              <div className="flex flex-row space-x-4">
                <button
                  type="button"
                  onClick={handleLoadGeneratorClick}
                  className="py-2 px-4 text-gray-50 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 rounded-lg cursor-pointer"
                >
                  Load
                </button>

                <button
                  type="button"
                  disabled={!isGeneratorAvailable}
                  onClick={handleGenerateImageClick}
                  className={cx(
                    "py-2 px-4 text-gray-50 bg-gray-600 rounded-lg flex-1",
                    isGeneratorAvailable
                      ? "hover:bg-gray-700 active:bg-gray-800 cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                  )}
                >
                  Generate
                </button>
              </div>
              <ModelStatusText modelStatus={modelStatus} />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default Darkarts;
