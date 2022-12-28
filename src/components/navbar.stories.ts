import Navbar from "./navbar";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Navbar>;

const Metadata: Meta<typeof Navbar> = {
  component: Navbar,
  argTypes: {
    currentPage: {
      control: { type: "radio" },
      options: ["home", "blog", "hacks"],
    },
  },
};

const Base: Story = {
  args: {
    currentPage: "home",
  },
};

export { Base };
export default Metadata;
