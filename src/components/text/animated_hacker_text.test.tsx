/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-unassigned-import -- @testing-library/jest-dom doesn't need to be bound.
import "@testing-library/jest-dom";

import { act, render } from "@testing-library/react";

import AnimatedHackerText from "./animated_hacker_text";

describe("animated hacker text", () => {
  test("renders text at the start", () => {
    const result = render(<AnimatedHackerText text="long-hacker-text" />);
    expect(result.queryByText("long-hacker-text")).toBeInTheDocument();
  });

  test("eventually renders text after delay", () => {
    jest.useFakeTimers();
    const mockPerformanceNow = jest
      .spyOn(window.performance, "now")
      .mockReturnValue(0);

    const result = render(
      <AnimatedHackerText text="long-hacker-text" delay={500} tickDelay={10} />
    );
    expect(result.queryByText("long-hacker-text")).toBeInTheDocument();

    mockPerformanceNow.mockReturnValue(400);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.queryByText("long-hacker-text")).not.toBeInTheDocument();

    mockPerformanceNow.mockReturnValue(500);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    expect(result.getByText("long-hacker-text")).toBeInTheDocument();
  });
});
