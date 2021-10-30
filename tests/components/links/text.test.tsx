/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import TextLink from "../../../src/components/links/text";

describe("text link", () => {
  test("renders link text", () => {
    const result = render(
      <TextLink href="https://example.com">Example</TextLink>
    );
    expect(result.getByText("Example")).toBeInTheDocument();
  });

  test("has correct href", () => {
    const result = render(
      <TextLink href="https://example.com">Example</TextLink>
    );
    expect(result.getByText("Example")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  describe("external", () => {
    test("does not set target when not external", () => {
      const result = render(
        <TextLink href="https://example.com" isExternal={false}>
          Example
        </TextLink>
      );
      expect(result.getByText("Example")).not.toHaveAttribute("target");
    });

    test("sets target to blank when external", () => {
      const result = render(
        <TextLink href="https://example.com" isExternal>
          Example
        </TextLink>
      );
      expect(result.getByText("Example")).toHaveAttribute("target");
      expect(result.getByText("Example").getAttribute("target")).toBe("_blank");
    });
  });
});
