import { loadEnvConfig } from "@next/env";

// eslint-disable-next-line jest/require-hook -- loading environment variables.
loadEnvConfig(process.cwd());

jest.mock("next/navigation", () => require("next-router-mock"));
