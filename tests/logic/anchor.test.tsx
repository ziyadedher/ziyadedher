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
    const tree = render(
      <Anchor href="https://example.org/" label="example">
        Hello, world!
      </Anchor>
    );
    expect(tree).toMatchSnapshot();
  });

  test("should render anchor tag", () => {
    const tree = render(<Anchor href="https://example.org/" />);
    expect(tree.getByRole("link")).toBeInTheDocument();
  });

  test("href should be reflected in anchor tag", () => {
    const tree = render(<Anchor href="https://example.org/" />);
    expect(tree.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.org/"
    );
  });

  test("label should be reflected in anchor tag", () => {
    const tree = render(<Anchor href="https://example.org/" label="example" />);
    expect(tree.getByRole("link")).toHaveAttribute("aria-label", "example");
  });

  describe("opening in new tab", () => {
    test("not should open in new tab means no target", () => {
      const tree = render(
        <Anchor href="https://example.org/" shouldOpenInNewPage={false} />
      );
      expect(tree.getByRole("link")).not.toHaveAttribute("target");
    });

    test("should open in new tab means target and rel", () => {
      const tree = render(
        <Anchor href="https://example.org/" shouldOpenInNewPage />
      );
      const anchorElement = tree.getByRole("link");
      expect(anchorElement).toHaveAttribute("target", "_blank");
      expect(anchorElement).toHaveAttribute("rel", "noreferrer");
    });
  });

  describe("children", () => {
    test("should be forwarded to anchor tag", () => {
      const tree = render(<Anchor href="https://example.org/">test</Anchor>);
      expect(tree.getByText("test")).toBeInTheDocument();
    });
  });
});
