const getStorageURI = (
  filePath: string,
  {
    shouldUseProduction = process.env.NODE_ENV === "production",
    shouldUseBucket = true,
  }: { shouldUseProduction?: boolean; shouldUseBucket?: boolean } = {}
): string =>
  shouldUseProduction && shouldUseBucket
    ? `https://storage.ziyadedher.com/${filePath}`
    : `/${filePath}`;

export { getStorageURI };
