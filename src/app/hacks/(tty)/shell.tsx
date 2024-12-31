import { useCallback, useEffect, useState, ReactNode, useMemo } from "react";

import {
  getFileSystem,
  resolvePathFromDir,
} from "@/app/hacks/(tty)/filesystem";
import Terminal from "@/app/hacks/(tty)/terminal";

interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => ReactNode[];
}

const getArchAscii = () => [
  `                   -\`                    `,
  `                  .o+\`                   `,
  `                 \`ooo/                   `,
  `                \`+oooo:                  `,
  `               \`+oooooo:                 `,
  `               -+oooooo+:                `,
  `             \`/:-:++oooo+:               `,
  `            \`/++++/+++++++:              `,
  `           \`/++++++++++++++:             `,
  `          \`/+++ooooooooooooo/\`           `,
  `         ./ooosssso++osssssso+\`          `,
  `        .oossssso-\`\`\`\`/ossssss+\`         `,
  `       -osssssso.      :ssssssso.        `,
  `      :osssssss/        osssso+++.       `,
  `     /ossssssss/        +ssssooo/-       `,
  `   \`/ossssso+/:-        -:/+osssso+-     `,
  `  \`+sso+:-\`                 \`.-/+oso:    `,
  ` \`++:.                           \`-/+/   `,
  ` .\`                                 \`/   `,
];

const getSystemStats = () => [
  { label: "OS", value: "Arch Linux x86_64" },
  { label: "Kernel", value: "Linux 6.12.6-arch1-1" },
  { label: "Uptime", value: "4 hours, 20 mins" },
  { label: "Packages", value: "676 (pacman)" },
  { label: "Shell", value: "zsh 5.9" },
  {
    label: "Resolution",
    value: `${window.innerWidth}x${window.innerHeight}`,
  },
  { label: "WM", value: navigator.userAgent },
  { label: "Terminal", value: "tmux" },
  { label: "CPU", value: "Intel i9-14900K (32) @ 5.700GHz [52.0°C]" },
  { label: "GPU", value: "NVIDIA GeForce RTX 4070 Ti" },
  { label: "Memory", value: "19.58GiB / 62.53GiB (31%)" },
  { label: "GPU Driver", value: "NVIDIA 565.77" },
  { label: "CPU Usage", value: "8% [-==============]" },
  { label: "Disk (/)", value: "177G / 866G (22%) [---============]" },
  { label: "Font", value: "Fira Code 11 [GTK2/3]" },
];

interface ShellProps {
  readonly username: string;
  readonly onCommand?: (command: string) => void;
}

const generateNeofetch = (
  asciiArt: string[],
  stats: { label: string; value: string | ReactNode }[],
  username: string,
) => {
  const lines: ReactNode[] = [];
  const padding = 40;

  asciiArt.slice(2).forEach((line, index) => {
    const stat = index in stats ? stats[index] : null;
    lines.push(
      <span className="text-cyan-300">
        {line.padEnd(padding)}
        {stat && (
          <>
            <span className="text-cyan-300">{stat.label}: </span>
            <span className="text-white">{stat.value}</span>
          </>
        )}
      </span>,
    );
  });

  // Add header with username
  lines.unshift(
    <span className="text-cyan-300">
      {asciiArt[0].padEnd(padding)}
      {username}
      <span className="text-white">@</span>
      ziyadscorner
    </span>,
    <span className="text-cyan-300">
      {asciiArt[1].padEnd(padding)}
      <span className="text-white">-----------------</span>
    </span>,
  );

  return lines;
};

