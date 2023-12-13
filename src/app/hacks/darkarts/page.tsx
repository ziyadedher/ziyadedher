"use client";

import classNames from "classnames";
import { PiCaretRight } from "react-icons/pi";
import { useCallback, useEffect, useReducer, useState } from "react";

import GeneratedImage from "@/components/goofs/darkarts/generated_image";
import { RangeSliderInput } from "@/components/inputs";
import { TextLink } from "@/components/links";
import { LayerKeys } from "@/logic/goofs/darkarts/model";

import type { LayerKey, LayerValues } from "@/logic/goofs/darkarts/model";

export const metadata = {
  name: "Generate AI (GAN) Faces | Ziyad Edher",
  description:
    "Generate AI faces online by using a GAN (generative adversarial network) that runs in your browser.",
};

const SettingItem = ({
  label,
  labelFor,
  value,
  children,
}: {
  label: string;
  labelFor?: string;
  value?: number | string;
  children?: React.ReactNode;
}) => (
  <div className="flex w-full flex-row items-center space-x-4">
    <label htmlFor={labelFor} className="w-24 text-xs font-bold uppercase">
      {label}
    </label>
    <div className="inline-flex flex-1 items-center">{children}</div>
    <label htmlFor={labelFor} className="w-8 text-xs font-bold">
      {value}
    </label>
  </div>
);

type RangeSliderInputProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const CollapsableLayerConfiguration = ({
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
}: {
  layerKey: LayerKey;
  inputSeed: RangeSliderInputProps;
  distortionSeed: RangeSliderInputProps;
  distortionStrength: RangeSliderInputProps;
  isOverriden: boolean;
  onOverridenChange: React.ChangeEventHandler<HTMLInputElement>;
  isOpen: boolean;
  onOpenChange: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800">
    <button
      type="button"
      onClick={handleOpenChange}
      className="relative flex flex-row items-center py-2 px-4 hover:bg-gray-700 active:shadow-inner"
    >
      <div
        className={classNames("transition-all", isOpen ? "rotate-90" : null)}
      >
        <PiCaretRight size={16} />
      </div>
      <div className="flex-1 text-sm font-bold">Layer {layerKey} Settings</div>
      {isOverriden ? (
        <span className="absolute right-4 h-2 w-2 rounded-full bg-green-500" />
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
          className="h-4 w-4 rounded-md"
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
  key: LayerKey;
  value: T;
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

const Page = () => {
  const [seed, setSeed] = useState(0);
  const [distortionSeed, setDistortionSeed] = useState(0);
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

  useEffect(() => {
    setSeed(Math.round(Math.random() * 20 - 10));
    setDistortionSeed(Math.round(Math.random() * 20 - 10));
  }, []);

  useEffect(() => {
    LayerKeys.forEach((key) => {
      if (!layerOverriden[key]) {
        setLayerInputSeeds({ key, value: seed });
        setLayerDistortionSeeds({ key, value: distortionSeed });
        setLayerDistortionStrengths({ key, value: distortionStrength });
      }
    });
  }, [seed, layerOverriden, distortionSeed, distortionStrength]);

  const handleSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setSeed(Number(e.target.value));
    }, []);

  const handleDistortionSeedChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setDistortionSeed(Number(e.target.value));
    }, []);

  const handleDistortionStrengthChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setDistortionStrength(Number(e.target.value));
    }, []);

  const getCollapsableLayerConfiguration = useCallback(
    (layerKey: LayerKey): React.ReactElement => {
      const handleLayerInputChange: React.ChangeEventHandler<
        HTMLInputElement
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
          onOverridenChange={handleLayerOverridenChange}
          isOpen={layerOpen[layerKey]}
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
    <div className="my-8 mx-auto flex max-w-3xl flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl">
          See people who don&apos;t exist, through the eyes of an AI.
        </h1>
        <p className="text-center text-base">
          This AI lets you generate faces that have never been seen before. None
          of these people exist. Manipulate the settings to see how this AI
          thinks about the human face. For really wacky results, pump up the
          distortion.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 md:items-start">
        <div className="row-span-2 flex flex-col space-y-8">
          <div className="flex flex-col">
            <h2 className="text-base font-bold">Settings</h2>
            <p className="text-justify text-sm">
              Use these settings to manipulate the image and see how the AI
              generates new faces. Change the seed to see completely new faces,
              and up the distortion to see the AI forget what faces look like.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold leading-4">All-layer Settings</h3>
            <p className="text-justify text-sm">
              These values apply to layers that are not explicitly overriden.
              You can override layers in the section below.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <SettingItem label="Input Seed" labelFor="inputSeed" value={seed}>
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
            <p className="text-justify text-sm">
              You can override specific layers in this section. By doing this
              you can &quot;freeze&quot; certain features while you play around
              with the rest. Try overriding the first three layers and then play
              around with the all-layers settings!
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {LayerKeys.map((layerKey) =>
                getCollapsableLayerConfiguration(layerKey)
              )}
            </div>
          </div>
        </div>

        <div className="order-first flex flex-col gap-y-4 md:order-none">
          <GeneratedImage
            modelParameters={{
              inputLatentsSeeds: layerInputSeeds,
              intermediateLatentsDistortionSeeds: layerDistortionSeeds,
              intermediateLatentsDistortionStrengths: layerDistortionStrengths,
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="mt-4 flex flex-col gap-4 border-t-2 border-t-gray-700 py-4">
            <div>
              <h4 className="text-sm font-bold">What&apos;s a seed?</h4>
              <p className="text-justify text-sm">
                &quot;Seed&quot; refers to the random input used to generate the
                face; it generally has no semantic meaning but is used to make
                the image different.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold">What&apos;s a layer?</h4>
              <p className="text-justify text-sm">
                You can think of a &quot;layer&quot; as a part of the AI
                responsible for generating a specific feature of the face, with
                lower-number layers corresponding to more general features. For
                example, Layer 0 might be responsible for determining the age
                while Layer 13 might be responsible for the accent lighting.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t-2 border-t-gray-700 py-4">
            <div>
              <h4 className="text-sm font-bold">Here&apos;s the nerd stuff.</h4>
              <p className="text-justify text-sm">
                This is a demo of a face generation system using a{" "}
                <TextLink
                  href="https://en.wikipedia.org/wiki/Generative_adversarial_network"
                  isExternal
                >
                  generative adversarial network
                </TextLink>{" "}
                (referred to as a GAN). The GAN used here is{" "}
                <TextLink href="https://arxiv.org/abs/1912.04958" isExternal>
                  StyleGAN2
                </TextLink>
                , developed by{" "}
                <TextLink href="https://www.nvidia.com/" isExternal>
                  NVIDIA
                </TextLink>
                . The model was ported to the browser using{" "}
                <TextLink href="https://onnx.ai/" isExternal>
                  ONNX
                </TextLink>
                , the Open Neural Network Exchange. Everything here runs locally
                on your browser.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold">Check me out!</h4>
              <p className="text-justify text-sm">
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
            <div>
              <h4 className="text-sm font-bold">
                Questions, concerns, or found a bug?
              </h4>
              <p className="text-justify text-sm">
                Please out to me on{" "}
                <TextLink href="https://twitter.com/ziyadedher" isExternal>
                  Twitter
                </TextLink>{" "}
                or email me!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
