import classNames from "classnames";
import {
  CloudArrowDown,
  Download,
  Smiley,
  SpinnerGap,
  WarningOctagon,
} from "phosphor-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { getStorageURI } from "../../../lib/storage";
import {
  generateImageData,
  getModel,
} from "../../../logic/goofs/darkarts/model";

import type {
  Model,
  ModelParameters,
} from "../../../logic/goofs/darkarts/model";

enum ModelStatus {
  READY_TO_LOAD = 0,
  LOADING = 1,
  READY = 2,
  GENERATING = 3,
  ERROR = 4,
}

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

interface GeneratedImageProps {
  readonly modelParameters: ModelParameters;
}

const GeneratedImage: React.FunctionComponent<GeneratedImageProps> = ({
  modelParameters,
}: GeneratedImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const otherCanvasRef = useRef<HTMLCanvasElement>(null);

  const [model, setModel] = useState<Model | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [modelStatus, setModelStatus] = useState(ModelStatus.READY_TO_LOAD);
  const isModelAvailable = model !== null;

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
          subtitle:
            "Please wait while the model is fetched and loaded. This may take a minute or two depending on your internet connection.",
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

  const generateImage = useCallback(async (): Promise<void> => {
    if (model === null) {
      return;
    }

    setImageData(await generateImageData(model, modelParameters));
  }, [model, modelParameters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const otherCanvas = otherCanvasRef.current;
    if (imageData === null || canvas === null || otherCanvas === null) {
      return;
    }

    const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error("Failed to get canvas context");
    }
    const otherContext = otherCanvas.getContext("2d");
    if (otherContext === null) {
      throw new Error("failed to get other canvas context");
    }

    otherCanvas.width = imageData.width;
    otherCanvas.height = imageData.height;
    otherContext.putImageData(imageData, 0, 0);

    canvas.width = imageData.width * 4;
    canvas.height = imageData.height * 4;
    context.drawImage(
      otherCanvas,
      0,
      0,
      imageData.width * 4,
      imageData.height * 4
    );

    context.font = "32px Comic Sans";
    context.strokeStyle = "white";
    context.lineWidth = 4;
    context.strokeText("ziyadedher.com/faces", 24, 1000);
    context.fillText("ziyadedher.com/faces", 24, 1000);
  }, [imageData]);

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

  const handleSaveImageClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      const canvas = canvasRef.current;
      if (canvas === null) {
        return;
      }

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "face.png";
      link.href = image;
      link.click();
    }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full overflow-hidden rounded-lg">
        <canvas ref={canvasRef} width={1024} height={1024} className="w-full" />
        <canvas ref={otherCanvasRef} className="hidden" />
        {imageData === null ? (
          <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-gray-800 p-16 text-center">
            {getPlaceholderIcon()}
            {getPlaceholderText()}
          </div>
        ) : null}
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          disabled={modelStatus !== ModelStatus.READY_TO_LOAD}
          onClick={handleLoadGeneratorClick}
          className={classNames(
            "flex flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-600 rounded-lg",
            modelStatus === ModelStatus.READY_TO_LOAD
              ? "cursor-pointer hover:bg-gray-700 active:bg-gray-800"
              : "cursor-not-allowed opacity-50"
          )}
        >
          <span>
            <CloudArrowDown size={16} />
          </span>
          Load
        </button>
        <button
          type="button"
          disabled={!isModelAvailable}
          onClick={handleGenerateImageClick}
          className={classNames(
            "flex flex-row py-2 px-4 items-center gap-2 justify-center bg-gray-600 rounded-lg flex-1",
            isModelAvailable
              ? "cursor-pointer hover:bg-gray-700 active:bg-gray-800"
              : "cursor-not-allowed opacity-50"
          )}
        >
          <span>
            <Smiley size={16} />
          </span>
          Generate
        </button>
        <button
          type="button"
          disabled={imageData === null}
          onClick={handleSaveImageClick}
          className={classNames(
            "flex flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-600 rounded-lg",
            imageData === null
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-700 active:bg-gray-800"
          )}
        >
          <span>
            <Download size={16} />
          </span>
          Save
        </button>
      </div>
      <ModelStatusText modelStatus={modelStatus} />
    </div>
  );
};

export default GeneratedImage;
export { ModelStatus };
