import { ArticleLayout } from "@/components/layouts/article-layout";
import { Header } from "@/views/header";
import { Navbar } from "@/views/navbar";

import type { NavbarPage } from "@/views/navbar";

interface ContainerProps {
  readonly hasHeader?: boolean;
  readonly hasNavbar?: boolean;
  readonly navbarPage?: NavbarPage | null;
}

export function HacksContainer({
  children,
  hasHeader = true,
  hasNavbar = true,
  navbarPage = null,
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className="w-full min-h-svh flex flex-col items-center text-green-500 bg-slate-900">
      <div className="my-8 flex flex-col space-y-4">
        {hasHeader ? <Header /> : null}
        {hasNavbar ? <Navbar currentPage={navbarPage} /> : null}
      </div>

      <main className="flex w-full grow px-6 xl:px-0">{children}</main>
    </div>
  );
}

export function ArticleContainer({
  children,
  hasHeader = true,
  hasNavbar = true,
  navbarPage = null,
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <ArticleLayout
      header={
        (hasHeader || hasNavbar) && (
          <div className="my-8 flex flex-col space-y-4">
            {hasHeader ? <Header /> : null}
            {hasNavbar ? <Navbar currentPage={navbarPage} /> : null}
          </div>
        )
      }
    >
      {children}
    </ArticleLayout>
  );
}
