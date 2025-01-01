import { ReactNode } from "react";

import {
  getFileSystem,
  resolvePathFromDir,
} from "@/app/hacks/(tty)/(shell)/filesystem";
import { generateNeofetch } from "@/app/hacks/(tty)/(shell)/neofetch";

interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => ReactNode[];
}

const getCurrentWorkingDirectory = (username: string): string =>
  `/home/${username}/hacks`;

const executeEcho = (args: string[]): ReactNode[] => [
  <span>{args.join(" ")}</span>,
];

const executePwd = (username: string): ReactNode[] => [
  <span>{getCurrentWorkingDirectory(username)}</span>,
];

const executeLs = (username: string, args: string[]): ReactNode[] => {
  if (args.length > 1) {
    return [<span>ls: too many arguments</span>];
  }

  const currentDir = getCurrentWorkingDirectory(username);
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
      return [<span>ls: cannot access '{path}': Permission denied</span>];
    }
    if (!current.children[part]) {
      return [
        <span>ls: cannot access '{path}': No such file or directory</span>,
      ];
    }
    current = current.children[part];
  }
  if (!current.isDirectory) {
    return [<span>{args[0]}</span>];
  }
  if (!current.isAccessible) {
    return [<span>ls: cannot open directory '{path}': Permission denied</span>];
  }

  // Format output of directory contents
  return Object.values(current.children).map((item) => (
    <span className={item?.isDirectory ? "text-blue-500" : ""}>
      {item?.name}
    </span>
  ));
};

const executeCd = (username: string, args: string[]): ReactNode[] => {
  if (args.length === 0) {
    return [<span>cd: missing operand</span>];
  }
  if (args.length > 1) {
    return [<span>cd: too many arguments</span>];
  }

  const currentDir = getCurrentWorkingDirectory(username);
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
    const subPath = resolvedPath.slice(`/home/${username}/hacks/`.length);
    window.location.href = `/hacks/${subPath}`;
    return [];
  }

  return [];
};

export const executeCat = (username: string, args: string[]): ReactNode[] => {
  if (args.length === 0) {
    return [<span>cat: missing operand</span>];
  }

  const currentDir = getCurrentWorkingDirectory(username);
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
    const file = current.isDirectory ? current.children[fileName] : null;

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
};

const executeHelp = (commands: Command[]): ReactNode[] => {
  const maxLength = Math.max(...commands.map((cmd) => cmd.name.length));
  return commands.map((cmd) => (
    <span key={cmd.name}>
      <span className="text-yellow-500">{cmd.name.padEnd(maxLength)}</span>
      <span> - {cmd.description}</span>
    </span>
  ));
};

export const generateCommands = (username: string): Command[] => {
  const commands: Command[] = [
    {
      name: "echo",
      description: "Display text to the terminal",
      execute: executeEcho,
    },
    {
      name: "pwd",
      description: "Print working directory",
      execute: () => executePwd(username),
    },
    {
      name: "ls",
      description: "List directory contents",
      execute: (args) => executeLs(username, args),
    },
    {
      name: "cd",
      description: "Change directory (this will navigate your browser)",
      execute: (args) => executeCd(username, args),
    },
    {
      name: "cat",
      description: "Concatenate files and print on the standard output",
      execute: (args) => executeCat(username, args),
    },
    {
      name: "neofetch",
      description: "Display system information",
      execute: () => generateNeofetch(username),
    },
    {
      name: "clear",
      description: "Clear the terminal screen",
      execute: () => [], // `clear` does nothing here and is instead handled by the `Shell` component itself.
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
      execute: () => executeHelp(commands),
    },
    {
      name: "exit",
      description: "Exit the shell (this navigates your browser)",
      execute: () => {
        window.location.href = "/";
        return [];
      },
    },
  ];

  return commands;
};
