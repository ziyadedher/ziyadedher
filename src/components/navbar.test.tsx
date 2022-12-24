/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Navbar from "./navbar";

describe("navbar", () => {
  test("renders when current page is HOME", () => {
    const result = render(<Navbar currentPage="home" />);
    expect(result).toMatchSnapshot();
  });

  test("renders when current page is HACKS", () => {
    const result = render(<Navbar currentPage="hacks" />);
    expect(result).toMatchSnapshot();
  });
});
