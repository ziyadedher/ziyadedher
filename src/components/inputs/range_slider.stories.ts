import RangeSliderInput from "./range_slider";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof RangeSliderInput>;

const Metadata: Meta = {
  component: RangeSliderInput,
};

const Base: Story = {
  args: {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    isDisabled: false,
  },
  argTypes: {
    onChange: { action: "input" },
  },
};

export { Base };
export default Metadata;
