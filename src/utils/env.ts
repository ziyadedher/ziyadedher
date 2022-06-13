/* eslint-disable node/no-process-env -- centralized environment variable extraction. */

const getNodeEnv = (): string => process.env.NODE_ENV;

const getGoogleAnalyticsMeasurementId = (): string =>
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID;

export { getNodeEnv, getGoogleAnalyticsMeasurementId };
