/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/pages/_app.tsx",
    "src/pages/_document.tsx",
  ],
  coverageProvider: "v8",
  // coverageThreshold: undefined,

  // NOTE: we need this to get around some weirdness with TSX + Jest
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};
