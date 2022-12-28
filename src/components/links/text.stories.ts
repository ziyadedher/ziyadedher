import TextLink from "./text";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof TextLink>;

const Metadata: Meta<typeof TextLink> = {
  component: TextLink,
  argTypes: {
    children: {
      type: "string",
    },
  },
};

const Base: Story = {
  args: {
    href: "https://example.org",
    isExternal: true,
    children: "Visit example.org",
  },
};

export { Base };
export default Metadata;
