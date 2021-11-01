import Terminal from "../../../src/components/goofs/terminal";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Terminal",
  component: Terminal,
};

const TerminalStory: Story = () => <Terminal />;
TerminalStory.storyName = "Terminal";

export { TerminalStory };
export default META;
