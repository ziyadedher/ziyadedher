import IndexPage, { DEFAULT_STATIC_PROPS } from "../src/pages";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Pages/Index",
  component: IndexPage,
};

export const Index: Story = () => (
  <IndexPage imageBlur={DEFAULT_STATIC_PROPS.imageBlur} />
);

export default META;
