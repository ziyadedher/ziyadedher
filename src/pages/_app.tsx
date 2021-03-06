// eslint-disable-next-line import/no-unassigned-import, node/file-extension-in-import -- Tailwind CSS exception.
import "tailwindcss/tailwind.css";

import { useRouter } from "next/router";
import { useEffect } from "react";

import GTag, { pageview } from "../utils/gtag";

import type { AppProps } from "next/app";
import type { ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention -- Next.js patterns.
const App = ({ Component, pageProps }: AppProps): ReactElement => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return (): void => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GTag />
      {/* eslint-disable-next-line react/jsx-props-no-spreading -- Next.js pattern. */}
      <Component {...pageProps} />
    </>
  );
};

export default App;
