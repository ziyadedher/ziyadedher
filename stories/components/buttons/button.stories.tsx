import Button, { ButtonStyle } from "../../../src/components/buttons/button";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Buttons/Button",
  component: Button,
};

interface ButtonTemplateProps {
  readonly text: string;
  readonly buttonStyle: ButtonStyle;
  readonly onClick: () => void;
}

const ButtonTemplate: Story<ButtonTemplateProps> = ({
  text,
  buttonStyle,
  onClick: handleClick,
}: ButtonTemplateProps) => (
  <Button buttonStyle={buttonStyle} onClick={handleClick}>
    {text}
  </Button>
);

const ButtonStory = ButtonTemplate.bind({});
ButtonStory.storyName = "Button";
ButtonStory.args = {
  text: "Submit!",
  buttonStyle: ButtonStyle.PRIMARY,
};
ButtonStory.argTypes = {
  buttonStyle: {
    options: Object.values(ButtonStyle),
    control: { type: "select" },
  },
  onClick: { action: "clicked" },
};

export { ButtonStory };
export default META;
