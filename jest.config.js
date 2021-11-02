/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    `src/pages/.*\.tsx`,
    `src/types/.*\.d\.ts`,
  ],
  coverageProvider: "v8",
  // coverageThreshold: undefined,

  setupFiles: ["./tests/_setup/env.ts"],

  // NOTE: we need this to get around some weirdness with TSX + Jest
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};
