import { useCallback, useEffect, useState, ReactNode, useMemo } from "react";

import {
  executeCat,
  generateCommands,
} from "@/app/hacks/(tty)/(shell)/commands";
import { generateNeofetch } from "@/app/hacks/(tty)/(shell)/neofetch";
import Terminal from "@/app/hacks/(tty)/terminal";

interface ShellProps {
  readonly username: string;
  readonly onCommand?: (command: string) => void;
}

export default function Shell({ username, onCommand }: ShellProps) {
  const [lines, setLines] = useState<ReactNode[]>([]);

  const commands = useMemo(() => generateCommands(username), [username]);

  const getPrompt = useCallback(
    () => (
      <>
        <span className="text-lime-500">{username}@ziyadscorner</span>
        <span>:</span>
        <span className="text-blue-500">~/hacks</span>
        <span>$ </span>
      </>
    ),
    [username],
  );
  const clearLines = useCallback(() => {
    setLines([]);
  }, []);
  const printLine = useCallback(
    (line: ReactNode, { newline = true }: { newline?: boolean } = {}) => {
      setLines((prev) => [...prev, line, ...(newline ? [<br />] : [])]);
    },
    [],
  );

  useEffect(() => {
    setLines([
      ...generateNeofetch(username).flatMap((line) => [line, <br />]),
      <br />,
      getPrompt(),
      "cat README.md",
      <br />,
      ...executeCat(username, ["README.md"]).flatMap((line) => [line, <br />]),
      getPrompt(),
    ]);
  }, [username, getPrompt]);

  const handleCommand = useCallback(
    (input: string) => {
      const [cmd, ...args] = input.trim().split(/\s+/);
      const command = commands.find((c) => c.name === cmd) ?? null;

      if (cmd === "") {
        // Create a new prompt if the user just pressed enter with no input/command.
        printLine("");
      } else if (cmd === "clear") {
        // Since this manipulates historical lines of the shell, our standard execution which follows the pattern of
        // just setting new lines doesn't work, so we clear the lines manually.
        clearLines();
      } else if (command === null) {
        // If the command is not found, we add a line indicating that.
        printLine(input);
        printLine(<span>command not found: {cmd}</span>);
      } else {
        // The standard command execution simply appends the input and the output of the command to the lines.
        printLine(input);
        command.execute(args).forEach((line) => {
          printLine(line);
        });
      }
      printLine(getPrompt(), { newline: false });

      onCommand?.(input);
    },
    [commands, onCommand, getPrompt, printLine, clearLines],
  );

  return (
    <Terminal
      lines={lines}
      expectInput="normal"
      onInput={handleCommand}
      enableHistory
      enableSyntaxHighlight
      enableTabComplete
      enableAutoComplete
      commands={commands.map((cmd) => cmd.name)}
      username={username}
    />
  );
}
