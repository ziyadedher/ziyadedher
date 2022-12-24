import Text from "./text";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Text>;

const Metadata: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    children: {
      type: "string",
    }
  }
};

const Base: Story = {
  args: {
    href: "https://example.org",
    isExternal: true,
    children: "Visit example.org"
  }
};

export { Base };
export default Metadata;
