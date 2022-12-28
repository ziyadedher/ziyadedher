import Terminal from "./terminal";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Terminal>;

const Metadata: Meta = {
  component: Terminal,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

const Base: Story = {};

export { Base };
export default Metadata;
