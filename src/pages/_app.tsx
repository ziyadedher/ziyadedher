// eslint-disable-next-line import/no-unassigned-import, node/file-extension-in-import -- Tailwind CSS exception.
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import type { ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention -- Next.js patterns.
const App = ({ Component, pageProps }: AppProps): ReactElement => (
  // eslint-disable-next-line react/jsx-props-no-spreading -- Next.js pattern.
  <Component {...pageProps} />
);

export default App;
