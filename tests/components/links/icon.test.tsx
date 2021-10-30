/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { PhosphorLogo } from "phosphor-react";

import IconLink from "../../../src/components/links/icon";

describe("icon link", () => {
  test("renders link child", () => {
    const result = render(
      <IconLink href="https://example.com" label="example">
        <PhosphorLogo data-testid="logo" size={24} weight="light" />
      </IconLink>
    );
    expect(result.getByTestId("logo")).toBeInTheDocument();
  });

  test("has correct href", () => {
    const result = render(
      <IconLink href="https://example.com" label="example">
        <PhosphorLogo data-testid="logo" size={24} weight="light" />
      </IconLink>
    );
    expect(result.getByTestId("logo").parentElement).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  test("has correct label", () => {
    const result = render(
      <IconLink href="https://example.com" label="example">
        <PhosphorLogo data-testid="logo" size={24} weight="light" />
      </IconLink>
    );
    expect(result.getByTestId("logo").parentElement).toHaveAttribute(
      "aria-label",
      "example"
    );
  });

  describe("external", () => {
    test("does not set target when not external", () => {
      const result = render(
        <IconLink href="https://example.com" label="example" isExternal={false}>
          <PhosphorLogo data-testid="logo" size={24} weight="light" />
        </IconLink>
      );
      expect(result.getByTestId("logo").parentElement).not.toHaveAttribute(
        "target"
      );
    });

    test("sets target to blank when external", () => {
      const result = render(
        <IconLink href="https://example.com" label="example" isExternal>
          <PhosphorLogo data-testid="logo" size={24} weight="light" />
        </IconLink>
      );
      expect(result.getByTestId("logo").parentElement).toHaveAttribute(
        "target"
      );
      expect(
        result.getByTestId("logo").parentElement?.getAttribute("target")
      ).toBe("_blank");
    });
  });
});
