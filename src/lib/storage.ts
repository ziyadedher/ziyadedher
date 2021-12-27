import { getNodeEnv } from "./env";

const shouldUseProductionStorage = (): boolean => getNodeEnv() === "production";

const getStorageURI = (filePath: string): string =>
  shouldUseProductionStorage()
    ? `https://storage.ziyadedher.com/${filePath}`
    : `/${filePath}`;

export { shouldUseProductionStorage, getStorageURI };
