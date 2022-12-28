/* eslint-disable @typescript-eslint/no-var-requires -- exception for configuration files. */
/* eslint-disable @typescript-eslint/no-require-imports -- exception for configuration files. */
/* eslint-disable import/no-commonjs -- exception for configuration files. */
/* eslint-disable import/unambiguous -- exception for configuration files. */

const NEXT_JEST = require("next/jest");

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- next/jest
const CREATE_JEST_CONFIG = NEXT_JEST({ dir: "./" });

/**
 * @type {import("jest").Config}
 */
const CONFIG = {
  preset: "ts-jest",
  testEnvironment: "node",

  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    // eslint-disable-next-line no-useless-escape -- this arg expects a RegExp.
    `src/app/.*\.tsx`,
    // eslint-disable-next-line no-useless-escape -- this arg expects a RegExp.
    `src/pages/.*\.tsx`,
    // eslint-disable-next-line no-useless-escape -- this arg expects a RegExp.
    `src/api/pages/.*\.ts`,
    // eslint-disable-next-line no-useless-escape -- this arg expects a RegExp.
    `src/types/.*\.d\.ts`,
  ],
  coverageProvider: "v8",

  setupFiles: ["<rootDir>/.jest/setup_environment.ts"],

  // NOTE: we need this to get around some weirdness with TSX + Jest
  globals: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- TS Jest default.
    "ts-jest": {
      tsconfig: "<rootDir>/.jest/tsconfig.json",
      isolatedModules: true,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- next/jest
module.exports = CREATE_JEST_CONFIG(CONFIG);