export default function Shell({ username, onCommand }: ShellProps) {
  const [lines, setLines] = useState<ReactNode[]>([]);

  const getPrompt = useCallback(
    () => [
      <span className="text-lime-500">{username}@ziyadscorner</span>,
      <span>:</span>,
      <span className="text-blue-500">~/hacks</span>,
      <span>$ </span>,
    ],
    [username],
  );

  const clearShell = useCallback(() => {
    setLines([...getPrompt()]);
  }, [getPrompt]);

  const commands: Command[] = useMemo(
    () => [
      {
        name: "echo",
        description: "Display text to the terminal",
        execute: (args) => [<span>{args.join(" ")}</span>],
      },
      {
        name: "pwd",
        description: "Print working directory",
        execute: () => [<span>/home/{username}/hacks</span>],
      },
      {
        name: "ls",
        description: "List directory contents",
        execute: (args) => {
          if (args.length > 1) {
            return [<span>ls: too many arguments</span>];
          }

          const currentDir = `/home/${username}/hacks`;
          const fileSystem = getFileSystem(username);

          const path = args.length === 0 ? currentDir : args[0];
          const resolvedPath = resolvePathFromDir(username, currentDir, path);

          // Traverse file system tree to find target directory
          const pathParts = resolvedPath.split("/").filter(Boolean);
          let current = fileSystem["/"];
          for (const part of pathParts) {
            if (!current.isDirectory) {
              return [<span>ls: cannot access '{path}': Not a directory</span>];
            }
            if (!current.isAccessible) {
              return [
                <span>ls: cannot access '{path}': Permission denied</span>,
              ];
            }
            if (!current.children[part]) {
              return [
                <span>
                  ls: cannot access '{path}': No such file or directory
                </span>,
              ];
            }
            current = current.children[part];
          }
          if (!current.isDirectory) {
            return [<span>{args[0]}</span>];
          }
          if (!current.isAccessible) {
            return [
              <span>
                ls: cannot open directory '{path}': Permission denied
              </span>,
            ];
          }

          // Format output of directory contents
          return Object.values(current.children).map((item) => (
            <span className={item?.isDirectory ? "text-blue-500" : ""}>
              {item?.name}
            </span>
          ));
        },
      },
      {
        name: "cd",
        description: "Change directory (this will navigate your browser)",
        execute: (args) => {
          if (args.length === 0) {
            return [<span>cd: missing operand</span>];
          }
          if (args.length > 1) {
            return [<span>cd: too many arguments</span>];
          }

          const currentDir = `/home/${username}/hacks`;
          const fileSystem = getFileSystem(username);
          const path = args[0];
          const resolvedPath = resolvePathFromDir(username, currentDir, path);

          // Handle root navigation
          if (
            resolvedPath === "/" ||
            resolvedPath === "/home" ||
            resolvedPath === `/home/${username}`
          ) {
            window.location.href = "/";
            return [];
          }

          // Traverse file system tree to find target directory
          const pathParts = resolvedPath.split("/").filter(Boolean);
          let current = fileSystem["/"];
          for (const part of pathParts) {
            if (!current.isDirectory) {
              return [<span>cd: {path}: Not a directory</span>];
            }
            if (!current.isAccessible) {
              return [<span>cd: {path}: Permission denied</span>];
            }
            if (!current.children[part]) {
              return [<span>cd: {path}: No such file or directory</span>];
            }
            current = current.children[part];
          }

          if (!current.isDirectory) {
            return [<span>cd: {path}: Not a directory</span>];
          }
          if (!current.isAccessible) {
            return [<span>cd: {path}: Permission denied</span>];
          }

          // Handle navigation within hacks directory
          if (resolvedPath.startsWith(`/home/${username}/hacks/`)) {
            const subPath = resolvedPath.slice(
              `/home/${username}/hacks/`.length,
            );
            window.location.href = `/hacks/${subPath}`;
            return [];
          }

          return [];
        },
      },
      {
        name: "cat",
        description: "Concatenate files and print on the standard output",
        execute: (args) => {
          if (args.length === 0) {
            return [<span>cat: missing operand</span>];
          }

          const currentDir = `/home/${username}/hacks`;
          const fileSystem = getFileSystem(username);

          return args.flatMap((arg) => {
            const resolvedPath = resolvePathFromDir(username, currentDir, arg);

            // Traverse file system tree to find target file
            const pathParts = resolvedPath.split("/").filter(Boolean);
            let current = fileSystem["/"];
            for (const part of pathParts.slice(0, -1)) {
              if (!current.isDirectory) {
                return [<span>cat: {arg}: Not a directory</span>];
              }
              if (!current.isAccessible) {
                return [<span>cat: {arg}: Permission denied</span>];
              }
              if (!current.children[part]) {
                return [<span>cat: {arg}: No such file or directory</span>];
              }
              current = current.children[part];
            }

            const fileName = pathParts[pathParts.length - 1];
            const file = current.isDirectory
              ? current.children[fileName]
              : null;

            if (!file) {
              return [<span>cat: {arg}: No such file or directory</span>];
            }
            if (file.isDirectory) {
              return [<span>cat: {arg}: Is a directory</span>];
            }
            if (!file.isAccessible) {
              return [<span>cat: {arg}: Permission denied</span>];
            }

            return [<span>{file.content}</span>];
          });
        },
      },
      {
        name: "neofetch",
        description: "Display system information",
        execute: () =>
          generateNeofetch(getArchAscii(), getSystemStats(), username),
      },
      {
        name: "clear",
        description: "Clear the terminal screen",
        execute: () => [],
      },
      {
        name: "reboot",
        description: "Reboot the machine",
        execute: () => {
          window.location.reload();
          return [];
        },
      },
      {
        name: "help",
        description: "List all available commands",
        execute: () => {
          const maxLength = Math.max(...commands.map((cmd) => cmd.name.length));
          return commands.map((cmd) => (
            <span key={cmd.name}>
              <span className="text-yellow-500">
                {cmd.name.padEnd(maxLength)}
              </span>
              <span> - {cmd.description}</span>
            </span>
          ));
        },
      },
      {
        name: "exit",
        description: "Exit the shell (this navigates your browser)",
        execute: () => {
          window.location.href = "/";
          return [];
        },
      },
    ],
    [username],
  );

  useEffect(() => {
    const catCommand = commands.find((c) => c.name === "cat");
    setLines([
      ...generateNeofetch(getArchAscii(), getSystemStats(), username).flatMap(
        (line) => [line, <br />],
      ),
      <br />,
      ...getPrompt(),
      <span>cat README.md</span>,
      <br />,
      ...(catCommand
        ? catCommand.execute(["README.md"]).flatMap((line) => [line, <br />])
        : []),
      ...getPrompt(),
    ]);
  }, [username, commands, getPrompt]);

  const handleCommand = useCallback(
    (input: string) => {
      const [cmd, ...args] = input.trim().split(/\s+/);
      const command = commands.find((c) => c.name === cmd);

      if (cmd === "") {
        setLines((prev) => [...prev, <br />, ...getPrompt()]);
      } else if (cmd === "clear") {
        clearShell();
      } else {
        setLines((prev) => [
          ...prev,
          <span>{input}</span>,
          <br />,
          ...(command
            ? command.execute(args).flatMap((line) => [line, <br />])
            : [
                <span>
                  <span>command not found: {cmd}</span>
                  <br />
                </span>,
              ]),
          ...getPrompt(),
        ]);
      }

      onCommand?.(input);
    },
    [commands, onCommand, getPrompt, clearShell],
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
