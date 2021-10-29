import TextLink from "../../../src/components/links/text";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Links/Text",
  component: TextLink,
};

interface TextLinkTemplateProps {
  readonly href: string;
  readonly isExternal: boolean;
  readonly text: string;
}

const TextLinkTemplate: Story<TextLinkTemplateProps> = ({
  href,
  isExternal,
  text,
}: TextLinkTemplateProps) => (
  <TextLink href={href} isExternal={isExternal}>
    {text}
  </TextLink>
);

const TextLinkExternal = TextLinkTemplate.bind({});
TextLinkExternal.args = {
  href: "https://example.org",
  isExternal: true,
  text: "example.org",
};

export { TextLinkExternal };
export default META;
