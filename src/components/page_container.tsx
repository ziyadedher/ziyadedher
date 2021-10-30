import React from "react";

interface PageContainerProps {
  readonly children: React.ReactNode;
}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  children,
}: PageContainerProps) => (
  <div className="container flex flex-col items-center mx-auto min-h-full">
    {children}
  </div>
);

export default PageContainer;
