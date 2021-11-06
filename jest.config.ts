import type { Config } from "@jest/types";

const CONFIG: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",

  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    // eslint-disable-next-line no-useless-escape -- this arg expects a RegExp.
    `src/pages/.*\.tsx`,
    // eslint-disable-next-line no-useless-escape -- this arg expects a RegExp.
    `src/types/.*\.d\.ts`,
  ],
  coverageProvider: "v8",

  setupFiles: ["<rootDir>/.jest/setup_environment.ts"],

  // NOTE: we need this to get around some weirdness with TSX + Jest
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/.jest/tsconfig.json",
      isolatedModules: true,
    },
  },
};

export default CONFIG;
