import {
  CloudArrowDown,
  Smiley,
  SpinnerGap,
  WarningOctagon,
} from "phosphor-react";
import React, { useCallback, useEffect, useRef } from "react";

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
  const otherCanvasRef = useRef<HTMLCanvasElement>(null);

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

    context.font = "48px Comic Sans";
    context.strokeStyle = "white";
    context.lineWidth = 4;
    context.strokeText("ziyadedher.com/faces", 24, 1000);
    context.fillText("ziyadedher.com/faces", 24, 1000);
  }, [imageData]);

  return (
    <div className="overflow-hidden relative w-full rounded-lg">
      <canvas ref={canvasRef} className="w-full" />
      <canvas ref={otherCanvasRef} className="hidden" />
      {imageData === null ? (
        <div className="flex absolute top-0 left-0 flex-col justify-center items-center p-16 w-full h-full text-center bg-gray-800">
          {getPlaceholderIcon()}
          {getPlaceholderText()}
        </div>
      ) : null}
    </div>
  );
};

export default GeneratedImageCanvas;
export { ModelStatus };
