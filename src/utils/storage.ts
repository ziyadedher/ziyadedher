import { getNodeEnv } from "./env";

const shouldUseProductionStorage = (): boolean => getNodeEnv() === "production";

const getStorageURI = (filePath: string): string =>
  shouldUseProductionStorage()
    ? `https://storage.ziyadedher.com/${filePath}`
    : `/${filePath}`;

// eslint-disable-next-line import/prefer-default-export -- single export for now.
export { getStorageURI };
