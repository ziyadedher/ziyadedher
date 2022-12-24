/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Terminal from "./terminal";

describe("terminal", () => {
  test("renders children", () => {
    const result = render(<Terminal />);
    expect(result).toMatchSnapshot();
  });
});
