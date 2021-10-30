/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Header from "../../src/components/header";

describe("header", () => {
  test("renders", () => {
    const result = render(<Header />);
    expect(result).toMatchSnapshot();
  });
});
