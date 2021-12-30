import classNames from "classnames";
import Head from "next/head";
import { CaretRight } from "phosphor-react";
import React, { useCallback, useEffect, useReducer, useState } from "react";

import GeneratedImageCanvas, {
  ModelStatus,
} from "../../components/goofs/darkarts/generated_image_canvas";
import RangeSliderInput from "../../components/inputs/range_slider";
import TextLink from "../../components/links/text";
import PageContainer, { PageStyle } from "../../components/page_container";
import { getStorageURI } from "../../lib/storage";
import {
  LayerKeys,
  generateImageData,
  getModel,
} from "../../logic/goofs/darkarts/model";

import type {
  LayerKey,
  LayerValues,
  Model,
} from "../../logic/goofs/darkarts/model";
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
      className={classNames(
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
  <div className="flex flex-row items-center space-x-4 w-full">
    <label htmlFor={labelFor} className="w-24 text-xs font-bold uppercase">
      {label}
    </label>
    <div className="inline-flex flex-1 items-center">{children}</div>
    <label htmlFor={labelFor} className="w-8 text-xs font-bold">
      {value}
    </label>
  </div>
);

interface RangeSliderInputProps {
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface CollapsableLayerConfigurationProps {
  readonly layerKey: LayerKey;
  readonly inputSeed: RangeSliderInputProps;
  readonly distortionSeed: RangeSliderInputProps;
  readonly distortionStrength: RangeSliderInputProps;
  readonly isOverriden: boolean;
  readonly onOverridenChange: React.ChangeEventHandler<HTMLInputElement>;
  readonly isOpen: boolean;
  readonly onOpenChange: React.MouseEventHandler<HTMLButtonElement>;
}

const CollapsableLayerConfiguration: React.FunctionComponent<
  CollapsableLayerConfigurationProps
> = ({
  layerKey,
  inputSeed: { onChange: handleInputSeedChange, ...inputSeed },
  distortionSeed: { onChange: handleDistortionSeedChange, ...distortionSeed },
  distortionStrength: {
    onChange: handleDistortionStrengthChange,
    ...distortionStrength
  },
  isOverriden,
  onOverridenChange: handleOverridenChange,
  isOpen,
  onOpenChange: handleOpenChange,
}: CollapsableLayerConfigurationProps) => (
  <div className="flex overflow-hidden flex-col bg-gray-800 rounded-lg">
    <button
      type="button"
      onClick={handleOpenChange}
      className="flex relative flex-row items-center py-2 px-4 hover:bg-gray-700 active:shadow-inner"
    >
      <div
        className={classNames("transition-all", isOpen ? "rotate-90" : null)}
      >
        <CaretRight size={16} />
      </div>
      <div className="flex-1 text-sm font-bold">Layer {layerKey} Settings</div>
      {isOverriden ? (
        <span className="absolute right-4 w-2 h-2 bg-green-500 rounded-full" />
      ) : null}
    </button>
    <div
      className={classNames(
        "flex flex-col space-y-2 px-4 transition-all overflow-hidden",
        isOpen ? "py-4 max-h-48" : "max-h-0"
      )}
    >
      <SettingItem
        label="Override"
        labelFor={`override-${layerKey}`}
        value={isOverriden ? "Yes" : "No"}
      >
        <input
          type="checkbox"
          id={`override-${layerKey}`}
          checked={isOverriden}
          onChange={handleOverridenChange}
          className="w-4 h-4 rounded-md"
        />
      </SettingItem>
      <SettingItem
        label="Layer Input Seed"
        labelFor={`inputSeed-${layerKey}`}
        value={inputSeed.value}
      >
        <RangeSliderInput
          id={`inputSeed-${layerKey}`}
          value={inputSeed.value}
          min={inputSeed.min}
          max={inputSeed.max}
          step={inputSeed.step}
          onChange={handleInputSeedChange}
        />
      </SettingItem>
      <SettingItem
        label="Distortion Seed"
        labelFor={`distortionSeed-${layerKey}`}
        value={distortionSeed.value}
      >
        <RangeSliderInput
          id={`distortionSeed-${layerKey}`}
          value={distortionSeed.value}
          min={distortionSeed.min}
          max={distortionSeed.max}
          step={distortionSeed.step}
          onChange={handleDistortionSeedChange}
        />
      </SettingItem>
      <SettingItem
        label="Distortion Strength"
        labelFor={`distortionStrength-${layerKey}`}
        value={distortionStrength.value}
      >
        <RangeSliderInput
          id={`distortionStrength-${layerKey}`}
          value={distortionStrength.value}
          min={distortionStrength.min}
          max={distortionStrength.max}
          step={distortionStrength.step}
          onChange={handleDistortionStrengthChange}
        />
      </SettingItem>
    </div>
  </div>
);

interface LayerValuesAction<T> {
  readonly key: LayerKey;
  readonly value: T;
}

type LayerValuesReducer<T> = React.Reducer<
  LayerValues<T>,
  LayerValuesAction<T>
>;

const layerValuesReducer = <T,>(
  state: LayerValues<T>,
  action: LayerValuesAction<T>
): LayerValues<T> => {
  const newState = { ...state };
  newState[action.key] = action.value;
  return newState;
};

const getDefaultLayerValues = <T,>(value: T): LayerValues<T> => {
  let map = {};
  LayerKeys.forEach((v) => {
    map = { [v]: value, ...map };
  });
  return map as LayerValues<T>;
};

const Darkarts: NextPage = () => {
  const [model, setModel] = useState<Model | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const [seed, setSeed] = useState(Math.round(Math.random() * 20 - 10));
  const [distortionSeed, setDistortionSeed] = useState(
    Math.round(Math.random() * 20 - 10)
  );
  const [distortionStrength, setDistortionStrength] = useState(0);
  const [layerInputSeeds, setLayerInputSeeds] = useReducer<
    LayerValuesReducer<number>
  >(layerValuesReducer, getDefaultLayerValues(0));
  const [layerDistortionSeeds, setLayerDistortionSeeds] = useReducer<
    LayerValuesReducer<number>
  >(layerValuesReducer, getDefaultLayerValues(0));
  const [layerDistortionStrengths, setLayerDistortionStrengths] = useReducer<
    LayerValuesReducer<number>
  >(layerValuesReducer, getDefaultLayerValues(0));
  const [layerOverriden, setLayerOverriden] = useReducer<
    LayerValuesReducer<boolean>
  >(layerValuesReducer, getDefaultLayerValues(false));
  const [layerOpen, setLayerOpen] = useReducer<LayerValuesReducer<boolean>>(
    layerValuesReducer,
    getDefaultLayerValues(false)
  );

  const [modelStatus, setModelStatus] = useState(ModelStatus.READY_TO_LOAD);

  const isModelAvailable = model !== null;

  useEffect(() => {
    LayerKeys.forEach((key) => {
      if (!layerOverriden[key]) {
        setLayerInputSeeds({ key, value: seed });
        setLayerDistortionSeeds({ key, value: distortionSeed });
        setLayerDistortionStrengths({ key, value: distortionStrength });
      }
    });
  }, [seed, layerOverriden, distortionSeed, distortionStrength]);

  const generateImage = useCallback(async (): Promise<void> => {
    if (model === null) {
      return;
    }

    setImageData(
      await generateImageData(model, {
        inputLatentsSeeds: layerInputSeeds,
        intermediateLatentsDistortionSeeds: layerDistortionSeeds,
        intermediateLatentsDistortionStrengths: layerDistortionStrengths,
      })
    );
  }, [model, layerInputSeeds, layerDistortionSeeds, layerDistortionStrengths]);

  const handleSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    useCallback((e) => {
      setSeed(Number(e.target.value));
    }, []);

  const handleDistortionSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    useCallback((e) => {
      setDistortionSeed(Number(e.target.value));
    }, []);

  const handleDistortionStrengthChange: React.ChangeEventHandler<HTMLInputElement> =
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
    useCallback((e) => {
      setDistortionStrength(Number(e.target.value));
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

  const getCollapsableLayerConfiguration = useCallback(
    (layerKey: LayerKey): React.ReactElement => {
      const handleLayerInputChange: React.ChangeEventHandler<
        HTMLInputElement
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
      > = (e): void => {
        setLayerInputSeeds({
          key: layerKey,
          value: Number(e.target.value),
        });
        setLayerOverriden({
          key: layerKey,
          value: true,
        });
      };
      const handleLayerDistortionChange: React.ChangeEventHandler<
        HTMLInputElement
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
      > = (e): void => {
        setLayerDistortionSeeds({
          key: layerKey,
          value: Number(e.target.value),
        });
        setLayerOverriden({
          key: layerKey,
          value: true,
        });
      };
      const handleLayerDistortionStrengthChange: React.ChangeEventHandler<
        HTMLInputElement
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandler
      > = (e): void => {
        setLayerDistortionStrengths({
          key: layerKey,
          value: Number(e.target.value),
        });
        setLayerOverriden({
          key: layerKey,
          value: true,
        });
      };
      const handleLayerOverridenChange: React.ChangeEventHandler<
        HTMLInputElement
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ChangeEventHandle
      > = (e): void => {
        setLayerOverriden({
          key: layerKey,
          value: e.target.checked,
        });
      };
      const handleLayerOpenChange: React.MouseEventHandler<
        HTMLButtonElement
      > = (): void => {
        setLayerOpen({
          key: layerKey,
          value: !layerOpen[layerKey],
        });
      };

      return (
        <CollapsableLayerConfiguration
          key={layerKey}
          layerKey={layerKey}
          inputSeed={{
            value: layerInputSeeds[layerKey],
            min: -10,
            max: 10,
            step: 0.1,
            onChange: handleLayerInputChange,
          }}
          distortionSeed={{
            value: layerDistortionSeeds[layerKey],
            min: -10,
            max: 10,
            step: 0.1,
            onChange: handleLayerDistortionChange,
          }}
          distortionStrength={{
            value: layerDistortionStrengths[layerKey],
            min: 0,
            max: 10,
            step: 0.1,
            onChange: handleLayerDistortionStrengthChange,
          }}
          isOverriden={layerOverriden[layerKey]}
          // eslint-disable-next-line react/jsx-no-bind -- FIXME: performance issue.
          onOverridenChange={handleLayerOverridenChange}
          isOpen={layerOpen[layerKey]}
          // eslint-disable-next-line react/jsx-no-bind -- FIXME: performance issue.
          onOpenChange={handleLayerOpenChange}
        />
      );
    },
    [
      layerInputSeeds,
      layerDistortionSeeds,
      layerDistortionStrengths,
      layerOverriden,
      layerOpen,
    ]
  );

  return (
    <>
      <Head>
        <title>Generate AI (GAN) Faces | Ziyad Edher</title>
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
        <div className="flex flex-col gap-16 my-8 mx-auto max-w-3xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-center">
              See people who don&apos;t exist, through the eyes of an AI.
            </h1>
            <p className="text-base text-center">
              Using the AI below to generate faces that have never been seen
              before. None of these people exist. Manipulate the settings to see
              how this AI thinks about the human face.
            </p>
            <p className="text-xs text-center">
              <span className="font-bold">Here&apos;s the nerd stuff.</span>{" "}
              This is a demo of a face generation system using a generative
              adversarial network (referred to as GANs). The GAN used here is
              StyleGAN2, developed by NVIDIA. The model was ported to the
              browser using ONNX, the Open Neural Network Exchange.
            </p>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-8 justify-center items-center md:items-start w-full">
            <div className="flex flex-col space-y-8 md:w-1/2">
              <div className="flex flex-col">
                <h2 className="text-base font-bold">Settings</h2>
                <p className="text-sm text-justify">
                  Use these settings to manipulate the image and create a new
                  one.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold leading-4">
                  All-layer Settings
                </h3>
                <p className="text-sm text-justify">
                  These values apply to layers that are not explicitly
                  overriden. You can override layers in the section below.
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <SettingItem
                    label="Input Seed"
                    labelFor="inputSeed"
                    value={seed}
                  >
                    <RangeSliderInput
                      id="inputSeed"
                      value={seed}
                      min={-10}
                      max={10}
                      step={0.1}
                      onChange={handleSeedChange}
                    />
                  </SettingItem>
                  <SettingItem
                    label="Distortion Seed"
                    labelFor="distortionSeed"
                    value={distortionSeed}
                  >
                    <RangeSliderInput
                      id="distortionSeed"
                      value={distortionSeed}
                      min={-10}
                      max={10}
                      step={0.1}
                      onChange={handleDistortionSeedChange}
                    />
                  </SettingItem>
                  <SettingItem
                    label="Distortion Strength"
                    labelFor="distortionStrength"
                    value={distortionStrength}
                  >
                    <RangeSliderInput
                      id="distortionStrength"
                      value={distortionStrength}
                      min={0}
                      max={10}
                      step={0.1}
                      onChange={handleDistortionStrengthChange}
                    />
                  </SettingItem>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold">Per-layer Settings</h3>
                <p className="text-sm text-justify">
                  You can override specific layers in this section. By doing
                  this you can &quot;freeze&quot; certain features while you
                  play around with the rest. Try overriding the first three
                  layers and then play around with the all-layers settings!
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  {LayerKeys.map((layerKey) =>
                    getCollapsableLayerConfiguration(layerKey)
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-shrink-0 gap-y-4 md:w-1/2">
              <GeneratedImageCanvas
                modelStatus={modelStatus}
                imageData={imageData}
              />
              <div className="flex flex-row space-x-4">
                <button
                  type="button"
                  disabled={modelStatus !== ModelStatus.READY_TO_LOAD}
                  onClick={handleLoadGeneratorClick}
                  className={classNames(
                    "py-2 px-4 bg-gray-600 rounded-lg",
                    modelStatus === ModelStatus.READY_TO_LOAD
                      ? "cursor-pointer hover:bg-gray-700 active:bg-gray-800"
                      : "cursor-not-allowed opacity-50"
                  )}
                >
                  Load
                </button>

                <button
                  type="button"
                  disabled={!isModelAvailable}
                  onClick={handleGenerateImageClick}
                  className={classNames(
                    "py-2 px-4 bg-gray-600 rounded-lg flex-1",
                    isModelAvailable
                      ? "cursor-pointer hover:bg-gray-700 active:bg-gray-800"
                      : "cursor-not-allowed opacity-50"
                  )}
                >
                  Generate
                </button>
              </div>
              <ModelStatusText modelStatus={modelStatus} />
              <div className="flex flex-col gap-4 py-4 mt-4 border-t-2 border-t-gray-700">
                <div>
                  <h4 className="text-sm font-bold">What&apos;s a seed?</h4>
                  <p className="text-sm text-justify">
                    &quot;Seed&quot; refers to the random input used to generate
                    the face; it generally has no semantic meaning but is used
                    to make the image different.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold">What&apos;s a layer?</h4>
                  <p className="text-sm text-justify">
                    You can think of a &quot;layer&quot; as a part of the AI
                    responsible for generating a specific feature of the face,
                    with lower-number layers corresponding to more general
                    features. For example, Layer 0 might be responsible for
                    determining the age while Layer 13 might be responsible for
                    the accent lighting.
                  </p>
                </div>
              </div>
              <div className="py-4 border-t-2 border-t-gray-700">
                <h4 className="text-sm font-bold">Check me out!</h4>
                <p className="text-sm text-justify">
                  I built this demo almost entirely live. Check out my{" "}
                  <TextLink href="https://twitch.tv/ziyadedher" isExternal>
                    Twitch channel
                  </TextLink>
                  . If you want to see more stuff that I build, feel free to
                  follow me on{" "}
                  <TextLink href="https://twitter.com/ziyadedher" isExternal>
                    Twitter
                  </TextLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default Darkarts;
