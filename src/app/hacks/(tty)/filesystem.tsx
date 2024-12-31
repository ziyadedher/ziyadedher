export interface DirectoryNode {
  readonly name: string;
  readonly isDirectory: true;
  readonly isAccessible: boolean;
  readonly children: Partial<Record<string, FileSystemNode>>;
}

export interface FileNode {
  readonly name: string;
  readonly isDirectory: false;
  readonly isAccessible: boolean;
  readonly content: string;
}

export type FileSystemNode = DirectoryNode | FileNode;

export interface FileSystem {
  "/": FileSystemNode;
}

export const getFileSystem = (username: string): FileSystem => ({
  "/": {
    name: "/",
    isDirectory: true,
    isAccessible: true,
    children: {
      bin: {
        name: "bin",
        isDirectory: true,
        isAccessible: false,
        children: {},
      },
      etc: {
        name: "etc",
        isDirectory: true,
        isAccessible: false,
        children: {},
      },
      home: {
        name: "home",
        isDirectory: true,
        isAccessible: true,
        children: {
          [username]: {
            name: username,
            isDirectory: true,
            isAccessible: true,
            children: {
              hacks: {
                name: "hacks",
                isDirectory: true,
                isAccessible: true,
                children: {
                  "README.md": {
                    name: "README.md",
                    isDirectory: false,
                    isAccessible: true,
                    content:
                      "# Hacks\n\nThere's random stuff in here accessible via this terminal.\nYou can start off with `help` if you want, and you can use Tab-completion and the arrow keys.\n\nHave fun!",
                  },
                  darkarts: {
                    name: "darkarts",
                    isDirectory: true,
                    isAccessible: true,
                    children: {
                      "README.md": {
                        name: "README.md",
                        isDirectory: false,
                        isAccessible: true,
                        content:
                          "# Dark Arts\n\nGenerate AI faces online by using a GAN (generative adversarial network) that runs in your browser.\n\ncd into this directory to explore this hack.",
                      },
                    },
                  },
                  log4shell: {
                    name: "log4shell",
                    isDirectory: true,
                    isAccessible: true,
                    children: {
                      "README.md": {
                        name: "README.md",
                        isDirectory: false,
                        isAccessible: true,
                        content:
                          "# Log4Shell\n\nList of companies with public bug bounty specials for Log4Shell (CVE-2021-44228).\n\ncd into this directory to explore this hack.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      usr: {
        name: "usr",
        isDirectory: true,
        isAccessible: false,
        children: {},
      },
    },
  },
});

export const resolvePathFromDir = (
  username: string,
  currentDir: string,
  path: string,
) => {
  // If path is empty, return current directory
  if (!path) return currentDir;

  // Handle ~ expansion
  if (path.startsWith("~")) {
    path = path.replace("~", `/home/${username}`);
  }

  // Convert path to absolute if relative
  const absolutePath = path.startsWith("/") ? path : `${currentDir}/${path}`;

  // Split path into segments
  const segments = absolutePath.split("/").filter(Boolean);

  // Process . and .. segments
  const resolvedSegments = [];
  for (const segment of segments) {
    if (segment === ".") continue;
    if (segment === "..") {
      resolvedSegments.pop();
      continue;
    }
    resolvedSegments.push(segment);
  }

  // Reconstruct path
  return "/" + resolvedSegments.join("/");
};

export const getAutocompleteFromDir = (
  username: string,
  currentDir: string,
  prefix: string,
): string[] => {
  const fileSystem = getFileSystem(username);

  // Get the directory path and file prefix we're trying to complete
  const lastSlashIndex = prefix.lastIndexOf("/");
  const directoryPath =
    lastSlashIndex === -1 ? "" : prefix.slice(0, lastSlashIndex + 1);
  const filePrefix =
    lastSlashIndex === -1 ? prefix : prefix.slice(lastSlashIndex + 1);

  // Resolve the directory path
  const resolvedPath = resolvePathFromDir(
    username,
    currentDir,
    directoryPath === "" ? "." : directoryPath,
  );

  // Navigate to the target directory in our filesystem
  const pathParts = resolvedPath.split("/").filter(Boolean);
  let current = fileSystem["/"];
  for (const part of pathParts) {
    if (
      !current.isDirectory ||
      !current.isAccessible ||
      !current.children[part]
    ) {
      return [];
    }
    current = current.children[part];
  }

  if (!current.isDirectory || !current.isAccessible) {
    return [];
  }

  // Get all children that match the prefix and append / to directories
  const matches = Object.values(current.children)
    .filter((node): node is FileSystemNode => node !== undefined)
    .filter((node) => node.name.startsWith(filePrefix))
    .map((node) => node.name + (node.isDirectory ? "/" : ""));

  if (directoryPath.startsWith("/")) {
    // If path was absolute, return absolute paths
    return matches.map((match) => directoryPath + match);
  } else if (directoryPath !== "") {
    // If path had a directory component, include it
    return matches.map((match) => directoryPath + match);
  } else {
    // Otherwise just return the matches
    return matches;
  }
};
