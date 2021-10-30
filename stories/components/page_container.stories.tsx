import PageContainer from "../../src/components/page_container";

import type { Meta, Story } from "@storybook/react";

const META: Meta = {
  title: "Components/PageContainer",
  component: PageContainer,
};

interface PageContainerTemplateProps {
  readonly text: string;
}

const PageContainerTemplate: Story<PageContainerTemplateProps> = ({
  text,
}: PageContainerTemplateProps) => <PageContainer>{text}</PageContainer>;

const PageContainerStory = PageContainerTemplate.bind({});
PageContainerStory.storyName = "PageContainer";
PageContainerStory.args = {
  text: "Hello, world!",
};

export { PageContainerStory };
export default META;
