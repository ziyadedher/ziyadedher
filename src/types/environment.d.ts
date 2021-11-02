/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/naming-convention -- environment variable conventions. */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID: string;
    }
  }
}

export {};
