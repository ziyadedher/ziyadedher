import { useCallback, useEffect, useState, ReactNode, useRef } from "react";

import { getAutocompleteFromDir } from "@/app/hacks/(tty)/(shell)/filesystem";

interface TerminalProps {
  lines: ReactNode[];
  expectInput?: null | "normal" | "password";
  onInput?: (input: string) => void;
  onCtrlC?: () => void;
  enableHistory?: boolean;
  enableSyntaxHighlight?: boolean;
  enableTabComplete?: boolean;
  enableAutoComplete?: boolean;
  commands?: string[];
  username?: string | null;
}

export default function Terminal({
  lines,
  expectInput = null,
  onInput,
  onCtrlC,
  enableHistory = false,
  enableSyntaxHighlight = false,
  enableTabComplete = false,
  enableAutoComplete = false,
  commands = [],
  username = null,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [autocompleteText, setAutocompleteText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [input]);

  useEffect(() => {
    if (enableAutoComplete && input.length >= 2) {
      const matches = commands.filter((cmd) => cmd.startsWith(input));
      if (matches.length === 1) {
        setAutocompleteText(matches[0].slice(input.length));
      } else {
        setAutocompleteText("");
      }
    } else {
      setAutocompleteText("");
    }
  }, [input, commands, enableAutoComplete]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "c") {
        onCtrlC?.();
        setInput("");
        setTabCompletions([]);
        return;
      }

      if (!expectInput) return;

      // Support tab-completion.
      if (enableTabComplete && e.key === "Tab") {
        e.preventDefault();

        const inputParts = input.split(" ");
        if (inputParts.length === 1) {
          const matches = commands.filter((cmd) => cmd.startsWith(input));
          if (matches.length === 1) {
            setInput(matches[0]);
            setCursorPos(matches[0].length);
            setTabCompletions([]);
          } else {
            setTabCompletions(matches);
          }
        } else if (username !== null) {
          const currentDir = `/home/${username}/hacks`;
          const prefix = inputParts[inputParts.length - 1];
          const matches = getAutocompleteFromDir(username, currentDir, prefix);

          if (matches.length === 1) {
            inputParts[inputParts.length - 1] = matches[0];
            setInput(inputParts.join(" "));
            setCursorPos(inputParts.join(" ").length);
            setTabCompletions([]);
          } else if (matches.length > 0) {
            setTabCompletions(matches);
          }
        }
        return;
      }

      // Support selecting autocomplete text.
      if (
        autocompleteText &&
        e.key === "ArrowRight" &&
        cursorPos === input.length
      ) {
        e.preventDefault();
        setInput(input + autocompleteText);
        setAutocompleteText("");
        setCursorPos(input.length + autocompleteText.length);
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCursorPos(Math.max(0, cursorPos - 1));
        return;
      }

      if (e.key === "ArrowRight" && cursorPos < input.length) {
        e.preventDefault();
        setCursorPos(Math.min(input.length, cursorPos + 1));
        return;
      }

      if (e.key === "Enter") {
        if (input.trim()) {
          if (
            enableHistory &&
            (history.length === 0 || history[history.length - 1] !== input)
          ) {
            setHistory((prev) => [...prev, input]);
          }
          setHistoryIndex(-1);
          setTabCompletions([]);
        }
        onInput?.(input);
        setInput("");
        setCursorPos(0);
        return;
      }

      if (enableHistory && e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0 && historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]);
          setCursorPos(history[history.length - 1 - newIndex].length);
        }
        return;
      }

      if (enableHistory && e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]);
          setCursorPos(history[history.length - 1 - newIndex].length);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput("");
          setCursorPos(0);
        }
        return;
      }

      if (inputRef.current?.matches(":focus")) return;

      if (e.key === "Backspace") {
        if (cursorPos > 0) {
          setInput(input.slice(0, cursorPos - 1) + input.slice(cursorPos));
          setCursorPos(cursorPos - 1);
        }
        return;
      }

      if (e.key.length === 1) {
        setInput(input.slice(0, cursorPos) + e.key + input.slice(cursorPos));
        setCursorPos(cursorPos + 1);
      }
    },
    [
      expectInput,
      input,
      cursorPos,
      onInput,
      onCtrlC,
      history,
      historyIndex,
      enableHistory,
      enableTabComplete,
      commands,
      username,
      autocompleteText,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (expectInput) {
      inputRef.current?.focus();
    }
  }, [expectInput]);

  return (
    <div onClick={() => inputRef.current?.focus()}>
      <pre className="whitespace-pre-wrap text-white text-xs md:text-base !leading-tight font-mono">
        {lines.map((line, i) => {
          if (typeof line === "string" && enableSyntaxHighlight) {
            const firstArg = line.split(" ")[0];
            return (
              <span key={i}>
                <span
                  className={
                    commands.includes(firstArg)
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {firstArg}
                </span>
                {line.slice(firstArg.length)}
              </span>
            );
          }
          return <span key={i}>{line}</span>;
        })}
        {expectInput && (
          <>
            {enableSyntaxHighlight ? (
              <>
                {(() => {
                  const firstWord = input.split(" ")[0];
                  const firstWordEnd = firstWord.length;
                  const isCommand = commands.includes(firstWord);

                  return (
                    <>
                      {cursorPos < firstWordEnd ? (
                        <>
                          <span
                            className={
                              isCommand ? "text-green-500" : "text-red-500"
                            }
                          >
                            {input.slice(0, cursorPos)}
                          </span>
                          <span className="text-white animate-[pulse_1s_steps(1,end)_infinite]">
                            █
                          </span>
                          <span
                            className={
                              isCommand ? "text-green-500" : "text-red-500"
                            }
                          >
                            {input.slice(cursorPos + 1, firstWordEnd)}
                          </span>
                          <span className="text-white">
                            {input.slice(firstWordEnd)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              isCommand ? "text-green-500" : "text-red-500"
                            }
                          >
                            {input.slice(0, firstWordEnd)}
                          </span>
                          <span className="text-white">
                            {input.slice(firstWordEnd, cursorPos)}
                          </span>
                          <span className="text-white animate-[pulse_1s_steps(1,end)_infinite]">
                            █
                          </span>
                          <span className="text-white">
                            {input.slice(cursorPos + 1)}
                          </span>
                        </>
                      )}
                    </>
                  );
                })()}
              </>
            ) : (
              <>
                <span>
                  {expectInput === "password"
                    ? "*".repeat(cursorPos)
                    : input.slice(0, cursorPos)}
                </span>
                <span className="text-white animate-[pulse_1s_steps(1,end)_infinite]">
                  █
                </span>
                <span>
                  {expectInput === "password"
                    ? "*".repeat(Math.max(input.length - cursorPos - 1, 0))
                    : input.slice(cursorPos)}
                </span>
              </>
            )}
            {autocompleteText &&
              expectInput !== "password" &&
              cursorPos === input.length && (
                <span className="text-white">{autocompleteText.slice(1)}</span>
              )}
          </>
        )}
        {expectInput &&
          expectInput !== "password" &&
          tabCompletions.length > 0 && (
            <>
              <br />
              <span className="text-white">{tabCompletions.join("  ")}</span>
              <br />
            </>
          )}
      </pre>
      {expectInput &&
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          window.navigator.userAgent,
        ) && (
          <input
            ref={inputRef}
            type={expectInput === "password" ? "password" : "text"}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="opacity-0 absolute"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        )}
    </div>
  );
}
