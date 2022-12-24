import {
  Directory,
  cd,
  echo,
  exec,
  ls,
} from "./terminal";
import { listEnumValues } from "../../utils/enum";

describe("terminal", () => {
  describe("commands", () => {
    describe("cd", () => {
      const setupMockGoToUrl = (): jest.MockedFunction<(url: string) => void> =>
        jest.fn();

      test("errors on no directory", () => {
        const mockGoToUrl = setupMockGoToUrl();
        const result = cd(mockGoToUrl);
        expect(result).toContain("no directory");
      });

      test("errors on empty directory", () => {
        const mockGoToUrl = setupMockGoToUrl();
        const result = cd(mockGoToUrl, "");
        expect(result).toContain("no directory");
      });

      test("errors on non-existent directory", () => {
        const mockGoToUrl = setupMockGoToUrl();
        const result = cd(mockGoToUrl, "__DO_NOT_USE_this_does_not_exist");
        expect(result).toContain("directory not found");
      });

      test("goes to a valid directory", () => {
        const mockGoToUrl = setupMockGoToUrl();
        const result = cd(mockGoToUrl, Directory.HOME);

        expect(mockGoToUrl).toHaveBeenCalledTimes(1);
        expect(mockGoToUrl).toHaveBeenCalledWith(Directory.HOME);
        expect(result).toContain(Directory.HOME);
      });

      test("goes to valid directory with trailing slash", () => {
        const mockGoToUrl = setupMockGoToUrl();
        const result = cd(mockGoToUrl, `${Directory.HOME}/`);

        expect(mockGoToUrl).toHaveBeenCalledTimes(1);
        expect(mockGoToUrl).toHaveBeenCalledWith(Directory.HOME);
        expect(result).toContain(Directory.HOME);
      });
    });

    describe("echo", () => {
      test("echos the given text", () => {
        const result = echo("Hello World!");
        expect(result).toBe("Hello World!");
      });
    });

    describe("exec", () => {
      test("errors on no command", () => {
        const result = exec();
        expect(result).toContain("no command");
      });

      test("errors on empty command", () => {
        const result = exec("");
        expect(result).toContain("no command");
      });

      test("just kidding on command", () => {
        const result = exec("ls");
        expect(result).toContain("just kidding");
      });
    });

    describe("ls", () => {
      test("lists available directories", () => {
        const result = ls();
        listEnumValues(Directory).forEach((dir) => {
          expect(result).toContain(dir);
        });
      });
    });
  });
});
