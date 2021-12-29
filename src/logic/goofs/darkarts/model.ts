import { InferenceSession, Tensor, env } from "onnxruntime-web";
import { MersenneTwister19937, Random } from "random-js";

import { getStorageURI } from "../../../lib/storage";

const LayerKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
type LayerKey = typeof LayerKeys[number];

interface Model {
  readonly generator: InferenceSession;
}

const getModel = async (modelPath: string): Promise<Model> => {
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

  const generator = await InferenceSession.create(modelPath, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });

  return {
    generator,
  };
};

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Random.js API
const randn = (rand: Random): number => {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand.realZeroToOneInclusive();
  while (v === 0) v = rand.realZeroToOneInclusive();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const generateImageData = async (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- ONNXRuntime API
  model: Model,
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not using index.
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

  if (model.generator.outputNames.length > 1) {
    throw new Error("Generator has more than one output.");
  }

  const outputName = model.generator.outputNames[0];
  if (typeof outputName === "undefined") {
    throw new Error("Generator has no outputs.");
  }

  const rawImg = (await model.generator.run(input))[outputName];
  if (typeof rawImg === "undefined") {
    throw new Error("Failed to generate image.");
  }

  const img = new Uint8ClampedArray(rawImg.data as Uint8Array);
  return new ImageData(img, 256, 256);
};

export { getModel, generateImageData, LayerKeys };
export type { Model, LayerKey };
