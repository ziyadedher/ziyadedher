import {
  FacebookLogo,
  InstagramLogo,
  PhosphorLogo,
  TwitterLogo,
} from "phosphor-react";
import React from "react";

import IconLink from "./icon";

import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof IconLink>;

enum IconName {
  PHOSPHOR = "phosphor",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
}

const Metadata: Meta<typeof IconLink> = {
  component: IconLink,
  argTypes: {
    children: {
      control: { type: "select" },
      options: Object.values(IconName),
      mapping: {
        [IconName.PHOSPHOR]: <PhosphorLogo weight="regular" size={32} />,
        [IconName.FACEBOOK]: <FacebookLogo weight="regular" size={32} />,
        [IconName.INSTAGRAM]: <InstagramLogo weight="regular" size={32} />,
        [IconName.TWITTER]: <TwitterLogo weight="regular" size={32} />,
      },
    },
  },
};

const Base: Story = {
  args: {
    href: "https://example.org",
    label: "example",
    isExternal: true,
    children: IconName.PHOSPHOR,
  },

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- React.ReactNode
  render: ({ href, label, isExternal, children }) => (
    <IconLink href={href} label={label} isExternal={isExternal}>
      {children}
    </IconLink>
  ),
};

export { Base };
export default Metadata;
