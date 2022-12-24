import AnimatedHackerText from "./animated_hacker_text";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof AnimatedHackerText>;

const Metadata: Meta<typeof AnimatedHackerText> = {
  component: AnimatedHackerText,
  argTypes: {
    delay: {
      control: { type: "range", min: 100, max: 5000, step: 100 },
    },
    tickDelay: {
      control: {type: "range", min: 0, max: 100, step: 5},
    }
  },
};

const Base: Story = {
  args: {
    text: "Hello, world!",
    delay: 1000,
    tickDelay: 10
  },
};

export { Base };
export default Metadata;
