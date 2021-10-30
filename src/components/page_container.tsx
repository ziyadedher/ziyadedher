import React from "react";

interface PageContainerProps {
  readonly children: React.ReactNode;
}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  children,
}: PageContainerProps) => (
  <div className="container flex flex-col justify-center items-center mx-auto">
    {children}
  </div>
);

export default PageContainer;
