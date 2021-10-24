import IndexPage from "../src/pages";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Pages/Index",
  component: IndexPage,
};

export const Index: Story = () => {
  return (
    <IndexPage
      imageBlur={{
        ziyadedher: {
          url: "https://storage.googleapis.com/ziyadedher/ziyadedher.jpg",
          width: 3024,
          height: 4032,
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=",
        },
      }}
    />
  );
};

export default META;
