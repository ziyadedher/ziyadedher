import { asEnum, listEnumValues } from "../../utils/enum";

enum Directory {
  HOME = "/",
  HACKS = "/hacks/",
  LOG4SHELL = "/hacks/log4shell/",
}

const cd = (goToUrl: (url: string) => void, dir?: string): string => {
  if (typeof dir === "undefined" || dir.length === 0) {
    return "no directory was given";
  }

  const dirWithSlashes = `/${dir}/`;
  const normalizedDir = dirWithSlashes.replace(/\/+/gu, "/");
  const maybeEnumDir = asEnum(Directory, normalizedDir);

  if (maybeEnumDir === null) {
    return `directory not found: ${dir}`;
  }

  goToUrl(maybeEnumDir);
  return `changing directory to ${dir}`;
};

const echo = (...args: readonly string[]): string => args.join(" ");

const exec = (command?: string): string =>
  (command ?? "").length === 0 ? "no command was given" : "just kidding, lmao";

const ls = (): string => listEnumValues(Directory).join("\n");

export { Directory, echo, exec, ls, cd };
