/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Link from "../../src/logic/link";

const EXAMPLE_LINK = "https://example.org/";
const EXAMPLE_TEXT = "Hello, world!";

/**
 * Generally, we would test user-visible functionality using React Testing Library.
 * In this case we can't do that since JSDOM doesn't support navigation.
 * https://github.com/jsdom/jsdom/issues/2112
 */
describe("link", () => {
  test("default render matches snapshot", () => {
    const tree = render(<Link href={EXAMPLE_LINK}>{EXAMPLE_TEXT}</Link>);
    expect(tree).toMatchSnapshot();
  });

  describe("href", () => {
    test("should be reflected in anchor tag", async () => {
      const tree = render(<Link href={EXAMPLE_LINK} />);
      const anchorElement = (await tree.findByRole(
        "link"
      )) as HTMLAnchorElement;
      expect(anchorElement.href).toBe(EXAMPLE_LINK);
    });
  });

  describe("opening in new tab", () => {
    test("not should open in new tab means no target", async () => {
      const tree = render(
        <Link href={EXAMPLE_LINK} shouldOpenInNewPage={false} />
      );
      const anchorElement = (await tree.findByRole(
        "link"
      )) as HTMLAnchorElement;
      expect(anchorElement.target).toBe("");
    });

    test("should open in new tab means target and rel", async () => {
      const tree = render(<Link href={EXAMPLE_LINK} shouldOpenInNewPage />);
      const anchorElement = (await tree.findByRole(
        "link"
      )) as HTMLAnchorElement;
      expect(anchorElement.target).toBe("_blank");
      expect(anchorElement.rel).toBe("noreferrer");
    });
  });

  describe("children", () => {
    test("should be forwarded to anchor tag", async () => {
      const tree = render(<Link href={EXAMPLE_LINK}>{EXAMPLE_TEXT}</Link>);
      const paragraphElement = (await tree.findByText(
        EXAMPLE_TEXT
      )) as HTMLParagraphElement;
      expect(paragraphElement).toBeInTheDocument();
    });
  });
});
