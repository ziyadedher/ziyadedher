import AnimatedHackerText from "../../../src/components/text/animated_hacker_text";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Text/AnimatedHackerText",
  component: AnimatedHackerText,
  argTypes: {
    delay: {
      control: { type: "range", min: 100, max: 5000, step: 100 },
    },
  },
};

interface AnimatedHackerTextTemplateProps {
  readonly text: string;
  readonly delay: number;
}

const AnimatedHackerTextTemplate: Story<AnimatedHackerTextTemplateProps> = ({
  text,
  delay,
}: AnimatedHackerTextTemplateProps) => (
  <AnimatedHackerText text={text} delay={delay} />
);

const AnimatedHackerTextStory = AnimatedHackerTextTemplate.bind({});
AnimatedHackerTextStory.storyName = "AnimatedHackerText";
AnimatedHackerTextStory.args = {
  text: "Hello, world!",
  delay: 100,
};

export { AnimatedHackerTextStory };
export default META;
