/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import PageContainer from "../../src/components/page_container";

describe("page container", () => {
  test("renders children", () => {
    const result = render(<PageContainer>Hello, world!</PageContainer>);
    expect(result.getByText("Hello, world!")).toBeInTheDocument();
  });
});
