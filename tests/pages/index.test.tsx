/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

import Index, { getStaticProps, DEFAULT_STATIC_PROPS } from "../../src/pages";

describe("index static props", () => {
  test("acquireable", async () => {
    const staticProps = await getStaticProps({});
    expect(staticProps).toMatchSnapshot();
  });
});

describe("index page", () => {
  test("renders", () => {
    const result = render(<Index imageBlur={DEFAULT_STATIC_PROPS.imageBlur} />);
    expect(result).toMatchSnapshot();
  });
});
