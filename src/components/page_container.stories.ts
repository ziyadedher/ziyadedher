import PageContainer from "./page_container";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof PageContainer>;

const Metadata: Meta<typeof PageContainer> = {
  component: PageContainer,
  argTypes: {
    navbarPage: {
      control: { type: "radio" },
      options: ["home", "blog", "hacks"],
    },
    pageStyle: {
      control: { type: "radio" },
      options: ["light", "dark", "hacker"],
    },
  },
};

const Base: Story = {
  args: {
    hasNavbar: true,
    hasHeader: true,
    navbarPage: "home",
    pageStyle: "light",
  },
};

export { Base };
export default Metadata;
