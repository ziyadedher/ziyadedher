import Navbar, { NavbarPage } from "../../src/components/navbar";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    currentPage: {
      options: Object.values(NavbarPage),
      control: { type: "select" },
    },
  },
};

interface NavbarTemplateProps {
  readonly currentPage: NavbarPage;
}

const NavbarTemplate: Story<NavbarTemplateProps> = ({
  currentPage,
}: NavbarTemplateProps) => <Navbar currentPage={currentPage} />;

const NavbarStory = NavbarTemplate.bind({});
NavbarStory.storyName = "Navbar";
NavbarStory.args = {
  currentPage: NavbarPage.HOME,
};

export { NavbarStory };
export default META;
