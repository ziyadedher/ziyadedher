"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ConsoleEmulator from "react-console-emulator";

import { cd, echo, exec, ls } from "@/logic/goofs/terminal";

import type { TerminalProps as ConsoleEmulatorProps } from "react-console-emulator";

const WELCOME_MESSAGE = "Welcome, `help` to start.";

const PROMPT_LABEL = "hacker@ziyadedher.com:/hacks/$";

const ERROR_TEXT = "command not found: [command]";

type CommandsType = Pick<ConsoleEmulatorProps, "commands">["commands"];

const getCommands = (route: (url: string) => void): CommandsType => ({
  cd: {
    description: "change directory",
    usage: "cd <directory>",
    fn: cd.bind(null, route),
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

  const route = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return (
    <ConsoleEmulator
      commands={getCommands(route)}
      welcomeMessage={WELCOME_MESSAGE}
      promptLabel={PROMPT_LABEL}
      errorText={ERROR_TEXT}
      className="!h-full !w-full !rounded-xl !bg-black"
      contentClassName="!text-green-300 !text-lg"
      promptLabelClassName="!pr-1 !-mt-1.5"
    />
  );
};

export default Terminal;
