import { InferenceSession, Tensor, env } from "onnxruntime-web";
import { MersenneTwister19937, Random } from "random-js";

import { getStorageURI } from "../../../utils/storage";

const LayerKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
type LayerKey = typeof LayerKeys[number];
type LayerValues<T> = Readonly<Record<LayerKey, T>>;

interface Model {
  readonly generator: InferenceSession;
}

interface ModelParameters {
  readonly inputLatentsSeeds: LayerValues<number>;
  readonly intermediateLatentsDistortionSeeds: LayerValues<number>;
  readonly intermediateLatentsDistortionStrengths: LayerValues<number>;
}
interface ModelInputs extends InferenceSession.OnnxValueMapType {
  readonly inputLatents: Tensor;
  readonly inputLatentsWeights: Tensor;
  readonly intermediateLatentsDistortions: Tensor;
}

class InputError extends Error {}

class ModelError extends Error {}

const getModel = async (modelPath: string): Promise<Model> => {
  env.wasm.wasmPaths = {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- ONNX convention
    "ort-wasm.wasm": getStorageURI("darkarts/onnxruntime/ort-wasm.wasm"),
    // eslint-disable-next-line @typescript-eslint/naming-convention -- ONNX convention
    "ort-wasm-threaded.wasm": getStorageURI(
      "darkarts/onnxruntime/ort-wasm-threaded.wasm"
    ),
    // eslint-disable-next-line @typescript-eslint/naming-convention -- ONNX convention
    "ort-wasm-simd.wasm": getStorageURI(
      "darkarts/onnxruntime/ort-wasm-simd.wasm"
    ),
    // eslint-disable-next-line @typescript-eslint/naming-convention -- ONNX convention
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

const generateInputs = ({
  inputLatentsSeeds,
  intermediateLatentsDistortionSeeds,
  intermediateLatentsDistortionStrengths,
}: ModelParameters): ModelInputs => {
  const inputLatents = new Tensor(new Float32Array(28 * 512), [28, 512]);
  const inputLatentsWeights = new Tensor(new Float32Array(14 * 1), [14, 1]);
  const intermediateLatentsDistortions = new Tensor(
    new Float32Array(14 * 512),
    [14, 512]
  );

  for (const layerKey of LayerKeys) {
    const seed = inputLatentsSeeds[layerKey];
    if (typeof seed === "undefined") {
      throw new InputError(`Undefined value in inputLatentsSeeds array.`);
    }

    const intSeed = Math.floor(seed);

    const intSeed0 = intSeed;
    const rand0 = new Random(MersenneTwister19937.seed(intSeed0));
    const rand0Values = new Float32Array(
      new Array(512).fill(0).map(() => randn(rand0))
    );
    inputLatents.data.set(rand0Values, 2 * layerKey * 512);

    const intSeed1 = intSeed + 1;
    const rand1 = new Random(MersenneTwister19937.seed(intSeed1));
    const rand1Values = new Float32Array(
      new Array(512).fill(0).map(() => randn(rand1))
    );
    inputLatents.data.set(rand1Values, (2 * layerKey + 1) * 512);

    const floatSeed = seed - intSeed;
    const weight = 1 - floatSeed;
    inputLatentsWeights.data.set(new Float32Array([weight]), layerKey);
  }

  for (const layerKey of LayerKeys) {
    const seed = intermediateLatentsDistortionSeeds[layerKey];
    if (typeof seed === "undefined") {
      throw new InputError(
        `Undefined value in intermediateLatentsDistortionSeeds array.`
      );
    }

    const strength = intermediateLatentsDistortionStrengths[layerKey];
    if (typeof strength === "undefined") {
      throw new InputError(
        `Undefined value in intermediateLatentsDistortionStrengths array.`
      );
    }

    const intSeed = Math.floor(seed);

    const intSeed0 = intSeed;
    const intSeed1 = intSeed + 1;
    const rand0 = new Random(MersenneTwister19937.seed(intSeed0));
    const rand1 = new Random(MersenneTwister19937.seed(intSeed1));
    const rand0Values = new Float32Array(
      new Array(512)
        .fill(0)
        .map(() => strength * ((randn(rand0) + randn(rand1)) / 2))
    );
    intermediateLatentsDistortions.data.set(rand0Values, layerKey * 512);
  }

  return {
    inputLatents,
    inputLatentsWeights,
    intermediateLatentsDistortions,
  };
};

const generateImageData = async (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- ONNXRuntime API
  model: Model,
  parameters: ModelParameters
): Promise<ImageData> => {
  if (model.generator.outputNames.length > 1) {
    throw new ModelError("Generator has more than one output.");
  }
  const outputName = model.generator.outputNames[0];
  if (typeof outputName === "undefined") {
    throw new ModelError("Generator has no outputs.");
  }

  const inputs = generateInputs(parameters);

  let output: InferenceSession.OnnxValueMapType;
  try {
    output = await model.generator.run(inputs);
  } catch (e: unknown) {
    throw new ModelError((e as Error).message);
  }

  const rawImg = output[outputName];
  if (typeof rawImg === "undefined") {
    throw new ModelError("Failed to generate image.");
  }

  const img = new Uint8ClampedArray(rawImg.data as Uint8Array);
  return new ImageData(img, 256, 256);
};

export { getModel, generateImageData, LayerKeys };
export type { Model, ModelParameters, LayerKey, LayerValues };
