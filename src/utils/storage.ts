import { getNodeEnv } from "./env";

const shouldUseProductionStorage = (): boolean => getNodeEnv() === "production";

const getStorageURI = (filePath: string): string =>
  shouldUseProductionStorage()
    ? `https://storage.ziyadedher.com/${filePath}`
    : `/${filePath}`;

const getPrivateStorageURI = (filePath: string): string =>
  shouldUseProductionStorage()
    ? `https://private.storage.ziyadedher.com/${filePath}`
    : `/_private/${filePath}`;

export { getStorageURI, getPrivateStorageURI };
