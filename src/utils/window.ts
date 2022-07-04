import { useEffect, useState } from "react";

interface WindowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): WindowDimensions => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = (): WindowDimensions | null => {
  const [windowDimensions, setWindowDimensions] =
    useState<WindowDimensions | null>(null);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
};

// eslint-disable-next-line import/prefer-default-export -- just one export for now
export { useWindowDimensions };
