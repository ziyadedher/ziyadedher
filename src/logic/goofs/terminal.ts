enum Directory {
  HOME = "home",
  HACKS = "hacks",
}

const getUrlFromDirectory = (dir: Directory): string => {
  switch (dir) {
    case Directory.HOME:
      return "/";
    case Directory.HACKS:
      return "/hacks";
    default:
      return "/";
  }
};

const cd = (goToUrl: (url: string) => void, dir?: string): string => {
  if (typeof dir === "undefined" || dir.length === 0) {
    return "no directory was given";
  }

  const normalizedDir = dir.endsWith("/") ? dir.slice(0, -1) : dir;

  switch (normalizedDir) {
    case Directory.HOME:
      goToUrl(getUrlFromDirectory(Directory.HOME));
      return `changing directory to ${dir}`;
    case Directory.HACKS:
      goToUrl(getUrlFromDirectory(Directory.HACKS));
      return `changing directory to ${dir}`;
    default:
      return `directory not found: ${dir}`;
  }
};

const echo = (...args: readonly string[]): string => args.join(" ");

const exec = (command?: string): string =>
  (command ?? "").length === 0 ? "no command was given" : "just kidding, lmao";

const ls = (): string => `${Directory.HOME}\n${Directory.HACKS}`;

export { Directory, getUrlFromDirectory, echo, exec, ls, cd };
