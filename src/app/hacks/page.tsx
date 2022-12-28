import React from "react";

import Terminal from "../../components/goofs/terminal";
import { AnimatedHackerText } from "../../components/text";

const Page: React.FunctionComponent = () => (
  <div className="flex w-full flex-col items-center">
    <div className="m-8 flex flex-col items-center gap-4">
      <h1 className="font-mono text-3xl">
        <AnimatedHackerText delay={1000} text="😎 it's time to hack 😎" />
      </h1>
      <p className="font-mono text-sm">
        <AnimatedHackerText
          delay={2000}
          text="Use the terminal below to get started."
        />
      </p>
    </div>

    <div className="h-full w-full p-8">
      <Terminal />
    </div>
  </div>
);

export default Page;
