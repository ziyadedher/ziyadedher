import Header from "../../src/components/header";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Header",
  component: Header,
};

const HeaderStory: Story = () => <Header />;
HeaderStory.storyName = "Header";

export { HeaderStory };
export default META;
