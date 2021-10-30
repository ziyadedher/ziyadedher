/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import GTag, { pageview } from "../../src/lib/gtag";

describe("gtag", () => {
  describe("component", () => {
    test("renders", () => {
      const result = render(<GTag />);
      expect(result).toMatchSnapshot();
    });
  });

  describe("pageview", () => {
    test("calls gtag", () => {
      window.gtag = jest.fn() as jest.MockedFunction<typeof window.gtag>;
      pageview("/example");
      expect(window.gtag).toHaveBeenCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", expect.any(String), {
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase -- gtag convention.
        page_path: "/example",
      });
    });
  });
});
