import Header from "./header";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Header>;

const Metadata: Meta<typeof Header> = {
  component: Header,
};

const Base: Story = {};

export { Base };
export default Metadata;
