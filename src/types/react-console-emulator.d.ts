// eslint-disable-next-line import/unambiguous -- .d.ts pattern.
declare module "react-console-emulator" {
  import type { FunctionComponent } from "react";

  interface OptionProps {
    autoFocus?: boolean;
    dangerMode?: boolean;
    disableOnProcess?: boolean;
    noDefaults?: boolean;
    noAutomaticStdout?: boolean;
    noHistory?: boolean;
    noAutoScroll?: boolean;
  }

  interface LabelProps {
    welcomeMessage?: string[] | boolean | string;
    promptLabel?: string;
    errorText?: string;
  }

  interface CommandProps {
    commands?: Record<
      string,
      {
        description?: string;
        usage?: string;
        fn: () => string;
        explicitExec?: boolean;
      }
    >;
    commandCallback?: () => void;
  }

  interface StyleProps {
    className?: string;
    contentClassName?: string;
    inputAreaClassName?: string;
    promptLabelClassName?: string;
    inputTextClassName?: string;
    messageClassName?: string;
  }

  interface TerminalProps
    extends CommandProps,
      LabelProps,
      OptionProps,
      StyleProps {}

  // eslint-disable-next-line @typescript-eslint/naming-convention -- existing name in library.
  const Terminal: FunctionComponent<TerminalProps>;

  export type { TerminalProps };
  export default Terminal;
}
