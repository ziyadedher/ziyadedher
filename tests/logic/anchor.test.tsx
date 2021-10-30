/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Anchor from "../../src/logic/anchor";

/**
 * Generally, we would test user-visible functionality using React Testing Library.
 * In this case we can't do that since JSDOM doesn't support navigation.
 * https://github.com/jsdom/jsdom/issues/2112
 */
describe("anchor", () => {
  test("default render matches snapshot", () => {
    const result = render(
      <Anchor href="https://example.org/" label="example">
        Hello, world!
      </Anchor>
    );
    expect(result).toMatchSnapshot();
  });

  test("should render anchor tag", () => {
    const result = render(<Anchor href="https://example.org/" />);
    expect(result.getByRole("link")).toBeInTheDocument();
  });

  test("href should be reflected in anchor tag", () => {
    const result = render(<Anchor href="https://example.org/" />);
    expect(result.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.org/"
    );
  });

  test("label should be reflected in anchor tag", () => {
    const result = render(
      <Anchor href="https://example.org/" label="example" />
    );
    expect(result.getByRole("link")).toHaveAttribute("aria-label", "example");
  });

  describe("opening in new tab", () => {
    test("not should open in new tab means no target", () => {
      const result = render(
        <Anchor href="https://example.org/" shouldOpenInNewPage={false} />
      );
      expect(result.getByRole("link")).not.toHaveAttribute("target");
    });

    test("should open in new tab means target and rel", () => {
      const result = render(
        <Anchor href="https://example.org/" shouldOpenInNewPage />
      );
      const anchorElement = result.getByRole("link");
      expect(anchorElement).toHaveAttribute("target", "_blank");
      expect(anchorElement).toHaveAttribute("rel", "noreferrer");
    });
  });

  describe("children", () => {
    test("should be forwarded to anchor tag", () => {
      const result = render(<Anchor href="https://example.org/">test</Anchor>);
      expect(result.getByText("test")).toBeInTheDocument();
    });
  });
});
