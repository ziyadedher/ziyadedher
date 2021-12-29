import cx from "classnames";
import Head from "next/head";
import React, { useCallback, useState } from "react";

import GeneratedImageCanvas, {
  ModelStatus,
} from "../../components/goofs/darkarts/generated_image_canvas";
import RangeSliderInput from "../../components/inputs/range_slider";
import PageContainer, { PageStyle } from "../../components/page_container";
import { getStorageURI } from "../../lib/storage";
import {
  LayerKeys,
  generateImageData,
  getModel,
} from "../../logic/goofs/darkarts/model";

import type { LayerKey, Model } from "../../logic/goofs/darkarts/model";
import type { NextPage } from "next";

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

interface SettingItemProps {
  readonly label: string;
  readonly labelFor?: string;
  readonly value?: number | string;
  readonly children?: React.ReactNode;
}

const SettingItem: React.FunctionComponent<SettingItemProps> = ({
  label,
  labelFor,
  value,
  children,
}: SettingItemProps) => (
  <div className="flex flex-row space-x-4 w-full">
    <label htmlFor={labelFor} className="w-24 text-sm font-bold uppercase">
      {label}
    </label>
    <div className="inline-flex flex-1 items-center">{children}</div>
    <label htmlFor={labelFor} className="w-8 text-sm font-bold">
      {value}
    </label>
  </div>
);

const Darkarts: NextPage = () => {
  const [model, setModel] = useState<Model | null>(null);
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

  const isModelAvailable = model !== null;

  const generateImage = useCallback(async (): Promise<void> => {
    if (model === null) {
      return;
    }

    setImageData(
      await generateImageData(model, {
        inputLatentsSeeds: new Array(14).fill(0),
        intermediateLatentsDistortionSeeds: new Array(14).fill(0),
        intermediateLatentsDistortionStrengths: new Array(14).fill(0),
      })
    );
  }, [model]);

  const handleSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    useCallback((e) => {
      setSeed(Number(e.target.value));
    }, []);

  const handleOffsetChange: React.ChangeEventHandler<HTMLInputElement> =
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    useCallback((e) => {
      setOffset(Number(e.target.value));
    }, []);

  const handleFixedLayersChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
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
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    useCallback((e) => {
      setFixedSeed(Number(e.target.value));
    }, []);

  const handleLoadGeneratorClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      setModelStatus(ModelStatus.LOADING);
      setModel(
        await getModel(
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
        <title>Generate AI Faces Online | Ziyad Edher</title>
        <meta
          name="description"
          content="Generate AI faces online by using a GAN (generative adversarial network) that runs in your browser."
        />
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

              <SettingItem label="seed" labelFor="seed-input" value={seed}>
                <RangeSliderInput
                  id="seed-input"
                  value={seed}
                  min={-100}
                  max={100}
                  onChange={handleSeedChange}
                />
              </SettingItem>
              <SettingItem
                label="offset"
                labelFor="offset-input"
                value={offset}
              >
                <RangeSliderInput
                  id="offset-input"
                  value={offset}
                  min={-1}
                  max={1}
                  step={0.01}
                  onChange={handleOffsetChange}
                />
              </SettingItem>
              <SettingItem label="fixed layers">
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
              </SettingItem>
              <SettingItem
                label="fixed seed"
                labelFor="fixedseed-input"
                value={fixedSeed}
              >
                <RangeSliderInput
                  id="fixedseed-input"
                  value={fixedSeed}
                  min={-100}
                  max={100}
                  onChange={handleFixedSeedChange}
                />
              </SettingItem>
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
                  disabled={!isModelAvailable}
                  onClick={handleGenerateImageClick}
                  className={cx(
                    "py-2 px-4 text-gray-50 bg-gray-600 rounded-lg flex-1",
                    isModelAvailable
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
