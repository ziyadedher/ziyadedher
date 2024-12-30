import clsx from "clsx";

export function ArticleLayout({
  header,
  children,
  className,
}: React.PropsWithChildren<{
  header: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        className,
        "relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950",
      )}
    >
      {header}
      <main className="mx-auto justify-center flex w-full max-w-7xl grow p-6 xl:px-0">
        {children}
      </main>
    </div>
  );
}
