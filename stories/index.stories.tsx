import IndexPage from "../src/pages";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Pages/Index",
  component: IndexPage,
};

export const Index: Story = () => <IndexPage />;

export default META;
