import { getNodeEnv } from "./env";

const shouldUseProductionStorage = (): boolean => getNodeEnv() === "production";

const getStorageURI = (filePath: string): string =>
  shouldUseProductionStorage()
    ? `https://storage.googleapis.com/${filePath}`
    : `/${filePath}`;

export { shouldUseProductionStorage, getStorageURI };
