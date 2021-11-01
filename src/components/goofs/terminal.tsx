import { useRouter } from "next/router";
import React from "react";
import ConsoleEmulator from "react-console-emulator";

import { cd, echo, exec, ls } from "../../logic/goofs/terminal";

import type { NextRouter } from "next/router";
import type { TerminalProps as ConsoleEmulatorProps } from "react-console-emulator";

const WELCOME_MESSAGE = "Welcome, `help` to start.";

const PROMPT_LABEL = "hacker@ziyadedher.com:~$";

const ERROR_TEXT = "command not found: [command]";

type CommandsType = Pick<ConsoleEmulatorProps, "commands">["commands"];

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- Next.js router.
const getCommands = (router: NextRouter): CommandsType => ({
  cd: {
    description: "change directory",
    usage: "cd <directory>",
    fn: cd.bind(null, async (url: string) => await router.push(url)),
  },
  echo: {
    description: "write arguments to the terminal",
    usage: "echo [argument ...]",
    fn: echo,
  },
  exec: {
    description: "execute arbitrary `sh` code",
    usage: "exec <command>",
    fn: exec,
  },
  ls: {
    description: "list directory contents",
    usage: "ls",
    fn: ls,
  },
});

const Terminal: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <ConsoleEmulator
      commands={getCommands(router)}
      welcomeMessage={WELCOME_MESSAGE}
      promptLabel={PROMPT_LABEL}
      errorText={ERROR_TEXT}
      // eslint-disable-next-line react/forbid-component-props -- component built-in.
      className="!w-full !h-full !text-sm !bg-black"
      contentClassName="!text-green-300"
      promptLabelClassName="!pr-0.5 !-mt-0.5"
    />
  );
};

export default Terminal;
