/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

import Index from "../../src/pages";

describe("index page", () => {
  test("renders", () => {
    const result = render(<Index />);
    expect(result).toMatchSnapshot();
  });
});
