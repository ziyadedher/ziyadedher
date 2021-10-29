import {
  FacebookLogo,
  InstagramLogo,
  PhosphorLogo,
  TwitterLogo,
} from "phosphor-react";
import React from "react";

import IconLink from "../../../src/components/links/icon";

import type { Meta, Story } from "@storybook/react";
import type { IconWeight } from "phosphor-react";

enum IconName {
  PHOSPHOR = "phosphor",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
}

const META: Meta = {
  title: "Components/Links/Icon",
  component: IconLink,
  argTypes: {
    iconName: {
      options: Object.values(IconName),
      control: { type: "select" },
    },
    iconWeight: {
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "select" },
    },
    iconSize: {
      control: { type: "range", min: 12, max: 128, step: 12 },
    },
  },
};

interface IconProps {
  readonly iconName: IconName;
  readonly iconWeight: IconWeight;
  readonly iconSize: number;
}

const Icon: React.FunctionComponent<IconProps> = ({
  iconName,
  iconWeight,
  iconSize,
}: IconProps) => {
  switch (iconName) {
    case IconName.FACEBOOK:
      return <FacebookLogo size={iconSize} weight={iconWeight} />;
    case IconName.INSTAGRAM:
      return <InstagramLogo size={iconSize} weight={iconWeight} />;
    case IconName.TWITTER:
      return <TwitterLogo size={iconSize} weight={iconWeight} />;
    case IconName.PHOSPHOR:
      return <PhosphorLogo size={iconSize} weight={iconWeight} />;
    default:
      return null;
  }
};

interface IconLinkTemplateProps extends IconProps {
  readonly href: string;
  readonly label: string;
  readonly isExternal: boolean;
}

const IconLinkTemplate: Story<IconLinkTemplateProps> = ({
  href,
  label,
  isExternal,
  iconName,
  iconWeight,
  iconSize,
}: IconLinkTemplateProps) => (
  <IconLink href={href} label={label} isExternal={isExternal}>
    <Icon iconName={iconName} iconWeight={iconWeight} iconSize={iconSize} />
  </IconLink>
);

const IconLinkSocial = IconLinkTemplate.bind({});
IconLinkSocial.args = {
  href: "https://example.org",
  label: "example",
  isExternal: true,
  iconName: IconName.PHOSPHOR,
  iconWeight: "light",
  iconSize: 48,
};

export { IconLinkSocial };
export default META;
